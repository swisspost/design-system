import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-file-demo/form-file-demo.component.html').default;

@Component({
  selector: 'app-form-file-demo-page',
  templateUrl: './form-file-demo-page.component.html',
})
export class FormFileDemoPageComponent {
  codeTemplate = codeTemplate;
}
