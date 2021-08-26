import React from 'react';
import { withRouter } from 'react-router';
import RoadTripForm from '../components/RoadTripForm';

function OrganizePage() {
  return (
    <section className="Page Page-OrganizePage">
      <h1>Organize a new road trip</h1>
      <RoadTripForm />
    </section>
  );
}

export default withRouter(OrganizePage);
