/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-datatable-editable-demo',
  templateUrl: 'datatable-editable-demo.component.html',
})
export class DatatableEditableDemoComponent {
  public readonly Object = Object;
  public rows: { id: string; product: string; quantity: number }[];

  constructor() {
    this.rows = [
      {
        id: '2b369518-e006-450f-a1fc-b1ca2e9b2a72',
        product: 'Laboris do aliqua pariatur consequat',
        quantity: 65,
      },
      {
        id: 'c12e968e-49c0-4e22-8f1c-2194f728b97f',
        product: 'Commodo culpa et culpa sit',
        quantity: 76,
      },
      {
        id: 'dcf8087a-3db0-4e5f-9357-eff67b7ce722',
        product: 'Irure mollit adipisicing voluptate pariatur',
        quantity: 72,
      },
      {
        id: '4de80e57-9b4e-4fbd-b245-5897c081e28b',
        product: 'In culpa est et commodo',
        quantity: 100,
      },
    ];
  }
}
