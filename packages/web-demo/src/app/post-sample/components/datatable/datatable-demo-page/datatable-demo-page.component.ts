import { Component } from '@angular/core';
const basicTemplate = require('!!raw-loader!../datatable-demo/datatable-demo.component.html').default;
const basicComponent = require('!!raw-loader!../datatable-demo/datatable-demo.component.ts').default;
const paginationTemplate = require('!!raw-loader!../datatable-paginated-demo/datatable-paginated-demo.component.html').default;
const editionTemplate = require('!!raw-loader!../datatable-editable-demo/datatable-editable-demo.component.html').default;

@Component({
  selector: 'app-data-table-demo-page',
  templateUrl: './datatable-demo-page.component.html'
})
export class DatatableDemoPageComponent {
  /* Basic datatable */
  basicTemplate = basicTemplate;
  basicComponent = basicComponent;
  tableType = '';
  headerColumn = false;

  /* Paginated datatable */
  paginationTemplate = paginationTemplate;
  paginationMode: 'standard' | 'loader' = 'standard';

  /* Editable datatable */
  editionTemplate = editionTemplate;
}
