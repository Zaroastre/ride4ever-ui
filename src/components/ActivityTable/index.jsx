import React from 'react';
/* eslint-disable react/prop-types */
import { withRouter } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Tag } from 'primereact/tag';
import './style.css';

function ActivityTable({
  activities,
}) {
  return (
    <div className="Component Component-ActivityTable">
      <div className="card">
        <DataTable
          value={activities}
          paginator
          rows={10}
          className="p-datatable-customers"
          emptyMessage="No activities found."
          removableSort
          selectionMode="single"
        >
          <Column field="date" header="Date" sortable />
          <Column field="pseudo" header="Pseudo" />
          <Column field="event" header="Event Type" />
          <Column field="detail" header="Detail" />
        </DataTable>
      </div>
    </div>
  );
}

export default withRouter(ActivityTable);
