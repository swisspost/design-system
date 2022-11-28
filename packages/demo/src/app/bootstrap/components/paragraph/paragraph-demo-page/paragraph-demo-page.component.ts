import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../paragraph-demo/paragraph-demo.component.html').default;
@Component({
  selector: 'app-paragraph-demo-page',
  templateUrl: './paragraph-demo-page.component.html',
})
export class ParagraphDemoPageComponent {
  codeTemplate = codeTemplate;
}
