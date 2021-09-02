/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import RoadtripService from '../services/roadtripService';

function RoadTripPage({ match }) {
  const {
    params: { roadtripIdentifier },
  } = match;
  const history = useHistory();
  const [roadtrip, setRoadTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const SERVICE = new RoadtripService();
    SERVICE.findById(roadtripIdentifier).then((data) => {
      if (data) {
        setRoadTrip(data);
      } else {
        history.goBack();
      }
    }).catch((exception) => {
      console.log(exception);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [roadtripIdentifier, history]);

  return (
    <section className="Page Page-RoadTrip">
      <h1>Road Trip</h1>
      {
        !isLoading ? (
          <>
            Road Trip #
            {roadtrip.identifier}
          </>
        ) : (
          null
        )
      }
    </section>
  );
}

export default withRouter(RoadTripPage);
