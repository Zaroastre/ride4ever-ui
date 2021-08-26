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
  }, [roadtripIdentifier]);

  return (
    <section className="Page Page-RoadTrip">
      Road Trip
    </section>
  );
}

export default withRouter(RoadTripPage);