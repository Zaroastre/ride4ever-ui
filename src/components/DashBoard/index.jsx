/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import './style.css';

function DashBoard() {
  return (
    <section className="Component Component-DashBoard">
      <Card title="Created Road Trips">
        You are not planned any road trip.
      </Card>
      <Divider />
      <Card title="Your Next Road Trips">
        You are not yet registered on any road trip.
      </Card>
      <Divider />
      <Card title="Your Previous Road Trips">
        You have not yet accomplished any road trip.
      </Card>
    </section>
  );
}

export default withRouter(DashBoard);
