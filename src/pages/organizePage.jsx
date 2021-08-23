import React, {
  useState,
} from 'react';
import { withRouter } from 'react-router';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
// import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';

function OrganizePage() {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [maximumBikers, setMaximumBikers] = useState(0);
  const [roadtripType/* , setRoadtripType */] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startPlace, setStartPlace] = useState(null);
  const [endPlace, setEndPlace] = useState(null);
  // const [places, setPlaces] = useState([]);
  // const [kilometersAverage, setKilometersAverage] = useState(0);

  const confirm = () => {

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
                <InputText
                  id="description"
                  value={description}
                  minLength={10}
                  maxLength={1000}
                  onValueChange={(e) => setDescription(e.value)}
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
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputNumber
                  id="maximumBikers"
                  value={maximumBikers}
                  onValueChange={(e) => setMaximumBikers(e.value)}
                  min={0}
                  max={999}
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
                  options={[]}
                  // onChange={onCountryChange}
                  optionLabel="name"
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
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="startPlace"
                  value={startPlace}
                  onValueChange={(e) => setStartPlace(e.value)}
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
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="endPlace"
                  value={endPlace}
                  onValueChange={(e) => setEndPlace(e.value)}
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
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <Calendar
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.value)}
                  mask="99/99/9999"
                  dateFormat="dd/mm/yy"
                  showTime
                  required
                  minDate={new Date()}
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
                <i className="pi pi-user" />
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
                  minDate={new Date()}
                />
                <label htmlFor="endDate">End Date*</label>
              </span>
            </div>
          </div>
        </dl>
        <dl>
          <Button label="Cancel" onClick={() => confirm()} />
          <Button label="Create road trip" onClick={() => confirm()} />
        </dl>
      </form>
    </section>
  );
}

export default withRouter(OrganizePage);
