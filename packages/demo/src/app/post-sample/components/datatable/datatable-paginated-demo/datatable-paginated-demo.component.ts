import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datatable-paginated-demo',
  templateUrl: './datatable-paginated-demo.component.html',
})
export class DatatablePaginatedDemoComponent implements OnInit, OnChanges {
  @Input() public paginationMode: 'standard' | 'loader' = 'standard';
  public page: number;
  public nbRowsPerPage: number;
  public loading: boolean;
  public readonly rows = [
    {
      name: 'irure amet Lorem ex aute laboris sunt',
      price: 41.04,
      id: 2285160636,
    },
    {
      name: 'amet minim esse dolore excepteur dolore ex',
      price: 65.71,
      id: 2864505807,
    },
    {
      name: 'anim consectetur qui culpa eu eiusmod dolor',
      price: 57.72,
      id: 2448670977,
    },
    {
      name: 'minim tempor non do quis minim velit',
      price: 38.13,
      id: 2411003894,
    },
    {
      name: 'aliqua laboris enim veniam tempor magna nostrud',
      price: 0,
      id: 2569769930,
    },
    {
      name: 'veniam exercitation sunt enim et excepteur exercitation',
      price: 93.26,
      id: 2709567646,
    },
    {
      name: 'reprehenderit cillum commodo officia ad esse id',
      price: 0,
      id: 2979592582,
    },
    {
      name: 'occaecat ullamco commodo velit reprehenderit et enim',
      price: 47.46,
      id: 2879934487,
    },
    {
      name: 'nisi reprehenderit non mollit ad fugiat commodo',
      price: 0,
      id: 2905345444,
    },
    {
      name: 'consequat tempor ad nisi sunt non laboris',
      price: 51.57,
      id: 2138506913,
    },
    {
      name: 'do magna laborum enim qui ea duis',
      price: 24.75,
      id: 2065606839,
    },
    {
      name: 'adipisicing consectetur dolore dolore amet qui ex',
      price: 14.79,
      id: 2189192197,
    },
    {
      name: 'incididunt velit nostrud nostrud labore minim dolore',
      price: 34.01,
      id: 2615450077,
    },
    {
      name: 'ea enim do reprehenderit ex ad nostrud',
      price: 34.41,
      id: 2852403903,
    },
    {
      name: 'tempor do nulla non proident do ad',
      price: 0,
      id: 2182009963,
    },
    {
      name: 'occaecat voluptate laborum mollit ipsum magna laboris',
      price: 19,
      id: 2359467106,
    },
    {
      name: 'ut commodo Lorem anim laboris non consectetur',
      price: 29.73,
      id: 2953678213,
    },
    {
      name: 'sit ipsum pariatur amet nulla amet quis',
      price: 0,
      id: 2066228843,
    },
    {
      name: 'aliquip culpa ipsum culpa anim pariatur velit',
      price: 75.37,
      id: 2483151517,
    },
    {
      name: 'veniam laboris deserunt sint dolor laboris qui',
      price: 0,
      id: 2238274828,
    },
    {
      name: 'id tempor officia enim ullamco eiusmod minim',
      price: 91.71,
      id: 2761638597,
    },
    {
      name: 'in occaecat exercitation duis do quis deserunt',
      price: 88.02,
      id: 2270779156,
    },
    {
      name: 'quis excepteur esse duis dolor elit ullamco',
      price: 71.3,
      id: 2776587464,
    },
    {
      name: 'eu consectetur cillum sint ipsum Lorem aliquip',
      price: 51.59,
      id: 2259373011,
    },
    {
      name: 'veniam ipsum exercitation adipisicing esse adipisicing eu',
      price: 30.67,
      id: 2590368003,
    },
    {
      name: 'pariatur dolor quis cillum sit minim non',
      price: 0,
      id: 2026467457,
    },
    {
      name: 'aute ipsum anim magna ut exercitation ea',
      price: 53.82,
      id: 2060166830,
    },
    {
      name: 'anim pariatur adipisicing sunt excepteur eu qui',
      price: 6.49,
      id: 2895749904,
    },
    {
      name: 'sit tempor exercitation dolore ad aliquip pariatur',
      price: 5.22,
      id: 2727224552,
    },
    {
      name: 'incididunt consequat aute magna velit magna id',
      price: 16.86,
      id: 2300535944,
    },
    {
      name: 'fugiat aute culpa ex officia velit incididunt',
      price: 67.34,
      id: 2843481076,
    },
    {
      name: 'culpa dolore qui Lorem in enim culpa',
      price: 18.04,
      id: 2638963606,
    },
    {
      name: 'vehicula et, rutrum eu, ultrices sit',
      price: 74.4,
      id: 2690008058,
    },
    {
      name: 'Ut sagittis lobortis mauris. Suspendisse aliquet',
      price: 85.21,
      id: 2104961564,
    },
    {
      name: 'eget metus. In nec orci. Donec',
      price: 5.03,
      id: 2488973048,
    },
    {
      name: 'lorem fringilla ornare placerat, orci lacus vestibulum',
      price: 12.82,
      id: 2068602240,
    },
    {
      name: 'nulla. Integer urna. Vivamus molestie',
      price: 27.82,
      id: 2552576223,
    },
    {
      name: 'dictum sapien. Aenean massa. Integer vitae nibh.',
      price: 55.41,
      id: 2490791690,
    },
    {
      name: 'rutrum magna. Cras convallis convallis dolor. Quisque',
      price: 62.48,
      id: 2636742835,
    },
    {
      name: 'pede. Cras vulputate velit eu',
      price: 56.58,
      id: 2014810358,
    },
    {
      name: 'molestie pharetra nibh. Aliquam ornare,',
      price: 27.12,
      id: 2259658668,
    },
    {
      name: 'sapien, gravida non, sollicitudin',
      price: 12.5,
      id: 2132558847,
    },
    {
      name: 'ipsum sodales purus, in molestie tortor nibh sit',
      price: 53.24,
      id: 2739597493,
    },
    {
      name: 'vitae semper egestas, urna justo faucibus lectus,',
      price: 53.25,
      id: 2002085100,
    },
    {
      name: 'ligula. Nullam enim. Sed nulla',
      price: 10.66,
      id: 2235245453,
    },
    {
      name: 'per conubia nostra, per inceptos hymenaeos. Mauris',
      price: 4.47,
      id: 2562494730,
    },
    {
      name: 'parturient montes, nascetur ridiculus mus. Proin',
      price: 35.37,
      id: 2536109037,
    },
    {
      name: 'dictum. Phasellus in felis. Nulla tempor',
      price: 49.19,
      id: 2300129128,
    },
    {
      name: 'nec urna suscipit nonummy. Fusce fermentum',
      price: 95.46,
      id: 2625971868,
    },
    {
      name: 'mauris blandit mattis. Cras eget nisi dictum',
      price: 36.82,
      id: 2635588432,
    },
    {
      name: 'Mauris nulla. Integer urna. Vivamus molestie',
      price: 83.86,
      id: 2334831693,
    },
    {
      name: 'Suspendisse commodo tincidunt nibh. Phasellus nulla.',
      price: 26.12,
      id: 2405472012,
    },
  ];

  public ngOnInit() {
    this.initPagination();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.initPagination();
  }

  private initPagination(): void {
    this.page = 0;
    this.nbRowsPerPage = 5;
  }

  public loadMore(): void {
    this.loading = true;

    // simulate data fetching
    setTimeout(() => {
      this.nbRowsPerPage += 5;
      this.loading = undefined;
    }, Math.random() * 1000);
  }
}
