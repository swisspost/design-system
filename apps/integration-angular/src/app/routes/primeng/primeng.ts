import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'primeng',
  templateUrl: './primeng.html',
  imports: [TableModule],
})
export class PrimeNg {
  data = [
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
