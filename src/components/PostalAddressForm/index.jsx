/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Address from '../../entities/address';

import { setToast, resetToast } from '../../store/toast/toastAction';

import AddressService from '../../services/addressService';

import './style.css';
import LocationService from '../../services/locationService';

function PostalAddressForm({
  address,
  onSubmit,
  setToastInStore,
  resetToastInStore,
}) {
  const [postalAddress, setPostalAddress] = useState(new Address());
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!address) {
      setPostalAddress(new Address());
    } else {
      setPostalAddress(Address.parse(address));
    }
  }, [address, setPostalAddress]);

  useEffect(() => {
    const SERVICE = new AddressService();
    SERVICE.getCountries().then((array) => {
      setCountries(array);
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Data Provisioning Failure',
        detail: 'Unable to retieve list of countries.',
      });
      resetToastInStore();
      console.error(exception);
    });
  }, [setCountries, resetToastInStore, setToastInStore]);

  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option}</div>
        </div>
      );
    }

    return (
      <span>
        {props.placeholder}
      </span>
    );
  };

  const countryOptionTemplate = (option) => (
    <div className="country-item">
      <div>{option}</div>
    </div>
  );

  const updateAddress = (property, value) => {
    if (Object.keys(postalAddress).includes(property)) {
      const updatedPostalAddress = { ...postalAddress };
      updatedPostalAddress[property] = value;
      setPostalAddress(Address.parse(updatedPostalAddress));
    } else {
      console.log(String('Property not found: ').concat(property));
    }
  };

  const locate = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const SERVICE = new LocationService();
      SERVICE.lookupCoordinates(latitude, longitude).then((data) => {
        if (data.results) {
          const locatedAddress = new Address();
          locatedAddress.number = data.results[0].components.house_number;
          locatedAddress.street = data.results[0].components.street;
          locatedAddress.zipCode = data.results[0].components.postcode;
          locatedAddress.city = data.results[0].components.city.toUpperCase();
          locatedAddress.state = data.results[0].components.state.toUpperCase();
          locatedAddress.country = data.results[0].components.country.toUpperCase();
          setPostalAddress(locatedAddress);
        }
      }).catch((exception) => {
        console.log(exception);
        setToastInStore({
          severity: 'error',
          summary: 'Coordinates Lookup Failure',
          detail: exception,
        });
        resetToastInStore();
      })
    });
  };

  return (
    <section className="Component Component-ProfileTabPanel">
      <div className="card">
        <form>
          <div>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="country"
                      value={postalAddress.country}
                      options={countries}
                      onChange={(e) => updateAddress('country', e.value)}
                      // filter
                      showClear
                      placeholder="Select a Country"
                      valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate}
                    />
                    <label htmlFor="country">Country*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="state"
                      value={postalAddress.state}
                      options={[]}
                      onChange={(e) => updateAddress('state', e.value)}
                      // optionLabel="name"
                      editable
                      showClear
                      placeholder="Select a State"
                    // valueTemplate={selectedCountryTemplate}
                    // itemTemplate={countryOptionTemplate}
                    />
                    <label htmlFor="state">State*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <InputNumber
                      id="zipCode"
                      value={postalAddress.zipCode}
                      onValueChange={(e) => updateAddress('zipCode', e.value)}
                      min={1}
                    />
                    <label htmlFor="zipCode">Zip Code*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="city"
                      value={postalAddress.city}
                      options={[]}
                      onChange={(e) => updateAddress('city', e.value)}
                      // optionLabel="name"
                      filter
                      showClear
                      editable
                      filterBy="name"
                      placeholder="Select a City"
                    // valueTemplate={selectedCountryTemplate}
                    // itemTemplate={countryOptionTemplate}
                    />
                    <label htmlFor="city">City*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="street"
                      value={postalAddress.street}
                      options={[]}
                      onChange={(e) => updateAddress('street', e.value)}
                      // optionLabel="name"
                      filter
                      showClear
                      editable
                      filterBy="name"
                      placeholder="Select a Street"
                    // valueTemplate={selectedCountryTemplate}
                    // itemTemplate={countryOptionTemplate}
                    />
                    <label htmlFor="street">Street*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <InputNumber
                      id="number"
                      value={postalAddress.number}
                      onValueChange={(e) => updateAddress('number', e.value)}
                      min={1}
                    />
                    <label htmlFor="number">Number*</label>
                  </span>
                </div>
              </div>
            </dl>
          </div>
        </form>
      </div>
      <Button label="Locate" className="p-button-secondary" onClick={() => locate()} />
      <Button label="Update" className="p-button-primary" onClick={() => onSubmit(postalAddress)} />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(PostalAddressForm));
