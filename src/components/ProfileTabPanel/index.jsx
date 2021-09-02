/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import MotorbikeForm from '../MotorbikeForm';
import PilotInfoPanel from '../PilotInfoPanel';
import GarageInfoPanel from '../GarageInfoPanel';

import './style.css';
import PostalAddressForm from '../PostalAddressForm';
import HealthPanel from '../HealthPanel';
import ActivityTable from '../ActivityTable';
import BikerService from '../../services/bikerService';
import { setBiker } from '../../store/biker/bikerAction';
import AddressService from '../../services/addressService';
import { resetToast, setToast } from '../../store/toast/toastAction';
import Address from '../../entities/address';

function ProfileTabPanel({
  biker,
  motorbikes,
  activities,
  setBikerInStore,
  resetToastInStore,
  setToastInStore,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMotorbikeFormVisible, setIsMotorbikeFormVisible] = useState(false);
  const [, setPostalAddress] = useState(new Address());

  const updateBikerAddress = (postalAddress) => {
    const SERVICE = new BikerService();
    if (biker && postalAddress) {
      biker.address = postalAddress;
      SERVICE.update(biker.identifier, biker).then((updatedBiker) => {
        setBikerInStore(updatedBiker);
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
          detail: exception,
        });
        resetToastInStore();
      });
    }
  };

  const updateAddressHandle = (postalAddress) => {
    const SERVICE = new AddressService();
    if (postalAddress.identifier <= 0) {
      SERVICE.create(postalAddress).then((updatedAddress) => {
        setPostalAddress(updatedAddress);
        updateBikerAddress(updatedAddress);
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Address Creation Failure',
          detail: exception,
        });
        resetToastInStore();
      });
    } else {
      SERVICE.update(postalAddress.identifier, postalAddress).then((updatedAddress) => {
        setPostalAddress(updatedAddress);
        updateBikerAddress(postalAddress);
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Address Update Failure',
          detail: exception,
        });
        resetToastInStore();
      });
    }
  };

  return (
    <section className="Component Component-ProfileTabPanel">
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Profile Info">
          <PilotInfoPanel biker={biker} />
        </TabPanel>
        <TabPanel header="Postal Address">
          <PostalAddressForm address={biker.address} onSubmit={updateAddressHandle} />
        </TabPanel>
        <TabPanel header="Health">
          <HealthPanel biker={biker} />
        </TabPanel>
        <TabPanel header="Motorcycle Clubs" />
        <TabPanel header="Garage">
          <GarageInfoPanel motorbikes={motorbikes} />
          <Button icon="pi pi-plus" label="Add new motorbike" onClick={() => setIsMotorbikeFormVisible(true)} />
          {
            (isMotorbikeFormVisible) ? (
              <MotorbikeForm biker={biker} onHide={setIsMotorbikeFormVisible} />
            ) : (null)
          }
        </TabPanel>
        <TabPanel header="Activity">
          <ActivityTable activities={activities} />
        </TabPanel>
      </TabView>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBikerInStore: (data) => dispatch(setBiker(data)),
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(ProfileTabPanel));
