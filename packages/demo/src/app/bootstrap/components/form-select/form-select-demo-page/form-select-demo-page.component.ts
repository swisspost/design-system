import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-select-demo/form-select-demo.component.html').default;

@Component({
  selector: 'app-select-demo-page',
  templateUrl: './form-select-demo-page.component.html',
})
export class FormSelectDemoPageComponent {
  codeTemplate = codeTemplate;
}
