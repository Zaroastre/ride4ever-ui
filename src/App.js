import React, {
  useRef,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { /* Redirect, */ withRouter } from 'react-router';
// import { useCookies } from 'react-cookie';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Header from './components/Header';

import IntroPage from './pages/introPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import LogoutPage from './pages/logoutPage';
import RegisterPage from './pages/registerPage';
import RecoveryPage from './pages/recoveryPage';
import ProfilePage from './pages/profilePage';
import OrganizePage from './pages/organizePage';
import JoinPage from './pages/joinPage';
import DashboardPage from './pages/dashboardPage';
import NotFoundPage from './pages/notFoundPage';

import './App.css';

function App() {
  const toast = useRef(null);

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
          <Route exact path="/join" component={JoinPage} />
          <Route exact path="/organize" component={OrganizePage} />
          <Route exact path="/recovery" component={RecoveryPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

export default withRouter(App);
