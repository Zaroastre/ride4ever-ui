import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';

function HomePage() {
  return (
    <section className="Page Page-Home">
      <h1>Road Trips</h1>
      <div className="PillsChoices">
        <span className="PillChoice">
          <Card
            title="Take the Blue Pill"
            subTitle="Search and join a existing road trip arround your location."
          >
            <Link to="/search">
              <Button label="Search a Road Trip" className="p-button-primary" icon="pi pi-arrow-right" iconPos="right" />
            </Link>
          </Card>
        </span>
        <span className="PillChoice">
          <Card
            title="Take the Red Pill"
            subTitle="Create your ideal road trip."
          >
            <Link to="/organize">
              <Button label="Create the Road Trip" className="p-button-danger" icon="pi pi-arrow-right" iconPos="right" />
            </Link>
          </Card>
        </span>
      </div>
    </section>
  );
}

export default withRouter(HomePage);
