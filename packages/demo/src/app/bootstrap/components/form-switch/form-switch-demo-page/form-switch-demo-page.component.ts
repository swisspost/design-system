import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-switch-demo/form-switch-demo.component.html').default;

@Component({
  templateUrl: './form-switch-demo-page.component.html',
})
export class FormSwitchDemoPageComponent {
  codeTemplate = codeTemplate;
}
