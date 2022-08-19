import { Component } from '@angular/core';
const checkboxTemplate = require('!!raw-loader!../buttons-checkbox-demo/buttons-checkbox-demo.component.html').default;
const radioTemplate = require('!!raw-loader!../buttons-radio-demo/buttons-radio-demo.component.html').default;

@Component({
  selector: 'app-ngb-buttons-demo-page',
  templateUrl: './buttons-demo-page.component.html'
})
export class NgbButtonsDemoPageComponent {
  checkboxTemplate = checkboxTemplate;
  radioTemplate = radioTemplate;
}
