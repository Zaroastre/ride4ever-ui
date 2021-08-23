/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Steps } from 'primereact/steps';
import { Dialog } from 'primereact/dialog';
import { ColorPicker } from 'primereact/colorpicker';

import { setToast, resetToast } from '../../store/toast/toastAction';
import { setBiker, resetBiker } from '../../store/biker/bikerAction';

import './style.css';

function MotorbikeForm({
  title,
  setToastInStore,
  resetToastInStore,
  setPilotInStore,
  resetPilotInStore,
}) {
  const history = useHistory();
  const toast = useRef(null);
  const [, setCookie] = useCookies();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [engineDisplacement, setEngineDisplacement] = useState(0);
  const [year, setYear] = useState(0);

  const [type, setType] = useState(null);
  const [color, setColor] = useState(null);
  const [fuelTankSize, setFuelTankSize] = useState(0);
  const [mileage, setMileage] = useState(0);

  const [licensePlate, setLicensePlate] = useState(null);
  const [isRestrained, setIsRestrained] = useState(false);

  const [picture, setPicture] = useState(null);

  const interactiveItems = [
    {
      label: 'Identity',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
      },
    },
    {
      label: 'Detail',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Seat Selection', detail: event.item.label });
      },
    },
    {
      label: 'Legislation',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Pay with CC', detail: event.item.label });
      },
    },
    {
      label: 'Pictures',
      command: (event) => {
        toast.current.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
      },
    },
  ];

  const showPanel = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="brand"
                      value={brand}
                      options={[]}
                      onChange={(e) => setBrand(e.value)}
                      required
                    />
                    <label htmlFor="brand">Brand*</label>
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
                      value={model}
                      options={[]}
                      // onChange={onCountryChange}
                      optionLabel="name"
                      filter
                      showClear
                      editable
                      filterBy="name"
                      required
                    />
                    <label htmlFor="model">Model*</label>
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
                    <InputNumber
                      value={engineDisplacement}
                      onValueChange={(e) => setEngineDisplacement(e.value)}
                      suffix=" cm3"
                      min={0}
                      max={2500}
                    />
                    <label htmlFor="engineDisplacement">Engine Displacement*</label>
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
                    <InputNumber
                      value={year}
                      onValueChange={(e) => setYear(e.value)}
                      min={1600}
                      mode="decimal"
                      required
                      max={(new Date()).getFullYear() + 1}
                    />
                    <label htmlFor="engineDisplacement">Year*</label>
                  </span>
                </div>
              </div>
            </dl>
          </div>
        );

      case 1:
        return (
          <div>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <Dropdown
                      id="type"
                      value={type}
                      options={[]}
                      onChange={(e) => setType(e.value)}
                      required
                    />
                    <label htmlFor="type">Type*</label>
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
                    <ColorPicker
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.value)}
                      required
                    />
                    <ColorPicker
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.value)}
                      required
                    />
                    <label htmlFor="color">color*</label>
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
                    <InputNumber
                      id="fuelTankSize"
                      value={fuelTankSize}
                      onValueChange={(e) => setFuelTankSize(e.value)}
                      suffix=" liters"
                      min={0}
                      max={100}
                    />
                    <label htmlFor="fuelTankSize">Fuel Tank Size*</label>
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
                    <InputNumber
                      id="mileage"
                      value={mileage}
                      onValueChange={(e) => setMileage(e.value)}
                      suffix=" kms"
                      required
                      min={0}
                      max={999999}
                    />
                    <label htmlFor="mileage">Mileage*</label>
                  </span>
                </div>
              </div>
            </dl>
          </div>
        );
      case 2:
        return (
          <div>
            <dl className="p-field">
              <div>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user" />
                  </span>
                  <span className="p-float-label p-input-icon-right">
                    <InputMask
                      id="licensePlate"
                      mask="aa-999-aa"
                      value={licensePlate}
                      required
                      onChange={(e) => setLicensePlate(e.value)}
                    />
                    <label htmlFor="licensePlate">License Plate*</label>
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
                    <InputSwitch
                      id="isRestrained"
                      checked={isRestrained}
                      onChange={(e) => setIsRestrained(e.value)}
                    />
                    <label htmlFor="isRestrained">Is Restrained*</label>
                  </span>
                </div>
              </div>
            </dl>
          </div>
        );

      default:
        break;
    }
    return (null);
  };

  const footer = () => {
    if (activeIndex === 0) {
      return (
        <div>
          <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" />
          <Button label="Next" icon="pi pi-angle-right" className="p-button-primary" onClick={() => setActiveIndex(activeIndex + 1)} />
        </div>
      );
    }
    if (activeIndex === interactiveItems.length - 1) {
      return (
        <div>
          <Button label="Previous" icon="pi pi-angle-left" className="p-button-secondary" onClick={() => setActiveIndex(activeIndex - 1)} />
          <Button label="Create" icon="pi pi-plus" className="p-button-primary" />
        </div>
      );
    }
    return (
      <div>
        <Button label="Previous" icon="pi pi-angle-left" className="p-button-secondary" onClick={() => setActiveIndex(activeIndex - 1)} />
        <Button label="Next" icon="pi pi-angle-right" className="p-button-primary" onClick={() => setActiveIndex(activeIndex + 1)} />
      </div>
    );
  };

  return (
    <section className="Component Component-Login">
      <Dialog header="Register a new motorbike" visible style={{ width: '50vw' }} footer={footer}>
        <Steps
          model={interactiveItems}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly
        />
        <div>
          <form>
            {showPanel()}
          </form>
        </div>
      </Dialog>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(MotorbikeForm));
