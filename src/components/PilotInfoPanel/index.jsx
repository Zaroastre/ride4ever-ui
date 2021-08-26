/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import {
  HeartFill,
  Tools,
  GeoAltFill,
  PhoneFill,
  EnvelopeFill,
} from 'react-bootstrap-icons';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';

import './style.css';

function PilotInfoPanel({
  biker,
}) {
  return (
    <section className="Component Component-PilotInfoPanel">
      <Card>
        <div className="CardHeader">
          <span>
            <div className="BikerPictureContainer">
              <div className="BikerPictureContainer">
                <img src={String('/assets/images/icons/').concat(biker.gender).concat('.svg')} alt="" />
              </div>
            </div>
          </span>
          <span>
            <h2>{String(biker.lastName.toUpperCase()).concat(' ').concat(biker.firstName)}</h2>
            <h4>{biker.pseudo}</h4>
            <div>
              <PhoneFill />
              {biker.phoneNumber}
            </div>
            <div>
              <EnvelopeFill />
              {biker.email}
            </div>
          </span>
        </div>
        <Divider />
        <InputTextarea
          rows={5}
          value={biker.biography}
          placeholder="Type your short biography..."
          onChange={(event) => console.log(event.target.value)}
        />
        <div className="BikerBadges">
          {!biker.canRepairMotorbike ? (<Tag value="Can Repair Motorbike"><Tools /></Tag>) : (null)}
        </div>
        <div>
          <p>
            Level
            {biker.level}
          </p>
          <p>{String('Member since ').concat(biker.registrationDate.toLocaleString())}</p>
          <p>{String('Works as ').concat(biker.work)}</p>
        </div>
      </Card>
    </section>
  );
}

export default withRouter(PilotInfoPanel);
