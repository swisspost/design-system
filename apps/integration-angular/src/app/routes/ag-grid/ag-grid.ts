import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { swissPostTheme } from '@swisspost/design-system-theme-ag-grid';

@Component({
  selector: 'ag-grid',
  templateUrl: './ag-grid.html',
  imports: [AgGridAngular],
})
export class AgGrid {
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      filter: true,
    },
    domLayout: 'autoHeight',
    theme: swissPostTheme,
  };

  colDefs: ColDef[] = [
    { field: 'trackingId', checkboxSelection: true, pinned: 'left', headerName: 'Tracking ID' },
    { field: 'type', headerName: 'Type' },
    { field: 'weight', headerName: 'Weight (kg)' },
    { field: 'destination', headerName: 'Destination' },
    { field: 'status', headerName: 'Status' },
    { field: 'priority', headerName: 'Priority' },
  ];

  rowData = [
    {
      trackingId: 'CH-99-123456-7',
      type: 'Priority Letter',
      weight: 0.05,
      destination: 'Bern',
      status: 'Delivered',
      priority: true,
    },
    {
      trackingId: 'CH-99-234567-8',
      type: 'Parcel',
      weight: 2.4,
      destination: 'Zurich',
      status: 'In Transit',
      priority: false,
    },
    {
      trackingId: 'CH-99-345678-9',
      type: 'Express',
      weight: 0.8,
      destination: 'Geneva',
      status: 'Out for Delivery',
      priority: true,
    },
    {
      trackingId: 'CH-99-456789-0',
      type: 'Registered Letter',
      weight: 0.12,
      destination: 'Basel',
      status: 'Processing',
      priority: false,
    },
    {
      trackingId: 'CH-99-567890-1',
      type: 'Large Parcel',
      weight: 12.6,
      destination: 'Lausanne',
      status: 'In Transit',
      priority: false,
    },
    {
      trackingId: 'CH-99-678901-2',
      type: 'Express',
      weight: 1.1,
      destination: 'Lucerne',
      status: 'Delivered',
      priority: true,
    },
  ];
}
