/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputSwitch } from 'primereact/inputswitch';
import { Tag } from 'primereact/tag';

import './style.css';

function GarageInfoPanel({
  motorbikes,
}) {
  return (
    <section className="Component Component-GarageInfoPanel">
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
              <div className="">
                <Button label="Edit" className="p-button-primary" />
                <Button label="Remove" className="p-button-danger" />
              </div>
            )}
          >
            <Divider />
            <table>
              <tr>
                <th>
                  Engine Displacement
                </th>
                <td>
                  <p>{String(motorbike.engineDisplacement).concat(' cm3')}</p>
                </td>
              </tr>
              <tr>
                <th>
                  Type
                </th>
                <td>
                  <Tag value={motorbike.type} />
                </td>
              </tr>
              <tr>
                <th>
                  Year
                </th>
                <td>
                  <p>{motorbike.year}</p>
                </td>
              </tr>
              <tr>
                <th>
                  Color
                </th>
                <td>
                  <p>{motorbike.color}</p>
                </td>
              </tr>
              <tr>
                <th>
                  Fuel Tank Size
                </th>
                <td>
                  <p>{String(motorbike.fuelTankSize).concat(' liters')}</p>
                </td>
              </tr>
              <tr>
                <th>
                  Mileage
                </th>
                <td>
                  <p>{String(motorbike.mileage).concat(' kms')}</p>
                </td>
              </tr>
              <tr>
                <th>
                  Is Restrained
                </th>
                <td>
                  <InputSwitch
                    checked={motorbike.isRestrained}
                    onChange={(e) => console.log(e.value)}
                  />
                </td>
              </tr>
            </table>
            <Divider />
          </Card>
        </div>
      ))}
    </section>
  );
}

export default withRouter(GarageInfoPanel);
