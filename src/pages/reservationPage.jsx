/* eslint-disable react/prop-types */
import React, {
  useEffect,
} from 'react';
import { Redirect, useHistory, withRouter } from 'react-router';
import { useSelector, connect } from 'react-redux';
import ReservationTable from '../components/ReservationTable';
import { setToast, resetToast } from '../store/toast/toastAction';
import { setReservations } from '../store/reservation/reservationAction';
import ReservationService from '../services/reservationService';

function ReservationPage({
  setToastInStore,
  resetToastInStore,
  setReservationsInStore,
}) {
  const biker = useSelector((state) => state.biker.people);
  const history = useHistory();
  const reservations = useSelector((state) => state.reservations.list);

  useEffect(() => {
    if (biker) {
      const SERVICE = new ReservationService();
      SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
        setReservationsInStore(list);
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Data Provisionning Failure',
          detail: exception,
        });
        resetToastInStore();
      })
    } else {
      history.push('/login');
    }
  }, [setReservationsInStore, history, biker, resetToastInStore, setToastInStore]);

  const render = () => {
    if (biker && biker) {
      return (
        <section className="Page Page-Reservation">
          <ReservationTable biker={biker} reservations={reservations} />
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
