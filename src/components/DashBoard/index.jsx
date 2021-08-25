/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import './style.css';
import { Button } from 'primereact/button';

function DashBoard({
  organizedRoadTrips,
  upcomingRoadTrips,
  pendingRoadTripsRequests,
  oldRoadTrips,
}) {

  const footerTemplate = (list, label, path, defaultLabel, defaultPath) => {
    if (!list || list.length === 0) {
      return (
        <Link to={defaultPath}>
          <Button label={defaultLabel} />
        </Link>
      );
    }
    return (
      <Link to={path}>
        <Button label={label} />
      </Link>
    );
  };

  return (
    <section className="Component Component-DashBoard">
      {
        organizedRoadTrips ? (
          <Card
            title="Your Organized Road Trips"
            className="DashBoard-Item"
            footer={footerTemplate(organizedRoadTrips, 'Manage', '/tbd', 'Organize', '/organize')}
          >
            {(organizedRoadTrips.length === 0) ? (
              <>
                You have not organized any road trip.
              </>
            ) : (
              <h4>{organizedRoadTrips.length}</h4>
            )}
          </Card>
        ) : (null)
      }
      <Divider />
      {
        upcomingRoadTrips ? (
          <Card
            title="Your Upcoming Road Trips"
            className="DashBoard-Item"
            footer={footerTemplate(upcomingRoadTrips, 'Manage', '/tbd', 'Search', '/join')}
          >
            {(upcomingRoadTrips.length === 0) ? (
              <>
                You are not yet registered for any road trip.
              </>
            ) : (
              <h4>{upcomingRoadTrips.length}</h4>
            )}
          </Card>
        ) : (null)
      }
      {
        pendingRoadTripsRequests ? (
          <Card
            title="Your Pending Requests (Road Trips)"
            className="DashBoard-Item"
            footer={footerTemplate(pendingRoadTripsRequests, 'Manage', '/tbd', 'Manage', '/join')}
          >
            {(pendingRoadTripsRequests.length === 0) ? (
              <>
                You have not requests for any road trips.
              </>
            ) : (
              <h4>{pendingRoadTripsRequests.length}</h4>
            )}
          </Card>
        ) : (null)
      }
      <Divider />
      {
        oldRoadTrips ? (
          <Card
            title="Your Old Road Trips"
            className="DashBoard-Item"
            footer={footerTemplate(oldRoadTrips, 'View', '/join', 'View', '/join')}
          >
            {(oldRoadTrips.length === 0) ? (
              <>
                You have not yet accomplished any road trip.
              </>
            ) : (
              <h4>{oldRoadTrips.length}</h4>
            )}
          </Card>
        ) : (null)
      }
    </section>
  );
}

export default withRouter(DashBoard);
