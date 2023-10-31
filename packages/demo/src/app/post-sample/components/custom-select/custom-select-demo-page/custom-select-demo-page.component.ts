import { Component } from '@angular/core';
const codeTemplate =
  require('!!raw-loader!../custom-select-demo/custom-select-demo.component.html').default;
const codeTemplateFloating =
  require('!!raw-loader!../custom-select-floating-demo/custom-select-floating-demo.component.html').default;
const codeComponent =
  require('!!raw-loader!../custom-select-demo/custom-select-demo.component.ts').default;

@Component({
  selector: 'app-custom-select-demo-page',
  templateUrl: './custom-select-demo-page.component.html',
})
export class CustomSelectDemoPageComponent {
  codeTemplate = codeTemplate;
  codeTemplateFloating = codeTemplateFloating;
  codeComponent = codeComponent;
}
