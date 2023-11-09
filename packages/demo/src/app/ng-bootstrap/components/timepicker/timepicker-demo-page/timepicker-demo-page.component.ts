import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../timepicker-demo/timepicker-demo.component.html').default;
@Component({
  selector: 'app-timepicker-demo-page',
  templateUrl: './timepicker-demo-page.component.html',
})
export class NgbTimepickerDemoPageComponent {
  codeTemplate = codeTemplate;
}
