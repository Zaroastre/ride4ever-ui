/* eslint-disable react/prop-types */
import React, {
  useState,
  useEffect,
} from 'react';
import { useSelector, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import DashBoard from '../components/DashBoard';
import RoadtripService from '../services/roadtripService';
import ReservationService from '../services/reservationService';
import { setToast, resetToast } from '../store/toast/toastAction';

function DashboardPage({
  setToastInStore,
  resetToastInStore,
}) {
  const history = useHistory();
  const biker = useSelector((state) => state.biker.people);
  const [organizedRoadTrips, setOrganizedRoadTrips] = useState([]);
  const [upcomingRoadTrips, setUpcomingRoadTrips] = useState([]);
  const [pendingRoadTripsRequests, setPendingRoadTripsRequests] = useState([]);
  const [oldRoadTrips, setOldRoadTrips] = useState([]);

  useEffect(() => {
    if (biker) {
      const ROADTRIP_SERVICE = new RoadtripService();
      const RESERVATION_SERVICE = new ReservationService();

      ROADTRIP_SERVICE.findRoadtrips({ organizer_pseudo: biker.pseudo })
        .then((roadTrips) => {
          setOrganizedRoadTrips(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Roadtrips Provisioning Failure',
            detail: exception,
          });
          resetToastInStore();
        });
        RESERVATION_SERVICE.findReservations({ biker_pseudo: biker.pseudo, status: 'ACCEPTED' })
        .then((reservations) => {
          const roadTrips = reservations.filter((reservation) => reservation.roadTrip.status === 'SOON').map((reservation) => reservation.roadTrip);
          setUpcomingRoadTrips(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Reservations Provisioning Failure',
            detail: exception,
          });
          resetToastInStore();
        });
        RESERVATION_SERVICE.findReservations({ biker_pseudo: biker.pseudo, status: 'PENDING' })
        .then((reservations) => {
          setPendingRoadTripsRequests(reservations);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Reservation  Provisioning Failure',
            detail: exception,
          });
          resetToastInStore();
        });
        ROADTRIP_SERVICE.findRoadtrips({ biker_pseudo: biker.pseudo, status: 'TERMINATED' })
        .then((roadTrips) => {
          setOldRoadTrips(roadTrips);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Roadtrips Provisioning Failure Failure',
            detail: exception,
          });
          resetToastInStore();
        });
    } else {
      history.push('/login');
    }
  }, [
    setOrganizedRoadTrips,
    setUpcomingRoadTrips,
    setPendingRoadTripsRequests,
    setOldRoadTrips,
    setToastInStore,
    resetToastInStore,
    biker,
    history,
  ]);

  return (
    <section className="Page Page-Login">
      <h1>DashBoard</h1>
      <DashBoard
        organizedRoadTrips={organizedRoadTrips}
        upcomingRoadTrips={upcomingRoadTrips}
        pendingRoadTripsRequests={pendingRoadTripsRequests}
        oldRoadTrips={oldRoadTrips}
      />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
});

export default withRouter(connect(null, mapDispatchToProps)(DashboardPage));
