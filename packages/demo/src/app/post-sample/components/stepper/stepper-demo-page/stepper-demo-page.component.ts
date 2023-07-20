/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../stepper-demo/stepper-demo.component.html').default;
const codeController = require('!!raw-loader!../stepper-demo/stepper-demo.component.ts').default;

const codeTemplateInactive =
  require('!!raw-loader!../stepper-demo-inactive-next-step/stepper-demo-inactive-next-step.component.html').default;
const codeControllerInactive =
  require('!!raw-loader!../stepper-demo-inactive-next-step/stepper-demo-inactive-next-step.component.ts').default;

@Component({
  templateUrl: 'stepper-demo-page.component.html',
})
export class StepperDemoPageComponent {
  codeTemplate = codeTemplate;
  codeController = codeController;

  codeTemplateInactive = codeTemplateInactive;
  codeControllerInactive = codeControllerInactive;
}
