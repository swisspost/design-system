import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-check-demo/form-check-demo.component.html').default;

@Component({
  selector: 'app-form-check-demo-page',
  templateUrl: './form-check-demo-page.component.html',
})
export class FormCheckDemoPageComponent {
  codeTemplate = codeTemplate;
}
