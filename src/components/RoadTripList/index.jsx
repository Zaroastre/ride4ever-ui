/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {
  useState,
} from 'react';
import { withRouter } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';

import './style.css';
import { Link } from 'react-router-dom';

function RoadTripList({
  roadtrips,
}) {
  const [myRoadTrips, setMyRoadTrips] = useState([]);
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
      if (!myList.includes(roadtrip)) {
        myList.push(roadtrip);
      }
    } else {
      const index = myRoadTrips.findIndex((trip) => trip.identifier === roadtrip.identifier);
      if (index >= 0) {
        myList.splice(index, 1);
      }
    }
    setMyRoadTrips(myList);
  };

  const joinTemplate = (roadtrip) => {
    if (roadtrip) {
      return (
        <InputSwitch checked={myRoadTrips.includes(roadtrip)} onChange={(e) => updateMyRoadTrips(roadtrip, e.value)} />
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
          value={roadtrips}
          paginator
          rows={10}
          className="p-datatable-customers"
          emptyMessage="No road trips found."
          removableSort
          selectionMode="single"
        >
          <Column field="title" header="Title" filterPlaceholder="Search by name" />
          <Column field="maxBikers" header="Max Bikers" body={maxBikersTemplate} sortable />
          <Column field="startDate" header="Start Date" body={startDateTemplate} sortable />
          <Column field="endDate" header="End Date" body={stopDateTemplate} sortable />
          <Column field="status" header="Status" body={statusTemplate} sortable />
          <Column field="startAddress.city" header="Start City" body={startCityTemplate} sortable />
          <Column field="stopAddress.city" header="Stop City" body={stopCityTemplate} sortable />
          <Column field="KilometersAverage" header="Distance" sortable />
          <Column field="roadTripType" header="Type" body={roadTripTypeTemplate} sortable />
          <Column header="Details" body={detailsTemplate} />
          <Column header="Reservation" body={joinTemplate} />
        </DataTable>
        <Button label="Confirm reservations" icon="pi pi-lock" className="p-button-primary" />
      </div>
    </div>
  );
}

export default withRouter(RoadTripList);
