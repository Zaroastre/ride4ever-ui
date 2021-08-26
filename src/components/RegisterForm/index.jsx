/* eslint-disable react/prop-types */
import React, {
  useState,
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

function RegisterForm({
  title,
  setToastInStore,
  resetToastInStore,
  setBikerInStore,
  resetBikerInStore,
}) {
  const history = useHistory();
  const [, setCookie] = useCookies();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const GENDERS = [
    'MAN',
    'WOMAN',
    'NEUTRAL',
  ];

  const login = () => {
    const SERVICE = new AuthenticationService();
    const CREDENTIAL = new Credential();
    CREDENTIAL.username = email;
    CREDENTIAL.password = password;
    SERVICE.login(CREDENTIAL).then((session) => {
      setCookie('jwt', session.jwt);
      setBikerInStore({
        entity: session.biker,
      });
      setToastInStore({
        severity: 'success',
        summary: 'Access granted',
        detail: 'You are now connected.',
      });
      resetToastInStore();
      history.push('/profile');
    }).catch((exception) => {
      resetBikerInStore();
      setToastInStore({
        severity: 'error',
        summary: 'Access denied',
        detail: exception.error,
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
    const PILOT = new Biker();
    PILOT.firstName = firstName;
    PILOT.lastName = lastName;
    PILOT.pseudo = pseudo;
    PILOT.email = email;
    PILOT.phoneNumber = phoneNumber;
    PILOT.birthDate = birthDate;
    PILOT.gender = gender;
    PILOT.password = password;
    PILOT.address = null;
    SERVICE.create(PILOT).then(() => {
      setToastInStore({
        severity: 'success',
        summary: 'Registration',
        detail: 'Your account is successfully created.',
      });
      resetToastInStore();
      login();
    }).catch((exception) => {
      resetBikerInStore();
      setToastInStore({
        severity: 'error',
        summary: 'Registration failure',
        detail: exception.error,
      });
      resetToastInStore();
    }).finally(() => {
      setIsLoading(false);
    });
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
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
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
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
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
                      value={pseudo}
                      onChange={(event) => setPseudo(event.target.value)}
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
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.value)}
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
                      value={gender}
                      options={GENDERS}
                      onChange={(e) => setGender(e.value)}
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
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.value)}
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
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      minLength={8}
                      required
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
                  disabled={!firstName || !lastName || !email || !phoneNumber || !birthDate || !gender || !password}
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
