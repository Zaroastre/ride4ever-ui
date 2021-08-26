import React from 'react';
/* eslint-disable react/prop-types */
import { withRouter } from 'react-router';
// import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { InputTextarea } from 'primereact/inputtextarea';
import './style.css';

function HealthPanel({
  biker,
}) {
  return (
    <section className="Component Component-HealthPanel">
      <table>
        <tr>
          <th>Birth Date (age)</th>
          <td>{new Date(biker.birthDate).toLocaleDateString()}</td>
        </tr>
        <tr>
          <th>Gender</th>
          <td>{biker.gender}</td>
        </tr>
        <tr>
          <th>Blood</th>
          <td>{biker.blood}</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>{biker.weight}</td>
        </tr>
        <tr>
          <th>Allergies</th>
          <td>
            <InputTextarea
              rows={2}
              value={biker.allergies}
              placeholder="Type your allergies..."
              onChange={(event) => console.log(event.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Had Have Operations</th>
          <td>
            <InputSwitch
              checked={biker.hadHaveOperations}
              onChange={(e) => console.log(e.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Is Organ Donor</th>
          <td>
            <InputSwitch
              checked={biker.isOrganDonor}
              onChange={(e) => console.log(e.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Is Trained for First Rescue</th>
          <td>
            <InputSwitch
              checked={biker.isTrainedForFirstRescue}
              onChange={(e) => console.log(e.value)}
            />
          </td>
        </tr>
      </table>
    </section>
  );
}

export default withRouter(HealthPanel);
