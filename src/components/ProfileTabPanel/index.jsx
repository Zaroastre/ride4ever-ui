/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
} from 'react';
import { withRouter } from 'react-router';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import MotorbikeForm from '../MotorbikeForm';
import PilotInfoPanel from '../PilotInfoPanel';
import GarageInfoPanel from '../GarageInfoPanel';

import './style.css';
import PostalAddressForm from '../PostalAddressForm';
import HealthPanel from '../HealthPanel';
import ActivityTable from '../ActivityTable';

function ProfileTabPanel({
  biker,
  activities,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMotorbikeFormVisible, setIsMotorbikeFormVisible] = useState(false);
  return (
    <section className="Component Component-ProfileTabPanel">
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Profile Info">
          <PilotInfoPanel biker={biker.entity} />
        </TabPanel>
        <TabPanel header="Postal Address">
          <PostalAddressForm biker={biker.entity} address={biker.entity.address} />
        </TabPanel>
        <TabPanel header="Health">
          <HealthPanel biker={biker.entity} />
        </TabPanel>
        <TabPanel header="Motorcycle Clubs" />
        <TabPanel header="Garage">
          <GarageInfoPanel motorbikes={biker.entity.motorbikes} />
          <Button icon="pi pi-plus" label="Add new motorbike" onClick={() => setIsMotorbikeFormVisible(true)} />
          {
            (isMotorbikeFormVisible) ? (
              <MotorbikeForm biker={biker.entity} onHide={setIsMotorbikeFormVisible} />
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

export default withRouter(ProfileTabPanel);
