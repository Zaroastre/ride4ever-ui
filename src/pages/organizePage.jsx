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
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

import { setToast, resetToast } from '../store/toast/toastAction';
import RoadtripService from '../services/roadtripService';
import RoadTrip from '../entities/roadtrip';
import Address from '../entities/address';

function OrganizePage({
  setToastInStore,
  resetToastInStore,
}) {
  const history = useHistory();
  const biker = useSelector((state) => state.biker.entity);
  const [roadtrip, setRoadTrip] = useState(new RoadTrip());
  const [startAddress, setStartAddress] = useState(new Address());
  const [stopAddress, setStopAddress] = useState(new Address());
  const [roadtripsTypes, setRoadtripsTypes] = useState([]);

  useEffect(() => {
    const SERVICE = new RoadtripService();
    SERVICE.getRoadtripsTypes().then((enumeration) => {
      setRoadtripsTypes(enumeration);
    });
  }, []);

  useEffect(() => {
    if (biker && biker.entity) {
      const trip = new RoadTrip();
      trip.organizer = biker.entity;
      if (trip.organizer.address) {
        trip.startAddress = trip.organizer.address;
        setStartAddress(trip.organizer.address);
        setStopAddress(trip.organizer.address);
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
    roadtrip.startAddress = startAddress;
    roadtrip.stopAddress = stopAddress;
    roadtrip.status = 'SOON';
    const SERVICE = new RoadtripService();
    SERVICE.create(roadtrip).then(() => {
      setToastInStore({
        severity: 'success',
        summary: 'Road Trip created',
        detail: 'Your road trip is successfully created. Ride safe!',
      });
      resetToastInStore();
      history.push('/dashboard');
    }).catch((expcetion) => {
      console.error(expcetion);
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

  const updateAddress = (address, isStart, property, value) => {
    console.log(property, value);
    if (Object.keys(address).includes(property)) {
      const updatedAddress = address;
      updatedAddress[property] = value;
      if (isStart) {
        setStartAddress(updatedAddress);
      } else {
        setStopAddress(updatedAddress);
      }
    } else {
      console.log(String('Property not found: ').concat(property));
    }
  };

  return (
    <section className="Page Page-OrganizePage">
      <h1>Organize a new road trip</h1>
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
                  value={startAddress.zipCode}
                  onChange={(e) => updateAddress(startAddress, true, 'zipCode', e.target.value)}
                  required
                />
                <label htmlFor="startAddress">Start Address (Zip Code)*</label>
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
                  value={stopAddress.zipCode}
                  onChange={(e) => updateAddress(stopAddress, false, 'zipCode', e.target.value)}
                  required
                />
                <label htmlFor="stopAddress">Stop Address (Zip Code)*</label>
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
                  minDate={roadtrip.startDate}
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
          <Button label="Create" className="p-button-primary" icon="pi pi-check" onClick={(event) => confirm(event)} />
        </dl>
      </form>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(OrganizePage));
