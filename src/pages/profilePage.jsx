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

function ProfilePage() {
  const history = useHistory();
  const biker = useSelector((state) => state.biker.entity);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!biker) {
      history.push('/login');
    } else {
      const SERVICE = new ActivityService();
      console.log(biker.entity);
      SERVICE.findAll({ pseudo: biker.entity.pseudo }).then((list) => {
        setActivities(list);
      }).catch((exception) => {
        console.error(exception);
      });
    }
  }, [biker, history, setActivities]);

  const render = () => {
    if (biker && biker.entity) {
      return (
        <section className="Page Page-Profile">
          <Link to="/logout">
            <Button label="Disconnect" className="p-button-danger" icon="pi pi-sign-out" />
          </Link>
          <ProfileTabPanel biker={biker} activities={activities} />
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
