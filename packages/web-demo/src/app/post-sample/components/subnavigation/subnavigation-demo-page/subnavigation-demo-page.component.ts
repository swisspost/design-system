import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../subnavigation-demo/subnavigation-demo.component.html').default;

@Component({
  selector: 'app-subnavigation-demo-page',
  templateUrl: './subnavigation-demo-page.component.html',
  styleUrls: ['./subnavigation-demo-page.component.css']
})
export class SubnavigationDemoPageComponent {
  codeTemplate = codeTemplate;
}
