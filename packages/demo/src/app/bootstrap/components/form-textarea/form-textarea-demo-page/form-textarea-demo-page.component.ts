import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../form-textarea-demo/form-textarea-demo.component.html').default;

@Component({
  selector: 'app-form-textarea-demo-page',
  templateUrl: './form-textarea-demo-page.component.html',
})
export class FormTextareaDemoPageComponent {
  codeTemplate = codeTemplate;
}
