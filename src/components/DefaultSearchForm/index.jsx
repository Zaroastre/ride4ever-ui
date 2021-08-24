/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
} from 'react';
import { withRouter } from 'react-router';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import './style.css';

function DefaultSearchForm() {
  const [zipCode, setZipCode] = useState(null);
  return (
    <section className="Component Component-DefaultSearchForm">
      <form>
        <dl className="p-field">
          <div>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <span className="p-float-label p-input-icon-right">
                <InputText
                  id="zipCode"
                  value={zipCode}
                  minLength={5}
                  maxLength={8}
                  onChange={(e) => setZipCode(e.target.value)}
                  required
                />
                <label htmlFor="zipCode">Zip Code</label>
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
                  id="roadTripType"
                  value={zipCode}
                  options={[]}
                  onChange={(e) => setZipCode(e.target.value)}
                  filter
                  showClear
                />
                <label htmlFor="roadTripType">State</label>
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
                  id="roadTripType"
                  value={zipCode}
                  options={[]}
                  onChange={(e) => setZipCode(e.target.value)}
                  filter
                  showClear
                />
                <label htmlFor="roadTripType">Country</label>
              </span>
            </div>
          </div>
        </dl>
      </form>
    </section>
  );
}

export default withRouter(DefaultSearchForm);
