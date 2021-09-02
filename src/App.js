import React, {
  useEffect,
  useRef,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { /* Redirect, */ withRouter } from 'react-router';
// import { useCookies } from 'react-cookie';
import { connect, useSelector } from 'react-redux';

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Toast } from 'primereact/toast';
// import { BreadCrumb } from 'primereact/breadcrumb';

import { setToast, resetToast } from './store/toast/toastAction';
import { setReservations } from './store/reservation/reservationAction';

import Header from './components/Header';
import Footer from './components/Footer';

import IntroPage from './pages/introPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import LogoutPage from './pages/logoutPage';
import RegisterPage from './pages/registerPage';
import RecoveryPage from './pages/recoveryPage';
import ProfilePage from './pages/profilePage';
import OrganizePage from './pages/organizePage';
import SearchPage from './pages/searchPage';
import DashboardPage from './pages/dashboardPage';
import RoadTripPage from './pages/roadtripPage';
import NotFoundPage from './pages/notFoundPage';

import './App.css';
import reservationPage from './pages/reservationPage';
import ReservationService from './services/reservationService';
import roadTripAdminPage from './pages/roadTripAdminPage';

/**
 * Ride 4 Ever Main Component.
 * @returns React Component.
 */
function App({
  setReservationsInStore,
  setToastInStore,
  resetToastInStore,
}) {
  // Properties / fields / state of the component.
  const toast = useRef(null);
  const biker = useSelector((state) => state.biker.people);

  useEffect(() => {
    if (biker) {
      const SERVICE = new ReservationService();
      SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
        setReservationsInStore(list);
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Cancel Failure',
          detail: exception,
        });
        resetToastInStore();
      });
    }
    if (!window.Notification) {
      console.log('Browser does not support notifications.');
    } else {
      // check if permission is already granted
      if (Notification.permission === 'granted') {
        const notification = new Notification("[R4E] Notification Broker", {
          body: "We are testing notification desktop engine."
        });
        notification.onclick = (e) => {
          window.location.href = "https://google.com";
        };
      } else {
        // request permission from user
        Notification.requestPermission().then(function (p) {
          if (p === 'granted') {
            // show notification here
            const notification = new Notification("[R4E] Notification Broker", {
              body: "We are testing notification desktop engine."
            });
            notification.onclick = () => {
              window.location.href = "https://google.com";
            };
          } else {
            console.log('User blocked notifications.');
          }
        }).catch(function (err) {
          console.error(err);
        });
      }
    }
  }, [biker, setReservationsInStore, setToastInStore, resetToastInStore]);

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route exact path="/explore" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/organize" component={OrganizePage} />
          <Route exact path="/recovery" component={RecoveryPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/reservation" component={reservationPage} />
          <Route exact path="/admin" component={roadTripAdminPage} />
          <Route path="/roadtrips/:roadtripIdentifier" component={RoadTripPage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
  setReservationsInStore: (list) => dispatch(setReservations(list)),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
