import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../popover-demo/popover-demo.component.html').default;

@Component({
  selector: 'app-ngb-popover-demo-page',
  templateUrl: './popover-demo-page.component.html',
})
export class NgbPopoverDemoPageComponent {
  codeTemplate = codeTemplate;
}
