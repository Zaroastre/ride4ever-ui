import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import DefaultSearchForm from '../components/DefaultSearchForm';
import RoadTripList from '../components/RoadTripList';
import RoadtripService from '../services/roadtripService';

function JoinPage() {
  const [roadtrips, setRoadTrips] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const SERVICE = new RoadtripService();
    SERVICE.findRoadtrips().then((array) => {
      setRoadTrips(array);
    }).catch((exception) => {
      console.log(exception);
    });
  }, [setRoadTrips]);

  const onSearchHandle = (searchQuery) => {
    setRoadTrips([]);
    console.log(search);
    console.log(searchQuery);
  };

  return (
    <section className="Page Page-JoinPage">
      {/* <h1>Search and Join a road trip</h1> */}
      {/* <DefaultSearchForm setSearch={setSearch} onSearch={onSearchHandle} /> */}
      <RoadTripList roadtrips={roadtrips} />
    </section>
  );
}

export default withRouter(JoinPage);
