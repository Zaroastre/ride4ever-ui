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
import { setBiker } from '../../store/biker/bikerAction';

import AddressService from '../../services/addressService';
import BikerService from '../../services/bikerService';

import './style.css';

function PostalAddressForm({
  biker,
  address,
  setToastInStore,
  resetToastInStore,
  setBikerInStore,
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
      console.error(exception);
    });
  }, [setCountries]);

  const updateBikerAddress = () => {
    const SERVICE = new BikerService();
    if (biker && postalAddress) {
      biker.address = postalAddress;
      SERVICE.update(biker.identifier, biker).then((updatedBiker) => {
        setBikerInStore({
          entity: updatedBiker,
        });
        setToastInStore({
          severity: 'success',
          summary: 'Biker Address Updated',
          detail: 'You are now connected.',
        });
        resetToastInStore();
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Biker Address Update Failure',
          detail: exception.error,
        });
        resetToastInStore();
      });
    }
  };

  const updateAddressHandle = () => {
    const SERVICE = new AddressService();
    if (postalAddress.identifier <= 0) {
      SERVICE.create(postalAddress).then((updatedAddress) => {
        setPostalAddress(updatedAddress);
        updateBikerAddress();
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Address Creation Failure',
          detail: exception.error,
        });
        resetToastInStore();
      });
    } else {
      SERVICE.update(postalAddress.identifier, postalAddress).then((updatedAddress) => {
        setPostalAddress(updatedAddress);
        updateBikerAddress();
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Address Update Failure',
          detail: exception.error,
        });
        resetToastInStore();
      });
    }
  };

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
                    <label htmlFor="model">State*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <InputNumber
                      value={postalAddress.zipCode}
                      onValueChange={(e) => updateAddress('zipCode', e.value)}
                      min={1}
                    />
                    <label htmlFor="engineDisplacement">Zip Code*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
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
                    <label htmlFor="model">City*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      value={postalAddress.street}
                      options={[]}
                      onChange={(e) => updateAddress('street', e.value)}
                      // optionLabel="name"
                      filter
                      showClear
                      editable
                      filterBy="name"
                      placeholder="Select a City"
                    // valueTemplate={selectedCountryTemplate}
                    // itemTemplate={countryOptionTemplate}
                    />
                    <label htmlFor="engineDisplacement">Street*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-float-label p-input-icon-right">
                    <InputNumber
                      value={postalAddress.number}
                      onValueChange={(e) => updateAddress('number', e.value)}
                      min={1}
                    />
                    <label htmlFor="engineDisplacement">Number*</label>
                  </span>
                </div>
              </div>
            </dl>
          </div>
        </form>
      </div>
      <Button label="Update" onClick={updateAddressHandle} />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBikerInStore: (data) => dispatch(setBiker(data)),
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(PostalAddressForm));
