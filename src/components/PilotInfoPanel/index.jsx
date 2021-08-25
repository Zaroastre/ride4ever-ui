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

import './style.css';

function PilotInfoPanel({
  biker,
}) {
  console.log(biker);
  return (
    <section className="Component Component-PilotInfoPanel">
      <Card
        title={
          String(biker.firstName)
            .concat(' ')
            .concat(biker.lastName.toUpperCase())
            .concat(' (')
            .concat(biker.pseudo)
            .concat(')')
        }
        subTitle={biker.biography}
      >
        <div className="BikerPictureContainer">
          <div className="BikerPictureContainer">
            <div>Image</div>
          </div>
        </div>
        <div className="BikerBadges">
          {!biker.isTrainedForFirstRescue ? (<Tag value="Is Trained For First Rescue"><HeartFill /></Tag>) : (null)}
          {!biker.canRepairMotorbike ? (<Tag value="Can Repair Motorbike"><Tools /></Tag>) : (null)}
        </div>
        <div>
          <p>
            <GeoAltFill />
            {
              biker.address ? (
                String(biker.address.number)
                  .concat(' ')
                  .concat(biker.address.street)
                  .concat(' ')
                  .concat(biker.address.zipCode)
                  .concat(' ')
                  .concat(biker.address.city)
                  .concat(', ')
                  .concat(biker.address.country.toUpperCase())
              ) : (
                null
              )
            }
          </p>
          <p>
            Level
            {biker.level}
          </p>
          <p>{biker.birthDate}</p>
          <p>
            <PhoneFill />
            {biker.phoneNumber}
          </p>
          <p>
            <EnvelopeFill />
            {biker.email}
          </p>
          <p>{String('Member since ').concat(biker.registrationDate)}</p>
          <p>{String('Works as ').concat(biker.work)}</p>
        </div>
      </Card>
    </section>
  );
}

export default withRouter(PilotInfoPanel);
