import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../forms-demo/forms-demo.component.html').default;
@Component({
  selector: 'app-forms-demo-page',
  templateUrl: './forms-demo-page.component.html',
})
export class FormsDemoPageComponent {
  codeTemplate = codeTemplate;
}
