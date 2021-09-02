/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

import { setToast, resetToast } from '../../store/toast/toastAction';
import RoadtripService from '../../services/roadtripService';
import RoadTrip from '../../entities/roadtrip';
import Address from '../../entities/address';
import LocationService from '../../services/locationService';
import PostalAddressForm from '../PostalAddressForm';
import AddressService from '../../services/addressService';

function RoadTripForm({
  setToastInStore,
  resetToastInStore,
}) {
  const history = useHistory();
  const biker = useSelector((state) => state.biker.people);
  const [roadtrip, setRoadTrip] = useState(new RoadTrip());
  const [startAddress, setStartAddress] = useState(new Address());
  const [stopAddress, setStopAddress] = useState(new Address());
  const [roadtripsTypes, setRoadtripsTypes] = useState([]);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
  const [addressInForm, setAddressInForm] = useState(new Address());
  const [addressType, setAddressType] = useState(null);

  useEffect(() => {
    const SERVICE = new RoadtripService();
    SERVICE.getRoadtripsTypes().then((enumeration) => {
      setRoadtripsTypes(enumeration);
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Provisioning Failure',
        detail: exception,
      });
      resetToastInStore();
    });
  }, [setToastInStore, resetToastInStore]);

  useEffect(() => {
  }, []);

  const showPostalAddressPanel = (order, address) => {
    setAddressType(order);
    if (!address || (address.city === null || address.country == null)) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const SERVICE = new LocationService();
        SERVICE.lookupCoordinates(latitude, longitude).then((data) => {
          address.number = data.results[0].components.house_number;
          address.street = data.results[0].components.street;
          address.zipCode = data.results[0].components.postcode;
          address.city = data.results[0].components.city.toUpperCase();
          address.state = data.results[0].components.state.toUpperCase();
          address.country = data.results[0].components.country.toUpperCase();
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Coordinates Lookup Failure',
            detail: exception,
          });
          resetToastInStore();
        }).finally(() => {
          setAddressInForm(address);
          setIsAddressFormVisible(true);
        });
      });
    } else {
      setAddressInForm(address);
      setIsAddressFormVisible(true);
    }
  }

  useEffect(() => {
    if (biker) {
      const trip = new RoadTrip();
      // trip.organizer = biker;
      if (biker.address) {
        // trip.startAddress = biker.address;
        setStartAddress(biker.address);
        setStopAddress(biker.address);
      } else {
        setStartAddress(new Address());
        setStopAddress(new Address());
      }
      setRoadTrip(trip);
    }
  }, [biker, setRoadTrip, setStartAddress, setStopAddress]);

  const cancel = () => {
    history.push('/explore');
  };

  const accept = () => {
    roadtrip.status = 'SOON';
    // roadtrip.bikers.push(biker);
    const ADDRESS_SERVICE = new AddressService();
    ADDRESS_SERVICE.create(startAddress).then((updatedStartAddress) => {
      ADDRESS_SERVICE.create(stopAddress).then((updatedStopAddress) => {
        roadtrip.organizer = biker;
        roadtrip.startAddress = updatedStartAddress;
        roadtrip.stopAddress = updatedStopAddress;
        const ROADTRIP_SERVICE = new RoadtripService();
        ROADTRIP_SERVICE.create(roadtrip).then((rt1) => {
          setToastInStore({
            severity: 'success',
            summary: 'Road Trip created',
            detail: 'Your road trip is successfully created. Ride safe!',
          });
          resetToastInStore();
          history.push('/dashboard');
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Road Trip Creation Failure',
            detail: exception,
          });
          resetToastInStore();
        });
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Stop Address Creation Failure',
          detail: exception,
        });
        resetToastInStore();
      });
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Start Address Creation Failure',
        detail: exception,
      });
      resetToastInStore();
    });

  };

  const confirm = (event) => {
    event.preventDefault();
    confirmDialog({
      message: 'Are you sure you want to create this roadtrip?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept,
    });
  };

  const updateRoadtrip = (property, value) => {
    if (Object.keys(roadtrip).includes(property)) {
      const updatedRoadtrip = { ...roadtrip };
      updatedRoadtrip[property] = value;
      setRoadTrip(RoadTrip.parse(updatedRoadtrip));
    } else {
      console.log(String('Property not found: ').concat(property));
    }
  };

  const addressValueTemplate = (address) => String(address.number)
    .concat(' ')
    .concat(address.street)
    .concat(', ')
    .concat(address.zipCode)
    .concat(' ')
    .concat(address.city)
    .concat(' (')
    .concat(address.state)
    .concat('), ')
    .concat(address.country);

  const onSubmitHandle = (newAddress) => {
    if (addressType === 'startAddress') {
      setStartAddress(newAddress);
    } else if (addressType === 'stopAddress') {
      setStopAddress(newAddress);
    }
    setAddressType(null);
    setAddressInForm(new Address());
    setIsAddressFormVisible(false);
  };

  const isButtonDisabled = () => {
    if (!roadtrip.title || roadtrip.title.length < 5) {
      return true;
    }
    if (!roadtrip.description || roadtrip.description.length < 5) {
      return true;
    }
    if (!roadtrip.maxBikers || roadtrip.maxBikers < 1) {
      return true;
    }
    if (!startAddress.street || startAddress.street.length < 2) {
      return true;
    }
    if (!startAddress.zipCode || startAddress.zipCode < 0) {
      return true;
    }
    if (!startAddress.city || startAddress.city.length < 2) {
      return true;
    }
    if (!startAddress.country || startAddress.country.length < 2) {
      return true;
    }
    if (!roadtrip.startDate || roadtrip.startDate.length < 2) {
      return true;
    }
    if (!roadtrip.endDate || roadtrip.endDate.length < 2) {
      return true;
    }
    if (roadtrip.endDate < roadtrip.startDate) {
      return true;
    }
    return false;
  }

  return (
    <section className="Page Page-RoadTripForm">
      <form>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="title"
                  value={roadtrip.title}
                  minLength={5}
                  maxLength={200}
                  onChange={(e) => updateRoadtrip('title', e.target.value)}
                  required
                />
                <label htmlFor="title">Title*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputTextarea
                  id="description"
                  value={roadtrip.description}
                  minLength={10}
                  maxLength={1000}
                  onChange={(e) => updateRoadtrip('description', e.target.value)}
                  required
                />
                <label htmlFor="description">Description*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputNumber
                  id="maxBikers"
                  value={roadtrip.maxBikers}
                  onChange={(e) => updateRoadtrip('maxBikers', e.value)}
                  min={1}
                  max={999}
                  required
                />
                <label htmlFor="maxBikers">Maximum Bikers*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <Dropdown
                  id="roadTripType"
                  value={roadtrip.roadTripType}
                  options={roadtripsTypes}
                  onChange={(e) => updateRoadtrip('roadTripType', e.target.value)}
                  required
                />
                <label htmlFor="roadTripType">Roadtrip Type*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="startAddress"
                  value={addressValueTemplate(startAddress)}
                  onClick={(e) => showPostalAddressPanel('startAddress', startAddress)}
                  readOnly
                  required
                  showClear
                />
                <label htmlFor="startAddress">Start Address*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="stopAddress"
                  value={addressValueTemplate(stopAddress)}
                  required
                  onClick={(e) => showPostalAddressPanel('stopAddress', stopAddress)}
                  readOnly
                />
                <label htmlFor="stopAddress">Stop Address*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-minus" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <Calendar
                  id="startDate"
                  value={roadtrip.startDate}
                  onChange={(e) => updateRoadtrip('startDate', e.value)}
                  mask="99/99/9999"
                  dateFormat="dd/mm/yy"
                  showTime
                  required
                  minDate={new Date()}
                />
                <label htmlFor="startDate">Start Date*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-plus" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <Calendar
                  id="endDate"
                  value={roadtrip.endDate}
                  onChange={(e) => updateRoadtrip('endDate', e.value)}
                  mask="99/99/9999"
                  dateFormat="dd/mm/yy"
                  showTime
                  required
                  minDate={roadtrip.startDate}
                />
                <label htmlFor="endDate">End Date*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl>
          <Button label="Cancel" type="reset" className="p-button-secondary" icon="pi pi-times" onClick={() => cancel()} />
          <Button label="Create" className="p-button-primary" icon="pi pi-check" onClick={(event) => confirm(event)} disabled={isButtonDisabled()} />
        </dl>
      </form>
      {
        (isAddressFormVisible) ? (
          <Dialog header="Set Address" visible style={{ width: '50vw' }} onHide={setIsAddressFormVisible} >
            <PostalAddressForm address={addressInForm} onSubmit={onSubmitHandle} />
          </Dialog>
        ) : (null)
      }
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(RoadTripForm));
