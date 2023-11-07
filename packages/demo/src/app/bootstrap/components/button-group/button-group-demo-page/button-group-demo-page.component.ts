import { Component } from '@angular/core';
const checkboxTemplate =
  require('!!raw-loader!../button-group-checkbox-demo/button-group-checkbox-demo.component.html').default;
const checkboxController =
  require('!!raw-loader!../button-group-checkbox-demo/button-group-checkbox-demo.component.ts').default;
const reactiveCheckboxTemplate =
  require('!!raw-loader!../button-group-reactive-checkbox-demo/button-group-reactive-checkbox-demo.component.html').default;
const reactiveCheckboxController =
  require('!!raw-loader!../button-group-reactive-checkbox-demo/button-group-reactive-checkbox-demo.component.ts').default;
const radioTemplate =
  require('!!raw-loader!../button-group-radio-demo/button-group-radio-demo.component.html').default;
const radioController =
  require('!!raw-loader!../button-group-radio-demo/button-group-radio-demo.component.ts').default;
const reactiveRadioTemplate =
  require('!!raw-loader!../button-group-reactive-radio-demo/button-group-reactive-radio-demo.component.html').default;
const reactiveRadioController =
  require('!!raw-loader!../button-group-reactive-radio-demo/button-group-reactive-radio-demo.component.ts').default;

enum FormType {
  TemplateDriven,
  Reactive,
}

@Component({
  selector: 'app-button-group-demo-page',
  templateUrl: './button-group-demo-page.component.html',
})
export class ButtonGroupDemoPageComponent {
  readonly FormType = FormType;
  checkboxType = FormType.TemplateDriven;
  radioType = FormType.TemplateDriven;

  checkboxTemplate = checkboxTemplate;
  checkboxController = checkboxController;
  reactiveCheckboxTemplate = reactiveCheckboxTemplate;
  reactiveCheckboxController = reactiveCheckboxController;
  radioTemplate = radioTemplate;
  radioController = radioController;
  reactiveRadioTemplate = reactiveRadioTemplate;
  reactiveRadioController = reactiveRadioController;
}
