import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../tooltip-demo/tooltip-demo.component.html').default;
@Component({
  selector: 'app-ngb-tooltip-demo-page',
  templateUrl: './tooltip-demo-page.component.html',
})
export class NgbTooltipDemoPageComponent {
  codeTemplate = codeTemplate;
}
