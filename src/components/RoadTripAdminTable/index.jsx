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
import { confirmDialog } from 'primereact/confirmdialog';

import Reservation from '../../entities/reservation';
import { setToast, resetToast } from '../../store/toast/toastAction';
import { setReservations } from '../../store/reservation/reservationAction';

import { Link } from 'react-router-dom';
import ReservationService from '../../services/reservationService';
import RoadtripService from '../../services/roadtripService';
import RegistrationStatus from '../../enumerations/registrationStatus';
import './style.css';

function RoadTripAdminTable({
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
  const [expandedRows, setExpandedRows] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const list = [];
    for (let i = 0; i < roadtrips.length; i += 1) {
      const roadtrip = { ...roadtrips[i] };
      roadtrip.reservations = [];
      for (let j = 0; j < reservations.length; j += 1) {
        const reservation = { ...reservations[j] };
        if (reservation.roadTrip.identifier === roadtrip.identifier) {
          roadtrip.reservations.push(reservation);
        }
      }
      list.push(roadtrip);
    }
    setRoadTripsList(list);
    setIsLoading(false);
  }, [roadtrips, reservations, reservationsInStore, setRoadTripsList]);


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
      // if (((roadtrip.candidates.length * 100) / roadtrip.maxBikers) < 80) {
      //   classNameCandidates = 'alert-level-ras';
      // } else if (((roadtrip.candidates.length * 100) / roadtrip.maxBikers) < 100) {
      //   classNameCandidates = 'alert-level-limit';
      // } else {
      // }
      classNameCandidates = 'alert-level-full';

      // if (((roadtrip.bikers.length * 100) / roadtrip.maxBikers) < 80) {
      //   classNameBikers = 'alert-level-ras';
      // } else if (((roadtrip.bikers.length * 100) / roadtrip.maxBikers) < 100) {
      //   classNameBikers = 'alert-level-limit';
      // } else {
      // }
      classNameBikers = 'alert-level-full';

      return (
        <>
          <p className={classNameCandidates}>
            {String('Candidates: ').concat(/* roadtrip.candidates.length */ -1).concat('/').concat((roadtrip.maxBikers) !== 10 ? roadtrip.maxBikers : '')}
            {
              (roadtrip.maxBikers) === 10 ? (<span>&infin;</span>) : (null)
            }
          </p>
          <p className={classNameBikers}>
            {String('Bikers: ').concat(/* roadtrip.bikers.length */ -1).concat('/').concat((roadtrip.maxBikers) !== 10 ? roadtrip.maxBikers : <span>&#8734;</span>)}
          </p>
        </>
      );
    }
    return (null);
  };

  const startDateTemplate = (roadtrip) => formatDate(roadtrip.startDate);

  const stopDateTemplate = (roadtrip) => formatDate(roadtrip.endDate);

  const startCityTemplate = (roadtrip) => {
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
      }, {
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

  const onRowExpand = (event) => {

  }

  const onRowCollapse = (event) => {

  }

  const decline = (reservation) => {
    reservation.status = 'DENIED';
    const SERVICE = new ReservationService();
    SERVICE.update(reservation.identifier, Reservation.parse(reservation)).then((updatedReservation) => {
      console.log('Updated');
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Reservation Decline Failure',
        detail: exception,
      });
      resetToastInStore();
    });
  }

  const accept = (reservation) => {
    reservation.status = 'ACCEPTED';
    const SERVICE = new ReservationService();
    SERVICE.update(reservation.identifier, Reservation.parse(reservation)).then((updatedReservation) => {
      console.log('Updated');
    }).catch((exception) => {
      setToastInStore({
        severity: 'error',
        summary: 'Reservation Decline Failure',
        detail: exception,
      });
      resetToastInStore();
    });
  }

  const declineHandle = (reservation) => {
    // del reservation.roadTrips
    console.log(reservation);
    confirmDialog({
      message: 'Are you sure you want to decline this biker ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => decline(reservation),
    });
  }

  const acceptHandle = (reservation) => {
    confirmDialog({
      message: 'Are you sure you want to accept this biker ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => accept(reservation),
    });
  }
  const reservationActions = (data) => {
    return (
      <>
        {(data.status === 'PENDING' || data.status === 'ACCEPTED') ? (
          <Button icon="pi pi-ban" label="Decline" className="p-button-danger" onClick={() => declineHandle(data)} />
        ) : (null)}
        {(data.status === 'PENDING' || data.status === 'DENIED') ? (
          <Button icon="pi pi-check" label="Accept" className="p-button-success" onClick={() => acceptHandle(data)} />
        ) : (null)}
      </>
    );
  }

  const computeAge = (date) => {
    const month_diff = Date.now() - date.getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();
    const age = Math.abs(year - 1970);
    return age;
  }

  const ageTemplate = (data) => {
    return computeAge(data.biker.birthDate);
  }
  const experienceTemplate = (data) => {
    console.log(data.biker.driverLicenceDate);
    const year = computeAge(data.biker.driverLicenceDate);
    if (year < 2) {
      return (
        <>
          {year}
          <span className="YoungBiker">A2</span>
        </>
      )
    }
    return year;
  }

  const firstRescueTemplate = (data) => {
    console.log(data.biker.isTrainedForFirstRescue);
    if (data.biker.isTrainedForFirstRescue) {
      return (<Tag icon="pi pi-heart" />);
    }
    return (null);
  }

  const canRepairTemplate = (data) => {
    if (data.biker.canRepairMotorbike) {
      return (<Tag icon="pi pi-cog" />);
    }
    return (null);
  }
  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <h5>Reservations</h5>
        <DataTable value={data.reservations}>
          <Column field="biker.pseudo" header="Biker" sortable />
          <Column header="Age" body={ageTemplate} sortable />
          <Column header="Experience" body={experienceTemplate} sortable />
          <Column header="First Rescue" body={firstRescueTemplate} sortable />
          <Column header="Can Repair" body={canRepairTemplate} sortable />
          <Column field="biker.pseudo" header="Moto" sortable />
          <Column header="Actions" body={reservationActions} />
        </DataTable>
      </div>
    );
  };

  const deleteRoadtripHandle = (roadtrip) => {

  }

  const deleteTemplate = (data) => <Button label="Delete" icon="pi pi-trash" className="p-button p-button-danger" onClick={() => deleteRoadtripHandle(data)} />

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
          loading={isLoading}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="identifier"
        >
          <Column expander style={{ width: '3em' }} />
          <Column field="title" header="Title" />
          <Column field="status" header="Status" body={statusTemplate} sortable />
          <Column field="maxBikers" header="Max Bikers" body={maxBikersTemplate} sortable />
          <Column field="roadTripType" header="Type" body={roadTripTypeTemplate} sortable />
          <Column header="Details" body={detailsTemplate} />
          {(enableReservation) ? (
            <Column header="Reservation" body={joinTemplate} />
          ) : (null)
          }
          <Column header="Delete" body={deleteTemplate} />

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

export default withRouter(connect(null, mapDispatchToProps)(RoadTripAdminTable));
