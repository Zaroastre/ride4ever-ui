/* eslint-disable react/prop-types */
import React, {
    useEffect,
    useState,
  } from 'react';
  import { Redirect, useHistory, withRouter } from 'react-router';
  import { useSelector, connect } from 'react-redux';
  import { setToast, resetToast } from '../store/toast/toastAction';
  import { setReservations } from '../store/reservation/reservationAction';
  import ReservationService from '../services/reservationService';
import RoadtripService from '../services/roadtripService';
import RoadTripAdminTable from '../components/RoadTripAdminTable';
  
  function RoadTripAdminPage({
    setToastInStore,
    resetToastInStore,
    setReservationsInStore,
  }) {
    const biker = useSelector((state) => state.biker.people);
    const history = useHistory();
    const [reservations, setReservations] = useState([]);
    const [roadTrips, setRoadTrips] = useState([]);
  
    useEffect(() => {
      if (biker) {
        const ROADTRIP_SERVICE = new RoadtripService();
        const RESERVATION_SERVICE = new ReservationService();


        RESERVATION_SERVICE.findReservations({ biker_organizer_pseudo: biker.pseudo }).then((list) => {
            setReservations(list);
            ROADTRIP_SERVICE.findRoadtrips({ organizer_pseudo: biker.pseudo }).then((list) => {
                setRoadTrips(list);
            }).catch((exception) => {
              setToastInStore({
                severity: 'error',
                summary: 'Data Provisionning Failure',
                detail: exception,
              });
              resetToastInStore();
            });
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Data Provisionning Failure',
            detail: exception,
          });
          resetToastInStore();
        });
      } else {
        history.push('/login');
      }
    }, [setReservationsInStore, history, biker, resetToastInStore, setToastInStore]);
  
    const render = () => {
      if (biker && biker) {
        return (
          <section className="Page Page-Reservation">
            <RoadTripAdminTable roadtrips={roadTrips} reservations={reservations} />
          </section>
        );
      }
      return (
        <Redirect to="/login" />
      );
    };
  
    return render();
  }
  
  const mapDispatchToProps = (dispatch) => ({
    setToastInStore: (data) => dispatch(setToast(data)),
    resetToastInStore: () => dispatch(resetToast()),
    setReservationsInStore: (list) => dispatch(setReservations(list)),
  });
  
  export default withRouter(connect(null, mapDispatchToProps)(RoadTripAdminPage));
  