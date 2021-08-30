/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
} from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';

import Reservation from '../../entities/reservation';
import { setToast, resetToast } from '../../store/toast/toastAction';
import { setReservations } from '../../store/reservation/reservationAction';

import './style.css';
import { Link } from 'react-router-dom';
import ReservationService from '../../services/reservationService';
import RoadtripService from '../../services/roadtripService';

function RoadTripList({
  biker,
  roadtrips,
  reservations,
  setReservationsInStore,
  setToastInStore,
  resetToastInStore,
  enableReservation=false,
}) {
  const [myRoadTrips, setMyRoadTrips] = useState([]);
  const [updatedRoadTrips, setUpdatedRoadTrips] = useState([...roadtrips]);

  useEffect(() => {
    let data = [...roadtrips];
    for (let roadTripIndex = 0; roadTripIndex < data.length; roadTripIndex += 1) {
      for (let reservationIndex = 0; reservationIndex < reservations.length; reservationIndex += 1) {
        if (reservations[reservationIndex].roadTrip === data[roadTripIndex].identifier) {
          data[roadTripIndex].reservation = reservations[reservationIndex]; 
        } else {
          data[roadTripIndex].reservation = null;
        }
      }
    }
    setUpdatedRoadTrips(data);
  }, [reservations, roadtrips, setUpdatedRoadTrips]);


  const roadTripTypeTemplate = (roadtrip) => {
    if (roadtrip) {
      return (
        <Tag value={roadtrip.roadTripType} />
      );
    }
    return (null);
  };

  const formatDate = (date) => date.toLocaleString().toString().substring(0, 17);

  const detailsTemplate = (roadtrip) => {
    if (roadtrip) {
      return (
        <Link to={String('/roadtrips/').concat(roadtrip.identifier)}>
          <Button icon="pi pi-eye" className="p-button-secondary" />
        </Link>
      );
    }
    return (null);
  };

  const updateMyRoadTrips = (roadtrip, isCandidate) => {
    const myList = [...myRoadTrips];
    if (isCandidate) {
      const reservation = new Reservation();
      reservation.biker = biker.identifier;
      reservation.date = new Date();
      reservation.roadTrip = roadtrip.identifier;
      reservation.status = 'CREATED';

      const RESERVATION_SERVICE = new ReservationService();
      RESERVATION_SERVICE.create(reservation).then((r1) => {
        const list = [...reservations];
        list.push(r1);
        setReservations(list);

      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Reservation Failure',
          detail: exception,
        });
        resetToastInStore();
      });

    } else {
      const index = myRoadTrips.findIndex((trip) => trip.identifier === roadtrip.identifier);
      if (index >= 0) {
        myList.splice(index, 1);
      }
      if (roadtrip.reservation) {
        const RESERVATION_SERVICE = new ReservationService();
        RESERVATION_SERVICE.delete(roadtrip.reservation).then((r1) => {
          console.log(r1);
        }).catch((exception) => {
          setToastInStore({
            severity: 'error',
            summary: 'Reservation Failure',
            detail: exception,
          });
          resetToastInStore();
        });
      }
    }
    setMyRoadTrips(myList);
  };

  const joinTemplate = (roadtrip) => {
    console.log(roadtrip);
    if (roadtrip) {
      return (
        <InputSwitch checked={roadtrip.reservation} onChange={(e) => updateMyRoadTrips(roadtrip, e.value)} />
      );
    }
    return (null);
  };

  const maxBikersTemplate = (roadtrip) => {
    if (roadtrip) {
      let classNameCandidates = '';
      let classNameBikers = '';
      if (((roadtrip.candidates.length * 100) / roadtrip.maxBikers) < 80) {
        classNameCandidates = 'alert-level-ras';
      } else if (((roadtrip.candidates.length * 100) / roadtrip.maxBikers) < 100) {
        classNameCandidates = 'alert-level-limit';
      } else {
        classNameCandidates = 'alert-level-full';
      }

      if (((roadtrip.bikers.length * 100) / roadtrip.maxBikers) < 80) {
        classNameBikers = 'alert-level-ras';
      } else if (((roadtrip.bikers.length * 100) / roadtrip.maxBikers) < 100) {
        classNameBikers = 'alert-level-limit';
      } else {
        classNameBikers = 'alert-level-full';
      }

      return (
        <>
          <p className={classNameCandidates}>
            {String('Candidates: ').concat(roadtrip.candidates.length).concat('/').concat(roadtrip.maxBikers)}
          </p>
          <p className={classNameBikers}>
            {String('Bikers: ').concat(roadtrip.bikers.length).concat('/').concat(roadtrip.maxBikers)}
          </p>
        </>
      );
    }
    return (null);
  };

  const startDateTemplate = (roadtrip) => formatDate(roadtrip.startDate);

  const stopDateTemplate = (roadtrip) => formatDate(roadtrip.endDate);

  const startCityTemplate = (roadtrip) => String(roadtrip.startAddress.city)
    .concat(' (')
    .concat(roadtrip.startAddress.zipCode)
    .concat(')');

  const stopCityTemplate = (roadtrip) => String(roadtrip.stopAddress.city)
    .concat(' (')
    .concat(roadtrip.stopAddress.zipCode)
    .concat(')');

  const statusTemplate = (roadtrip) => (
    <Tag className={String('Tag-').concat(roadtrip.status)} value={roadtrip.status} />
  );

  return (
    <div className="Component Component-RoadTripList">
      <div className="card">
        <DataTable
          value={updatedRoadTrips}
          paginator
          rows={10}
          className="p-datatable-customers"
          emptyMessage="No road trips found."
          removableSort
          selectionMode="single"
        >
          <Column field="startDate" header="Start Date" body={startDateTemplate} sortable />
          <Column field="endDate" header="End Date" body={stopDateTemplate} sortable />
          <Column field="startAddress.city" header="Start City" body={startCityTemplate} sortable />
          <Column field="stopAddress.city" header="Stop City" body={stopCityTemplate} sortable />
          <Column field="KilometersAverage" header="Distance" sortable />
          <Column field="status" header="Status" body={statusTemplate} sortable />
          <Column field="maxBikers" header="Max Bikers" body={maxBikersTemplate} sortable />
          <Column field="roadTripType" header="Type" body={roadTripTypeTemplate} sortable />
          <Column header="Details" body={detailsTemplate} />
          {(enableReservation) ? (
            <Column header="Reservation" body={joinTemplate} />
          ) : (null)
          }

        </DataTable>
        {(enableReservation) ? (
          <Button label="Confirm reservations" icon="pi pi-lock" className="p-button-primary" />
        ) : (null)
        }
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setToastInStore: (data) => dispatch(setToast(data)),
  resetToastInStore: () => dispatch(resetToast()),
  setReservationsInStore: (list) => dispatch(setReservations(list)),
});

export default withRouter(connect(null, mapDispatchToProps)(RoadTripList));
