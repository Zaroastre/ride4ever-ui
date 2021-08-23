/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import RoadtripService from '../services/roadtripService';
import RoadTrip from '../entities/roadtrip';

function OrganizePage() {
  const history = useHistory();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [maximumBikers, setMaximumBikers] = useState(0);
  const [roadtripType, setRoadtripType] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const [startPlace, setStartPlace] = useState(null);
  const [endPlace, setEndPlace] = useState(null);
  // const [places, setPlaces] = useState([]);
  // const [kilometersAverage, setKilometersAverage] = useState(0);

  const [roadtripsTypes, setRoadtripsTypes] = useState([]);

  useEffect(() => {
    const SERVICE = new RoadtripService();
    SERVICE.getRoadtripsTypes().then((list) => {
      console.log(list);
      setRoadtripsTypes(list);
    });
  }, []);

  const onStartDateChangeHandle = (value) => {
    setStartDate(value);
    setEndDate(value);
  };

  const onStartPlaceChangeHandle = (value) => {
    setStartPlace(value);
    setEndPlace(value);
  };

  const cancel = () => {
    history.push('/explore');
  };

  const accept = () => {
    const ENTITY = new RoadTrip();
    ENTITY.title = title;
    ENTITY.description = description;
    ENTITY.maximumBikers = maximumBikers;
    ENTITY.roadtripType = roadtripType;
    ENTITY.startDate = startDate;
    ENTITY.endDate = endDate;
    ENTITY.startPlace = startPlace;
    ENTITY.endPlace = endPlace;
    ENTITY.places = [];
    const SERVICE = new RoadtripService();
    SERVICE.create(ENTITY).then(() => {
      console.log('ok');
    }).catch((expcetion) => {
      console.error(expcetion);
    });
  };

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure you want to create this roadtrip?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept,
    });
  };

  return (
    <section className="Page Page-OrganizePage">
      <h1>Organize a new road trip</h1>
      <form>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="title"
                  value={title}
                  minLength={5}
                  maxLength={200}
                  onValueChange={(e) => setTitle(e.value)}
                  required
                />
                <label htmlFor="title">Title*</label>
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
                <InputTextarea
                  id="description"
                  value={description}
                  minLength={10}
                  maxLength={1000}
                  onValueChange={(e) => setDescription(e.value)}
                  required
                />
                <label htmlFor="description">Description*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-users" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputNumber
                  id="maximumBikers"
                  value={maximumBikers}
                  onValueChange={(e) => setMaximumBikers(e.value)}
                  min={0}
                  max={999}
                  required
                />
                <label htmlFor="maximumBikers">Maximum Bikers*</label>
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
                  id="roadtripType"
                  value={roadtripType}
                  options={roadtripsTypes}
                  onChange={(e) => setRoadtripType(e.value)}
                  required
                />
                <label htmlFor="roadtripType">Roadtrip Type*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="startPlace"
                  value={startPlace}
                  onValueChange={(e) => onStartPlaceChangeHandle(e.value)}
                  required
                />
                <label htmlFor="startPlace">Start Place (Zip Code)*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="endPlace"
                  value={endPlace}
                  onValueChange={(e) => setEndPlace(e.value)}
                  required
                />
                <label htmlFor="endPlace">End Place (Zip Code)*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-minus" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <Calendar
                  id="startDate"
                  value={startDate}
                  onChange={(e) => onStartDateChangeHandle(e.value)}
                  mask="99/99/9999"
                  dateFormat="dd/mm/yy"
                  showTime
                  required
                  minDate={startDate}
                />
                <label htmlFor="startDate">Start Date*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-calendar-plus" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <Calendar
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.value)}
                  mask="99/99/9999"
                  dateFormat="dd/mm/yy"
                  showTime
                  required
                  minDate={startDate}
                />
                <label htmlFor="endDate">End Date*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl>
          <Button label="Cancel" type="reset" className="p-button-secondary" icon="pi pi-times" onClick={() => cancel()} />
          <Button label="Create" className="p-button-primary" icon="pi pi-check" onClick={() => confirm()} />
        </dl>
      </form>
    </section>
  );
}

export default withRouter(OrganizePage);
