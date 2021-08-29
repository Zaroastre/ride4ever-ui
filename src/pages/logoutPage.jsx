/* eslint-disable react/prop-types */
import {
  useEffect,
  useCallback,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { resetBiker } from '../store/biker/bikerAction';
import { setToast, resetToast } from '../store/toast/toastAction';
import { setReservations } from '../store/reservation/reservationAction';

import './style.css';
import AuthenticationService from '../services/authenticationService';
import Session from '../entities/session';

function LogoutPage({
  resetBikerInStore,
  setToastInStore,
  resetToastInStore,
  setReservationsInStore,
}) {
  const history = useHistory();
  const [cookies, setCookie] = useCookies();
  const biker = useSelector((state) => state.biker.people);

  const logout = useCallback(() => {
    resetBikerInStore();
    setCookie('jwt', null);
    setCookie('sessionid', null);
    const SESSION = new Session();
    SESSION.jwt = cookies.jwt;
    SESSION.biker = biker;
    SESSION.id = cookies.sessionid;
    const SERVICE = new AuthenticationService();
    SERVICE.logout(SESSION).then(() => {
      console.log('OK');
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Disconnection Process failure',
        detail: exception,
      });
      resetToastInStore();
    }).finally(() => {
      setToastInStore({
        severity: 'success',
        summary: 'Logout Success',
        detail: 'You are now log out.',
      });
      resetToastInStore();
      setReservationsInStore([]);
      cookies.jwt = null;
      history.push('/login');
    });
  }, [resetBikerInStore, history, biker, cookies, resetToastInStore, setToastInStore]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    null
  );
}

const mapDispatchToProps = (dispatch) => ({
  resetBikerInStore: () => dispatch(resetBiker()),
  setToastInStore: (data) => dispatch(setToast(data)),
  setReservationsInStore: (data) => dispatch(setReservations(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(LogoutPage));
