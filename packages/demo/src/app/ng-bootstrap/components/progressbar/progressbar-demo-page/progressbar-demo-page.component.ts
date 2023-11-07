import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../progressbar-demo/progressbar-demo.component.html').default;

@Component({
  selector: 'app-ngb-progressbar-demo-page',
  templateUrl: './progressbar-demo-page.component.html',
})
export class NgbProgressbarDemoPageComponent {
  codeTemplate = codeTemplate;
}
