import { Component, OnInit } from '@angular/core';
const codeTemplate = require('!!raw-loader!../form-control-demo/form-control-demo.component.html').default;

@Component({
  selector: 'app-form-control-demo-page',
  templateUrl: './form-control-demo-page.component.html'
})
export class FormControlDemoPageComponent {

  codeTemplate = codeTemplate;
}
