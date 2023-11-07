import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../alert-demo/alert-demo.component.html').default;
@Component({
  selector: 'app-ngb-alert-demo-page',
  templateUrl: './alert-demo-page.component.html',
})
export class NgbAlertDemoPageComponent {
  codeTemplate: string = codeTemplate.toString();
  arrayTemplate: string = '';

  setArrayTemplate(arrayTemplate: string) {
    this.arrayTemplate = arrayTemplate;
  }
}
