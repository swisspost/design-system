import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../accordion-demo/accordion-demo.component.html').default;
const codeController =
  require('!!raw-loader!../accordion-demo/accordion-demo.component.ts').default;

@Component({
  selector: 'app-accordion-demo-page',
  templateUrl: './accordion-demo-page.component.html',
})
export class AccordionDemoPageComponent {
  codeTemplate = codeTemplate;
  codeController = codeController;
}
