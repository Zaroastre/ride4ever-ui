/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import DICTIONARY from '../../locales/dictionary';

import './style.css';
import { Button } from 'primereact/button';

function DashBoard({
  organizedRoadTrips,
  upcomingRoadTrips,
  pendingRoadTripsRequests,
  oldRoadTrips,
}) {

  const language = useSelector((state) => state.language.value);

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
            title={DICTIONARY.PAGE.DASHBOARD.ORGANIZED_ROADTRIPS.TITLE[language]}
            className="DashBoard-Item"
            footer={footerTemplate(
              organizedRoadTrips,
              DICTIONARY.PAGE.DASHBOARD.ORGANIZED_ROADTRIPS.BUTTON.OPTION_1[language],
              '/tbd',
              DICTIONARY.PAGE.DASHBOARD.ORGANIZED_ROADTRIPS.BUTTON.OPTION_2[language],
              '/organize',
            )}
          >
            {(organizedRoadTrips.length === 0) ? (
              <>
                {DICTIONARY.PAGE.DASHBOARD.ORGANIZED_ROADTRIPS.BODY[language]}
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
          title={DICTIONARY.PAGE.DASHBOARD.UPCOMING_ROADTRIPS.TITLE[language]}
            className="DashBoard-Item"
            footer={footerTemplate(
              upcomingRoadTrips,
              DICTIONARY.PAGE.DASHBOARD.UPCOMING_ROADTRIPS.BUTTON.OPTION_1[language],
              '/tbd',
              DICTIONARY.PAGE.DASHBOARD.UPCOMING_ROADTRIPS.BUTTON.OPTION_2[language],
              '/join'
            )}
          >
            {(upcomingRoadTrips.length === 0) ? (
              <>
              {DICTIONARY.PAGE.DASHBOARD.UPCOMING_ROADTRIPS.BODY[language]}
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
          title={DICTIONARY.PAGE.DASHBOARD.PENDING_REQUESTS.TITLE[language]}
            className="DashBoard-Item"
            footer={footerTemplate(
              pendingRoadTripsRequests,
              DICTIONARY.PAGE.DASHBOARD.PENDING_REQUESTS.BUTTON.OPTION_1[language],
              '/tbd',
              DICTIONARY.PAGE.DASHBOARD.PENDING_REQUESTS.BUTTON.OPTION_2[language],
              '/join'
            )}
          >
            {(pendingRoadTripsRequests.length === 0) ? (
              <>
              {DICTIONARY.PAGE.DASHBOARD.PENDING_REQUESTS.BODY[language]}
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
          title={DICTIONARY.PAGE.DASHBOARD.OLD_ROADTRIPS.TITLE[language]}
            className="DashBoard-Item"
            footer={footerTemplate(
              oldRoadTrips,
              DICTIONARY.PAGE.DASHBOARD.OLD_ROADTRIPS.BUTTON.OPTION_1[language],
              '/join',
              DICTIONARY.PAGE.DASHBOARD.OLD_ROADTRIPS.BUTTON.OPTION_2[language],
              '/join'
            )}
          >
            {(oldRoadTrips.length === 0) ? (
              <>
              {DICTIONARY.PAGE.DASHBOARD.OLD_ROADTRIPS.BODY[language]}
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
