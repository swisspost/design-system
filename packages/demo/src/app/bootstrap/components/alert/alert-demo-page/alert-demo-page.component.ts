import { Component } from '@angular/core';
const codeTemplateToast = require('!!raw-loader!../toast-demo/toast-demo.component.html').default;
const codeTemplateAlert = require('!!raw-loader!../alert-demo/alert-demo.component.html').default;
const codeTemplateAction =
  require('!!raw-loader!../action-alert-demo/action-alert-demo.component.html').default;
const codeTemplateButton =
  require('!!raw-loader!../button-notification-demo/button-notification-demo.component.html').default;
const codeTemplateOverlay =
  require('!!raw-loader!../overlay-notification-demo/overlay-notification-demo.component.html').default;
const codeTemplateDot =
  require('!!raw-loader!../dot-notification-demo/dot-notification-demo.component.html').default;

@Component({
  selector: 'app-alert-demo-page',
  templateUrl: './alert-demo-page.component.html',
})
export class AlertDemoPageComponent {
  codeTemplateToast = codeTemplateToast;
  codeTemplateAlert = codeTemplateAlert;
  codeTemplateAction = codeTemplateAction;
  codeTemplateButton = codeTemplateButton;
  codeTemplateOverlay = codeTemplateOverlay;
  codeTemplateDot = codeTemplateDot;
}
