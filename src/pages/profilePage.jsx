import React, {
  useState,
  useRef,
} from 'react';
import { withRouter } from 'react-router';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';

function ProfilePage() {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="Page Page-Profile">
      <Toast ref={toast} />
      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Pilot" leftIcon="pi pi-user">
          Content I
        </TabPanel>
        <TabPanel header="Garage" leftIcon="pi pi-cog">
          Content II
        </TabPanel>
      </TabView>
    </section>
  );
}

export default withRouter(ProfilePage);
