/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';
import { Redirect, withRouter } from 'react-router';
import { useSelector, connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import ProfileTabPanel from '../components/ProfileTabPanel';
import ActivityService from '../services/activityService';
import MotorbikeService from '../services/motorbikeService';

function ProfilePage() {
  const history = useHistory();
  const biker = useSelector((state) => state.biker.people);
  const [activities, setActivities] = useState([]);
  const [motorbikes, setMotorbikes] = useState([]);

  useEffect(() => {
    if (!biker) {
      history.push('/login');
    } else {
      const ACTIVITY_SERVICE = new ActivityService();
      ACTIVITY_SERVICE.findAll({ pseudo: biker.pseudo }).then((list) => {
        setActivities(list);
      }).catch((exception) => {
        console.error(exception);
      });
      const MOTORBIKE_SERVICE = new MotorbikeService();
      MOTORBIKE_SERVICE.findAll({ biker_pseudo: biker.pseudo }).then((list) => {
        setMotorbikes(list);
      }).catch((exception) => {
        console.error(exception);
      });
    }
  }, [biker, history, setActivities]);

  const render = () => {
    if (biker && biker) {
      return (
        <section className="Page Page-Profile">
          <h1>Profile</h1>
          <Link to="/logout">
            <Button label="Disconnect" className="p-button-danger" icon="pi pi-sign-out" />
          </Link>
          <ProfileTabPanel biker={biker} motorbikes={motorbikes} activities={activities} />
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
