/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

import './style.css';

function PilotInfoPanel({
  motorbikes,
}) {
  return (
    <section className="Component Component-PilotInfoPanel">
      {motorbikes.map((motorbike) => (
        <div className="Motorbike">
          <Card
            title={
              String(motorbike.brand)
                .concat(' ')
                .concat(motorbike.model)
            }
            subTitle={motorbike.licensePlate}
            footer={(
              <div>
                <Button label="Edit" className="p-button-primary" />
                <Button label="Remove" className="p-button-danger" />
              </div>
            )}
          >
            <p>{String(motorbike.engineDisplacement).concat(' cm3')}</p>
            <Tag value={motorbike.type} />
            <p>{String(' of ').concat(motorbike.year)}</p>
            <p>{motorbike.color}</p>
            <p>{String(motorbike.fuelTankSize).concat(' liters')}</p>
            <p>{String(motorbike.mileage).concat(' kms')}</p>
            <p>{motorbike.isRestrained}</p>
          </Card>
        </div>
      ))}
    </section>
  );
}

export default withRouter(PilotInfoPanel);
