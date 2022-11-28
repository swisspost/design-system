import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../pagination-demo/pagination-demo.component.html').default;
@Component({
  selector: 'app-ngb-pagination-demo-page',
  templateUrl: './pagination-demo-page.component.html',
})
export class NgbPaginationDemoPageComponent {
  codeTemplate = codeTemplate;
}
