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

  const detailsTemplate = (roadtrip) => {
    if (roadtrip) {
      return (
        <Button icon="pi pi-eye" className="p-button-secondary" />
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
          <Column field="maxBikers" header="Max Bikers" sortable />
          <Column field="startDate" header="Start Date" sortable />
          <Column field="endDate" header="End Date" sortable />
          <Column field="title" header="Status" sortable />
          <Column field="startAddress.zipCode" header="Start Address" sortable />
          <Column field="stopAddress.zipCode" header="Stop Address" sortable />
          <Column field="KilometersAverage" header="Kilometers Average" sortable />
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
