import { Component } from '@angular/core';
const  checkboxTemplate = require('!!raw-loader!../button-group-checkbox-demo/button-group-checkbox-demo.component.html').default
const  radioTemplate = require('!!raw-loader!../button-group-radio-demo/button-group-radio-demo.component.html').default

@Component({
  selector: 'app-button-group-demo-page',
  templateUrl: './button-group-demo-page.component.html'
})
export class ButtonGroupDemoPageComponent {
  checkboxTemplate = checkboxTemplate;
  radioTemplate = radioTemplate;
}
