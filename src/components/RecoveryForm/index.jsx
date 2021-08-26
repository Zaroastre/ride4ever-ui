/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useRef,
} from 'react';
import { withRouter } from 'react-router';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputMask } from 'primereact/inputmask';
import { Steps } from 'primereact/steps';
import { RadioButton } from 'primereact/radiobutton';

import './style.css';

function RecoveryForm({ title, onLoginSuccess, onLoginFailure }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [mustStayConnected, setMustStayConnected] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const toast = useRef(null);

  const search = () => {
    // TODO TBD
    setActiveIndex(1);
  };
  const select = () => {
    // TODO TBD
    setActiveIndex(2);
  };
  const validate = () => {
    // TODO TBD
    setActiveIndex(3);
  };
  const change = () => {
    // TODO TBD
    toast.current.show({ severity: 'success', summary: 'Password updated.', detail: 'Password is successfully updated!' });
  };

  const updateMustStayConnected = () => {
    setMustStayConnected(!mustStayConnected);
  };

  const interactiveItems = [
    {
      label: 'Search',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
      },
    },
    {
      label: 'Select',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Seat Selection', detail: event.item.label });
      },
    },
    {
      label: 'Validate',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Pay with CC', detail: event.item.label });
      },
    },
    {
      label: 'Change',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
      },
    },
  ];

  const displayStep = () => {
    switch (activeIndex) {
      case 0:
        return (
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
                      minLength={5}
                      aria-describedby="username-field-help"
                    />
                    <label htmlFor="email">Email*</label>
                  </span>
                </div>
              </div>
            </dl>
            <Divider align="center">OR</Divider>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-phone" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputMask
                      id="phone-number"
                      mask="99.99.99.99.99"
                      required
                    // value={value}
                    // onChange={(e) => setValue(e.value)}
                    />
                    <label htmlFor="email">Phone number*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <span>
                <Button type="submit" className="p-button p-button-raised p-button-primary" label="Search" icon="pi pi-search" onClick={search} />
                <Divider align="center">OR</Divider>
                <Link to="/login">Go to login page</Link>
              </span>
            </dl>
          </form>
        );
      case 1:
        return (
          <form>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <RadioButton
                    inputId="email"
                    name="sender"
                    value="email"
                    // onChange={(e) => setCity(e.value)}
                    checked
                  />
                  <label htmlFor="email">Send the code by email : </label>
                </div>
                <div className="p-inputgroup">
                  <RadioButton
                    inputId="phoneNumber"
                    name="sender"
                    value="phoneNumber"
                    // onChange={(e) => setCity(e.value)}
                    disabled
                  />
                  <label htmlFor="phoneNumber">Send the code by SMS : </label>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <span>
                <Button type="button" className="p-button p-button-raised p-button-secondary" label="Previous" icon="pi pi-angle-left" onClick={() => setActiveIndex(0)} />
                <Button type="submit" className="p-button p-button-raised p-button-primary" label="Select" icon="pi pi-send" onClick={select} />
                <Divider align="center">OR</Divider>
                <Link to="/login">Go to login page</Link>
              </span>
            </dl>
          </form>
        );
      case 2:
        return (
          <form>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputMask
                      id="code"
                      mask="999-999"
                      required
                    // value={value}
                    // onChange={(e) => setValue(e.value)}
                    />
                    <label htmlFor="email">Code*</label>
                  </span>
                </div>
              </div>
            </dl>
            <dl className="p-field">
              <span>
                <Button type="button" className="p-button p-button-raised p-button-secondary" label="Previous" icon="pi pi-angle-left" onClick={() => setActiveIndex(1)} />
                <Button type="submit" className="p-button p-button-raised p-button-primary" label="Validate" icon="pi pi-key" onClick={validate} />
                <Divider align="center">OR</Divider>
                <Link to="/login">Go to login page</Link>
              </span>
            </dl>
          </form>
        );
      case 3:
        return (
          <form>
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
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-key" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <Password
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
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
                <Button type="button" className="p-button p-button-raised p-button-secondary" label="Previous" icon="pi pi-angle-left" onClick={() => setActiveIndex(2)} />
                <Button type="submit" className="p-button p-button-raised p-button-primary" label="Change" icon="pi pi-check" onClick={change} />
                <Divider align="center">OR</Divider>
                <Link to="/login">Go to login page</Link>
              </span>
            </dl>
          </form>
        );
      default:
        return (null);
    }
  };

  return (
    <section className="Component Component-Login">
      <Toast ref={toast} />
      <div>
        <Card title={title}>
          <Steps
            model={interactiveItems}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            readOnly
          />
          {displayStep()}
        </Card>

      </div>
    </section>
  );
}

export default withRouter(RecoveryForm);
