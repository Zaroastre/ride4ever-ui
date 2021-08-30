import React from 'react';
/* eslint-disable react/prop-types */
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import ReservationService from '../../services/reservationService';
import { setToast, resetToast } from '../../store/toast/toastAction';
import { setReservations } from '../../store/reservation/reservationAction';
import './style.css';

function ReservationTable({
  biker,
  reservations,
  setToastInStore,
  resetToastInStore,
  setReservationsInStore,
}) {
  const cancel = (reservation) => {
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
    });
  });
}
  const dateTemplate = (reservation) => reservation.date.toLocaleString();
  const statusTemplate = (reservation) => <Tag className={String('Tag-Event-').concat(reservation.status)} value={reservation.status} />;
  const cancelTemplate = (reservation) => <Button label="Cancel" onClick={() => cancel(reservation)} className="p-button p-button-danger" icon="pi pi-times" />
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
        >
          <Column field="identifier" header="Reference" />
          <Column field="date" body={dateTemplate} header="Date" sortable />
          <Column field="status" body={statusTemplate} header="Status" />
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
