import React, {
  useState,
} from 'react';
/* eslint-disable react/prop-types */
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import ReservationService from '../../services/reservationService';
import { setToast, resetToast } from '../../store/toast/toastAction';
import { setReservations } from '../../store/reservation/reservationAction';
import './style.css';

function ReservationTable({
  biker,
  loading,
  reservations,
  setToastInStore,
  resetToastInStore,
  setReservationsInStore,
}) {
  const [isLoading, setIsLoading] = useState(loading);

  const cancelReservationHandle = (event, reservation) => {
    event.preventDefault();
    confirmDialog({
      message: 'Are you sure you want to cancel this reservation ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => cancelReservation(reservation),
    });
  }

  const cancelReservation = (reservation) => {
    setIsLoading(true);
    const SERVICE = new ReservationService();
    SERVICE.delete(reservation).then(() => {
      setToastInStore({
        severity: 'success',
        summary: 'Reservation Canceled',
        detail: 'Reservation si successfully canceled.',
      });
      resetToastInStore();
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Cancel Failure',
        detail: exception,
      });
      resetToastInStore();
    }).finally(() => {
      SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
        setReservationsInStore(list);
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Cancel Failure',
          detail: exception,
        });
        resetToastInStore();
        setReservationsInStore()
      }).finally(() => {
        setIsLoading(false);
      });
    });
  }
  const dateTemplate = (reservation) => reservation.date.toLocaleString();
  const statusTemplate = (reservation) => {
    let severity = 'info';
    switch (reservation.status) {
      case 'PENDING':
        severity='warning';
        break;
        case 'ACCEPTED':
          severity='success';
          break;
          case 'DENIED':
            severity='danger';
            break;
  
      default:
        break;
    }
    return (<Tag className={String('Tag-Event-').concat(reservation.status)} value={reservation.status} severity={severity} />);
  }
  const cancelTemplate = (reservation) => <Button label="Cancel" onClick={(event) => cancelReservationHandle(event, reservation)} className="p-button p-button-danger" icon="pi pi-trash" />
  return (
    <div className="Component Component-ReservationTable">
      <div className="card">
        <DataTable
          value={reservations}
          paginator
          rows={100}
          className="p-datatable-sm"
          emptyMessage="No reservations found."
          removableSort
          selectionMode="single"
          sortField="date"
          sortOrder={-1}
          loading={isLoading}
        >
          <Column field="identifier" header="Reference" />
          <Column field="date" body={dateTemplate} header="Date" sortable />
          <Column field="status" body={statusTemplate} header="Status" />
          <Column field="status" body={cancelTemplate} header="Cancel" />
        </DataTable>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
  setReservationsInStore: (list) => dispatch(setReservations(list)),
});

export default withRouter(connect(null, mapDispatchToProps)(ReservationTable));
