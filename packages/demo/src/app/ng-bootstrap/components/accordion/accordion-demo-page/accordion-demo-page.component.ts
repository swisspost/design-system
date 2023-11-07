import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../accordion-demo/accordion-demo.component.html').default;

@Component({
  selector: 'app-accordion-demo-page',
  templateUrl: './accordion-demo-page.component.html',
})
export class NgbAccordionDemoPageComponent {
  codeTemplate = codeTemplate.toString();
}
