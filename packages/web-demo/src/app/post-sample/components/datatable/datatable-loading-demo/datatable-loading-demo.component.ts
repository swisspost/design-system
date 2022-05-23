/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-datatable-loading-demo',
  templateUrl: 'datatable-loading-demo.component.html',
})
export class DatatableLoadingDemoComponent {
  public readonly Object = Object;
  public rows: { name: string; population: number; chosenAnimal: string }[];

  showLoading: boolean = true;

  constructor() {
    this.rows = [
      {
        name: 'Saint Pierre and Miquelon',
        population: 3289570,
        chosenAnimal: 'Adouri',
      },
      {
        name: 'Malta',
        population: 1834902,
        chosenAnimal: 'Spotted deer',
      },
      {
        name: 'China',
        population: 4318704,
        chosenAnimal: 'Boa',
      },
      {
        name: 'Indonesia',
        population: 8379190,
        chosenAnimal: 'Bandicoot',
      },
      {
        name: 'Philippines',
        population: 9175816,
        chosenAnimal: 'Common shelduck',
      },
      {
        name: 'Nepal',
        population: 4827738,
        chosenAnimal: 'African snake',
      },
      {
        name: 'Uganda',
        population: 9906834,
        chosenAnimal: 'Genet',
      },
      {
        name: 'Indonesia',
        population: 9681075,
        chosenAnimal: 'Red-tailed hawk',
      },
      {
        name: 'Portugal',
        population: 4049832,
        chosenAnimal: 'Chital',
      },
      {
        name: 'Spain',
        population: 7091818,
        chosenAnimal: 'Paradoxure',
      },
    ];
  }
}
