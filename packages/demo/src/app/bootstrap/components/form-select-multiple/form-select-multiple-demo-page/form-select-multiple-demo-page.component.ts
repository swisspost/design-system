import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-select-multiple-demo/form-select-multiple-demo.component.html').default;

@Component({
  selector: 'app-multiple-select-demo-page',
  templateUrl: './form-select-multiple-demo-page.component.html',
})
export class FormSelectMultipleDemoPageComponent {
  codeTemplate = codeTemplate;
}
