import React from 'react';
/* eslint-disable react/prop-types */
import { withRouter } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import './style.css';

function ActivityTable({
  activities,
}) {
  const dateTemplate = (activity) => activity.date.toLocaleString();
  const eventTemplate = (activity) => <Tag className={String('Tag-Event-').concat(activity.event)} value={activity.event} />;
  return (
    <div className="Component Component-ActivityTable">
      <div className="card">
        <DataTable
          value={activities}
          paginator
          rows={100}
          className="p-datatable-sm"
          emptyMessage="No activities found."
          removableSort
          selectionMode="single"
          sortField="date"
          sortOrder={-1}
        >
          <Column field="date" body={dateTemplate} header="Date" sortable />
          <Column field="event" body={eventTemplate} header="Event Type" />
          <Column field="detail" header="Detail" />
        </DataTable>
      </div>
    </div>
  );
}

export default withRouter(ActivityTable);
