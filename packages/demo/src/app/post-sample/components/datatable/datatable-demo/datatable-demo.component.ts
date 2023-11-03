import { Component, Input } from '@angular/core';

interface IRecords {
  debtorId: number;
  rrn: number;
  billingNumber: number;
  billingMonth: string;
  keyword: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-datatable-demo',
  templateUrl: './datatable-demo.component.html',
})
export class DatatableDemoComponent {
  @Input() public headerColumn: boolean;
  @Input() public tableType: string;
  public records: IRecords[];
  public statuses: string[];

  constructor() {
    this.records = [
      {
        debtorId: 40103969,
        rrn: 503103725,
        billingNumber: 2277042726,
        billingMonth: '2021-03-15T12:09:51-01:00',
        keyword: 'Economy',
        amount: 965.82,
        status: 'inactive',
      },
      {
        debtorId: 40103991,
        rrn: 503103792,
        billingNumber: 2277042252,
        billingMonth: '2021-03-15T12:09:51-01:00',
        keyword: 'Economy',
        amount: 626.65,
        status: 'active',
      },
      {
        debtorId: 40103967,
        rrn: 503103740,
        billingNumber: 2277042494,
        billingMonth: '2021-03-15T12:09:51-01:00',
        keyword: 'Dispobox',
        amount: 802.18,
        status: 'active',
      },
      {
        debtorId: 40103986,
        rrn: 503103788,
        billingNumber: 2277042324,
        billingMonth: '2021-03-15T12:09:51-01:00',
        keyword: 'Express shipment',
        amount: 397.05,
        status: 'inactive',
      },
      {
        debtorId: 40103967,
        rrn: 503103798,
        billingNumber: 2277042204,
        billingMonth: '2021-03-15T12:09:51-01:00',
        keyword: 'Express shipment',
        amount: 742.87,
        status: 'active',
      },
    ];

    this.statuses = ['active', 'inactive', 'automatic', 'blocked'];
  }
}
