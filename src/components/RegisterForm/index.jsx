/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { setToast, resetToast } from '../../store/toast/toastAction';
import { setBiker, resetBiker } from '../../store/biker/bikerAction';

import './style.css';
import AuthenticationService from '../../services/authenticationService';
import Credential from '../../entities/credential';
import RegistrationService from '../../services/registrationService';
import Biker from '../../entities/biker';
import BikerService from '../../services/bikerService';

function RegisterForm({
  title,
  setToastInStore,
  resetToastInStore,
  setBikerInStore,
  resetBikerInStore,
}) {
  const history = useHistory();
  const [, setCookie] = useCookies();
  const [biker, setTheBiker] = useState(new Biker());
  const [genders, setGenders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const SERVICE = new BikerService();
    SERVICE.getGenders().then((array) => {
      setGenders(array);
    }).catch((exception) => {
      console.error(exception);
    });
  }, [setGenders]);

  const login = () => {
    const SERVICE = new AuthenticationService();
    const CREDENTIAL = new Credential();
    CREDENTIAL.username = biker.email;
    CREDENTIAL.password = biker.password;
    SERVICE.login(CREDENTIAL).then((session) => {
      setCookie('jwt', session.jwt);
      setBikerInStore(session.biker);
      setToastInStore({
        severity: 'success',
        summary: 'Access granted',
        detail: 'You are now connected.',
      });
      resetToastInStore();
      history.push('/dashboard');
    }).catch((exception) => {
      resetBikerInStore();
      setToastInStore({
        severity: 'error',
        summary: 'Access denied',
        detail: exception,
      });
      resetToastInStore();
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const register = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const SERVICE = new RegistrationService();
    SERVICE.create(biker).then((updatedBiker) => {
      setToastInStore({
        severity: 'success',
        summary: 'Registration',
        detail: 'Your account is successfully created.',
      });
      resetToastInStore();
      setTheBiker(updatedBiker);
      login();
    }).catch((exception) => {
      resetBikerInStore();
      setToastInStore({
        severity: 'error',
        summary: 'Registration failure',
        detail: exception,
      });
      resetToastInStore();
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const updateBiker = (property, value) => {
    if (Object.keys(biker).includes(property)) {
      const updatedBiker = { ...biker };
      updatedBiker[property] = value;
      setTheBiker(Biker.parse(updatedBiker));
    } else {
      console.log(String('Property not found: ').concat(property));
    }
  };

  return (
    <section className="Component Component-Login">
      <div>
        <Card title={title}>
          <form>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputText
                      id="firstName"
                      value={biker.firstName}
                      onChange={(event) => updateBiker('firstName', event.target.value)}
                      autoFocus
                      required
                      pattern="^([a-zA-Z]{1,}([-])?){1,}[a-zA-Z]{1,}$"
                      minLength={2}
                      aria-describedby="username-field-help"
                    />
                    <label htmlFor="firstName">Firstname*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputText
                      id="lastName"
                      value={biker.lastName}
                      onChange={(event) => updateBiker('lastName', event.target.value)}
                      required
                      pattern="^([a-zA-Z]{1,}([-])?){1,}[a-zA-Z]{1,}$"
                      minLength={2}
                      aria-describedby="username-field-help"
                    />
                    <label htmlFor="lastName">Lastname*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputText
                      id="pseudo"
                      value={biker.pseudo}
                      onChange={(event) => updateBiker('pseudo', event.target.value)}
                      required
                      pattern="^([a-zA-Z]{1,}([-])?){1,}[a-zA-Z]{1,}$"
                      minLength={2}
                      aria-describedby="username-field-help"
                    />
                    <label htmlFor="pseudo">Pseudo*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-calendar" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <Calendar
                      id="birthDate"
                      value={biker.birthDate}
                      onChange={(e) => updateBiker('birthDate', e.value)}
                      mask="99/99/9999"
                      dateFormat="dd/mm/yy"
                      required
                    />
                    <label htmlFor="birthDate">Birth date*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="gender"
                      value={biker.gender}
                      options={genders}
                      onChange={(e) => updateBiker('gender', e.value)}
                      required
                      placeholder="Select a gender"
                    />
                    <label htmlFor="gender">Gender*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-envelope" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputText
                      id="email"
                      value={biker.email}
                      onChange={(event) => updateBiker('email', event.target.value)}
                      required
                      minLength={5}
                      pattern="^([a-z0-9]{1,}([-._])?){1,}[a-z0-9]{1,}@([a-z0-9]{2,}.){1,}[a-z]{2,}$"
                      aria-describedby="username-field-help"
                    />
                    <label htmlFor="email">Email*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-phone" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputMask
                      id="phoneNumber"
                      mask="99.99.99.99.99"
                      required
                      value={biker.phoneNumber}
                      onChange={(e) => updateBiker('phoneNumber', e.value)}
                    />
                    <label htmlFor="phoneNumber">Phone number*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-key" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <Password
                      id="password"
                      value={biker.password}
                      onChange={(event) => updateBiker('password', event.target.value)}
                      minLength={8}
                      required
                      toggleMask
                      aria-describedby="password-field-help"
                    />
                    <label htmlFor="email">Password*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <span>
                <Button
                  type="submit"
                  className="p-button p-button-raised p-button-primary button-register"
                  label="Register"
                  onClick={register}
                  // eslint-disable-next-line max-len
                  disabled={!biker.firstName || !biker.lastName || !biker.email || !biker.phoneNumber || !biker.birthDate || !biker.gender || !biker.password}
                  loading={isLoading}
                />
              </span>
            </dl>
            <Divider align="center">OR</Divider>
            <Link to="/login">
              <Button type="submit" className="p-button p-button-raised p-button-secondary" label="Login with an existing account" />
            </Link>
          </form>
        </Card>
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBikerInStore: (data) => dispatch(setBiker(data)),
  resetBikerInStore: () => dispatch(resetBiker()),
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(RegisterForm));
