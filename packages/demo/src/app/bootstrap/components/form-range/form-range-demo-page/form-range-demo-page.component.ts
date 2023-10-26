import { Component } from '@angular/core';
const basicCodeTemplate =
  require('!!raw-loader!../form-range-demo/form-range-demo.component.html').default;
const customCodeTemplate =
  require('!!raw-loader!../form-range-custom-demo/form-range-custom-demo.component.html').default;

@Component({
  selector: 'app-form-range-demo-page',
  templateUrl: './form-range-demo-page.component.html',
})
export class FormRangeDemoPageComponent {
  basicCodeTemplate = basicCodeTemplate;
  customCodeTemplate = customCodeTemplate;
}
