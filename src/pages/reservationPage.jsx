/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from 'react';
import { Redirect, withRouter } from 'react-router';
import { useSelector, connect } from 'react-redux';
import ReservationTable from '../components/ReservationTable';
import { setToast, resetToast } from '../store/toast/toastAction';
import { setReservations } from '../store/reservation/reservationAction';
import ReservationService from '../services/reservationService';

function ReservationPage() {
  const biker = useSelector((state) => state.biker.people);
  // const reservations = useSelector((state) => state.reservations.entity);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const SERVICE = new ReservationService();
    SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
      setReservations(list);
    }).catch((exception) => {
      console.log(exception);
    })
  }, []);

  const render = () => {
    console.log(reservations);
    if (biker && biker) {
      return (
        <section className="Page Page-Reservation">
          <ReservationTable reservations={reservations} />
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

export default withRouter(connect(null, mapDispatchToProps)(ReservationPage));
