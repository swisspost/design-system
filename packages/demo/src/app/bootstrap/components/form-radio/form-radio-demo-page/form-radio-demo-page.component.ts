import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-radio-demo/form-radio-demo.component.html').default;

@Component({
  selector: 'app-form-radio-demo-page',
  templateUrl: './form-radio-demo-page.component.html',
})
export class FormRadioDemoPageComponent {
  codeTemplate = codeTemplate;
}
