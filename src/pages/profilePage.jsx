import React, {
  useState,
} from 'react';
import { withRouter } from 'react-router';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';

function ProfilePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="Page Page-Profile">
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Pilot" leftIcon="pi pi-user">
          Content I
        </TabPanel>
        <TabPanel header="Garage" leftIcon="pi pi-cog">
          <Button icon="pi pi-plus" label="Add new motorbike" />
        </TabPanel>
      </TabView>
    </section>
  );
}

export default withRouter(ProfilePage);
