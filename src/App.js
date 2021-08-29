import React, {
  useEffect,
  useRef,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { /* Redirect, */ withRouter } from 'react-router';
import { useCookies } from 'react-cookie';
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

function App({
  setReservationsInStore,
  setToastInStore,
  resetToastInStore,
}) {
  const toast = useRef(null);

  const cookies = useCookies();

  const biker = useSelector((state) => state.biker.people);
  const reservations = useSelector((state) => state.reservations.list);

  console.log(reservations);

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
  }, [biker]);

  // const items = [
  //   { label: 'DashBoard', url: '/dashboard' },
  //   { label: 'Roadtrips', url: '/explore' },
  //   { label: 'Search' },
  // ];
  // const home = { icon: 'pi pi-home', url: '/' }

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <main>
        {/* <BreadCrumb model={items} home={home} /> */}
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
