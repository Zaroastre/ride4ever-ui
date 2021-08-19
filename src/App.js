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

import HomePage from './pages/homePage';
import NotFoundPage from './pages/notFoundPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import RecoveryPage from './pages/recoveryPage';
import ProfilePage from './pages/profilePage';

import './App.css';

function App() {
  const toast = useRef(null);
  // const coockies = useCookies();

  return (
    <>
      <Toast ref={toast} />
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/recovery" component={RecoveryPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/*" component={NotFoundPage} />
        </Switch>
      </main>
    </>
  );
}

export default withRouter(App);
