/* eslint-disable react/prop-types */
import React, {
  useEffect,
} from 'react';
import { Redirect, withRouter } from 'react-router';
import { useSelector, connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import ProfileTabPanel from '../components/ProfileTabPanel';

function ProfilePage() {
  const history = useHistory();
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
          <Link to="/logout">
            <Button label="Disconnect" className="p-button-danger" icon="pi pi-sign-out" />
          </Link>
          <ProfileTabPanel biker={biker} />
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
