/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
} from 'react';

import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Timeline } from 'primereact/timeline';

import Reservation from '../../entities/reservation';
import { setToast, resetToast } from '../../store/toast/toastAction';
import { setReservations } from '../../store/reservation/reservationAction';

import './style.css';
import { Link } from 'react-router-dom';
import ReservationService from '../../services/reservationService';
import RoadtripService from '../../services/roadtripService';
import RegistrationStatus from '../../enumerations/registrationStatus';

function RoadTripList({
  biker,
  roadtrips,
  reservations,
  setReservationsInStore,
  setToastInStore,
  resetToastInStore,
  enableReservation = false,
}) {
  const reservationsInStore = useSelector((state) => state.reservations.list);
  const [roadTripsList, setRoadTripsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const list = [];
    for (let i = 0; i < roadtrips.length; i++) {
      const roadtrip = { ...roadtrips[i] };
      for (let j = 0; j < reservationsInStore.length; j++) {
        const reservation = { ...reservationsInStore[j] };
        if (reservation.roadTrip.identifier === roadtrip.identifier) {
          roadtrip['reservation'] = reservation;
        }
      }
      list.push(roadtrip);
    }
    setRoadTripsList(list);
    setIsLoading(false);
  }, [roadtrips, reservationsInStore, setRoadTripsList]);


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
          <Button icon="pi pi-eye" className="p-button-secondary" label="More details" />
        </Link>
      );
    }
    return (null);
  };

  const updateMyRoadTrips = (roadtrip) => {
    setIsLoading(true);
    const myList = [...roadTripsList];
    const reservation = new Reservation();
    reservation.biker = biker;
    reservation.date = new Date();
    reservation.roadTrip = roadtrip;
    reservation.status = RegistrationStatus.PENDING;

    const RESERVATION_SERVICE = new ReservationService();
    RESERVATION_SERVICE.create(reservation).then((r1) => {
      const list = [...reservations];
      list.push(r1);
      setReservations(list);
      RESERVATION_SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
        setReservationsInStore(list);
      }).catch((exception) => {
        setToastInStore({
          severity: 'error',
          summary: 'Reservation Failure',
          detail: exception,
        });
        resetToastInStore();
      });
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Reservation Failure',
        detail: exception,
      });
      resetToastInStore();
    });

    const SERVICE = new ReservationService();
    SERVICE.findReservations({ biker_pseudo: biker.pseudo }).then((list) => {
      setReservationsInStore(list);
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Reservation Failure',
        detail: exception,
      });
      resetToastInStore();
    }).finally(() => {
      setIsLoading(false);
    });
    setRoadTripsList(myList);
  };

  const joinTemplate = (roadtrip) => {
    console.log(roadtrip);
    if (roadtrip) {
      if (roadtrip.reservation) {
        return (<Message severity='success' text='Subscribed' />);
      }
      return (
        <Button
          label={(roadtrip.reservation) ? "Reserved" : "Join"}
          disabled={roadtrip.reservation}
          icon={String('pi ').concat((roadtrip.reservation) ? "pi-check" : "pi-plus")}
          onClick={(e) => updateMyRoadTrips(roadtrip)}
        />
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

  const startCityTemplate = (roadtrip) => {
    console.log(roadtrip);
    return String(roadtrip.startAddress.city)
      .concat(' (')
      .concat(roadtrip.startAddress.zipCode)
      .concat(')');
  }

  const stopCityTemplate = (roadtrip) => String(roadtrip.stopAddress.city)
    .concat(' (')
    .concat(roadtrip.stopAddress.zipCode)
    .concat(')');

  const statusTemplate = (roadtrip) => (
    <Tag className={String('Tag-').concat(roadtrip.status)} value={roadtrip.status} />
  );

  const tripTemplate = (roadtrip) => {
    const events = [
      {
        place: String(roadtrip.startAddress.city)
          .concat(' (')
          .concat(roadtrip.startAddress.zipCode)
          .concat('), ')
          .concat(roadtrip.startAddress.country),
        date: formatDate(roadtrip.startDate),
      },{
        place: String(roadtrip.stopAddress.city)
          .concat(' (')
          .concat(roadtrip.stopAddress.zipCode)
          .concat('), ')
          .concat(roadtrip.stopAddress.country),
        date: formatDate(roadtrip.endDate),
      },
    ];
    return (
      <div className="TimeLineContainer">
        <Timeline value={events} opposite={(item) => item.place} content={(item) => <small className="p-text-secondary">{item.date}</small>} />
      </div>
    );
  };

  return (
    <div className="Component Component-RoadTripList">
      <div className="card">
        <DataTable
          value={roadTripsList}
          paginator
          rows={10}
          className="p-datatable-customers"
          emptyMessage="No road trips found."
          removableSort
          selectionMode="single"
          loading={isLoading}
        >
          <Column style={{ width: '22rem' }} header="Trip" body={tripTemplate} sortable />
          {/* <Column field="startDate" header="Start Date" body={startDateTemplate} sortable />
          <Column field="endDate" header="End Date" body={stopDateTemplate} sortable />
          <Column field="startAddress" header="Start City" body={startCityTemplate} sortable />
          <Column field="stopAddress" header="Stop City" body={stopCityTemplate} sortable />
          <Column field="KilometersAverage" header="Distance" sortable /> */}
          <Column field="status" header="Status" body={statusTemplate} sortable />
          <Column field="maxBikers" header="Max Bikers" body={maxBikersTemplate} sortable />
          <Column field="roadTripType" header="Type" body={roadTripTypeTemplate} sortable />
          <Column header="Details" body={detailsTemplate} />
          {(enableReservation) ? (
            <Column header="Reservation" body={joinTemplate} />
          ) : (null)
          }

        </DataTable>
        {/* {(enableReservation) ? (
          <Button label="Confirm reservations" icon="pi pi-lock" className="p-button-primary" />
        ) : (null)
        } */}
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
