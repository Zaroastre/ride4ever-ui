/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import { Redirect, withRouter } from 'react-router';
import { useSelector, connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import MotorbikeForm from '../components/MotorbikeForm';
import PilotInfoPanel from '../components/PilotInfoPanel';
import GarageInfoPanel from '../components/GarageInfoPanel';

function ProfilePage() {
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMotorbikeFormVisible, setIsMotorbikeFormVisible] = useState(false);
  const biker = useSelector((state) => state.biker.entity);

  useEffect(() => {
    if (!biker) {
      history.push('/login');
    }
  }, [biker, history]);

  const render = () => {
    if (biker && biker.entity) {
      return (
        <section className="Page Page-Profile">
          <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Pilot" leftIcon="pi pi-user">
              <PilotInfoPanel biker={biker.entity} />
            </TabPanel>
            <TabPanel header="Garage" leftIcon="pi pi-cog">
              <GarageInfoPanel motorbikes={biker.entity.motorbikes} />
              <Button icon="pi pi-plus" label="Add new motorbike" onClick={() => setIsMotorbikeFormVisible(true)} />
              {
                isMotorbikeFormVisible ? (<MotorbikeForm />) : null
              }
            </TabPanel>
          </TabView>
          <Link to="/logout">
            <Button label="Disconnect" className="p-button-danger" />
          </Link>
        </section>
      );
    }
    return (
      <Redirect to="/login" />
    );
  };

  return render();
}

const mapDispatchToProps = () => ({
  // setToastInStore: (data) => dispatch(setToast(data)),
  // resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(ProfilePage));
