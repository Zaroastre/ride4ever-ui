/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
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

import MotorbikeService from '../../services/motorbikeService';
import BikerService from '../../services/bikerService';
import Motorbike from '../../entities/motorbike';
import { setToast, resetToast } from '../../store/toast/toastAction';
import { setBiker } from '../../store/biker/bikerAction';

import './style.css';

function MotorbikeForm({
  biker,
  moto,
  title,
  setToastInStore,
  resetToastInStore,
  setBikerInStore,
  onHide,
}) {
  const toast = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [motorbike, setMotorbike] = useState(new Motorbike());
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

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

  useEffect(() => {
    if (!moto) {
      setMotorbike(new Motorbike());
    } else {
      setMotorbike(Motorbike.parse(moto));
    }
  }, [moto, setMotorbike]);

  const updateMotorbike = (property, value) => {
    if (Object.keys(motorbike).includes(property)) {
      const updatedMotorbike = { ...motorbike };
      updatedMotorbike[property] = value;
      setMotorbike(Motorbike.parse(updatedMotorbike));
    } else {
      console.log(String('Property not found: ').concat(property));
    }
  };

  useEffect(() => {
    const SERVICE = new MotorbikeService();
    SERVICE.getBrands().then((array) => {
      setBrands(array);
    }).catch((exception) => {
      console.error(exception);
    });
    SERVICE.getMotorbikesTypes().then((array) => {
      setTypes(array);
    }).catch((exception) => {
      console.error(exception);
    });
  }, [setBrands]);

  const updateBikerMotorbike = () => {
    const SERVICE = new BikerService();
    if (biker && motorbike) {
      biker.motorbikes.push(motorbike);
      SERVICE.update(biker.identifier, biker).then((updatedBiker) => {
        setBikerInStore({
          entity: updatedBiker,
        });
        setToastInStore({
          severity: 'success',
          summary: 'Biker Motorcycles Updated',
          detail: 'You are now connected.',
        });
        resetToastInStore();
        onHide();
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Biker Motorcycles Update Failure',
          detail: exception.error,
        });
        resetToastInStore();
      });
    }
  };

  const createHandle = () => {
    const SERVICE = new MotorbikeService();
    if (motorbike.identifier <= 0) {
      SERVICE.create(motorbike).then((updatedEntity) => {
        setMotorbike(updatedEntity);
        updateBikerMotorbike();
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Address Creation Failure',
          detail: exception.error,
        });
        resetToastInStore();
      });
    } else {
      SERVICE.update(motorbike.identifier, motorbike).then((updatedEntity) => {
        setMotorbike(updatedEntity);
        updateBikerMotorbike();
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Address Update Failure',
          detail: exception.error,
        });
        resetToastInStore();
      });
    }
  };

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
                      value={motorbike.brand}
                      options={brands}
                      onChange={(e) => updateMotorbike('brand', e.value)}
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
                      value={motorbike.model}
                      options={[]}
                      onChange={(event) => updateMotorbike('model', event.value)}
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
                      value={motorbike.engineDisplacement}
                      onValueChange={(e) => updateMotorbike('engineDisplacement', e.value)}
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
                      value={motorbike.year}
                      onValueChange={(e) => updateMotorbike('year', e.value)}
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
                      value={motorbike.type}
                      options={types}
                      onChange={(e) => updateMotorbike('type', e.value)}
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
                      value={motorbike.color}
                      onChange={(e) => updateMotorbike('color', e.value)}
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
                      value={motorbike.fuelTankSize}
                      onValueChange={(e) => updateMotorbike('fuelTankSize', e.value)}
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
                      value={motorbike.mileage}
                      onValueChange={(e) => updateMotorbike('mileage', e.value)}
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
                      value={motorbike.licensePlate}
                      required
                      onChange={(e) => updateMotorbike('licensePlate', e.value)}
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
                      checked={motorbike.isRestrained}
                      onChange={(e) => updateMotorbike('isRestrained', e.value)}
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
          <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={() => onHide()} />
          <Button label="Next" icon="pi pi-angle-right" className="p-button-primary" onClick={() => setActiveIndex(activeIndex + 1)} />
        </div>
      );
    }
    if (activeIndex === interactiveItems.length - 1) {
      return (
        <div>
          <Button label="Previous" icon="pi pi-angle-left" className="p-button-secondary" onClick={() => setActiveIndex(activeIndex - 1)} />
          <Button label="Create" icon="pi pi-plus" className="p-button-primary" onClick={() => createHandle()} />
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
      <Dialog header="Register a new motorbike" visible style={{ width: '50vw' }} onHide={onHide} footer={footer}>
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
  setBikerInStore: (data) => dispatch(setBiker(data)),
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(MotorbikeForm));
