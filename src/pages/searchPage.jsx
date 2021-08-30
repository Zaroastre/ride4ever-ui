import React, {
  useState,
  useEffect,
} from 'react';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import DefaultSearchForm from '../components/DefaultSearchForm';
import RoadTripList from '../components/RoadTripList';
import ReservationService from '../services/reservationService';
import RoadtripService from '../services/roadtripService';

function SearchPage() {
  const history = useHistory();
  const [roadtrips, setRoadTrips] = useState([]);
  const [reservations, setReservations] = useState([]);
  const biker = useSelector((state) => state.biker.people);
  // const [search, setSearch] = useState([]);

  useEffect(() => {
    if (biker) {
      const SERVICE = new RoadtripService();
      SERVICE.findRoadtrips().then((array) => {
        setRoadTrips(array);
        const RESERVATION_SERVICE = new ReservationService();
        RESERVATION_SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
          setReservations(list);
        }).catch((exception) => {
          console.log(exception);
        });
      }).catch((exception) => {
        console.log(exception);
      });
    } else {
      history.push('/login');
    }
  }, [biker, history, setRoadTrips]);

  /* const onSearchHandle = (searchQuery) => {
    setRoadTrips([]);
    console.log(search);
    console.log(searchQuery);
  }; */

  return (
    <section className="Page Page-SearchPage">
      <h1>Search a road trip</h1>
      {/* <DefaultSearchForm setSearch={setSearch} onSearch={onSearchHandle} /> */}
      <RoadTripList biker={biker} roadtrips={roadtrips} reservations={reservations} enableReservation />
    </section>
  );
}

export default withRouter(SearchPage);
