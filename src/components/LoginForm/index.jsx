/* eslint-disable react/prop-types */
import React, {
  useState,
} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';

import { setToast, resetToast } from '../../store/toast/toastAction';
import { setBiker, resetBiker } from '../../store/biker/bikerAction';

import AuthenticationService from '../../services/authenticationService';
import Credential from '../../entities/credential';

import './style.css';

function LoginForm({
  title,
  setToastInStore,
  resetToastInStore,
  setBikerInStore,
  resetBikerInStore,
}) {
  const history = useHistory();
  const [, setCookie] = useCookies();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [mustStayConnected, setMustStayConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const SERVICE = new AuthenticationService();
    const CREDENTIAL = new Credential();
    CREDENTIAL.username = email;
    CREDENTIAL.password = password;
    SERVICE.login(CREDENTIAL).then((session) => {
      setCookie('jwt', session.jwt);
      setCookie('sessionid', session.id);
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

  const updateMustStayConnected = () => {
    setMustStayConnected(!mustStayConnected);
  };

  return (
    <section className="Component Component-Login">
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
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoFocus
                    required
                    pattern="^([a-z0-9]{1,}([-._])?){1,}[a-z0-9]{1,}@([a-z0-9]{2,}.){1,}[a-z]{2,}$"
                    minLength={5}
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
                  <i className="pi pi-key" />
                </span>
                <span className="p-float-label p-input-icon-right">
                  <Password
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
            <div>
              <div className="p-inputgroup">
                <Checkbox
                  inputId="login-must-stay-connected"
                  value={mustStayConnected}
                  onChange={updateMustStayConnected}
                  checked={mustStayConnected}
                />
                <label htmlFor="login-must-stay-connected" className="p-checkbox-label">Must stay connected.</label>
              </div>
            </div>
          </dl>
          <dl className="p-field">
            <span>
              <Button
                type="submit"
                className="p-button p-button-raised p-button-primary button-login"
                label="Login"
                onClick={login}
                disabled={!email || !password}
                loading={isLoading}
              />
            </span>
          </dl>
          <Link to="/recovery">Password lost?</Link>
          <Divider align="center">OR</Divider>
          <Link to="/register">
            <Button type="submit" className="p-button p-button-raised p-button-secondary" label="Create a account" />
          </Link>
        </form>
      </Card>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBikerInStore: (data) => dispatch(setBiker(data)),
  resetBikerInStore: () => dispatch(resetBiker()),
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
