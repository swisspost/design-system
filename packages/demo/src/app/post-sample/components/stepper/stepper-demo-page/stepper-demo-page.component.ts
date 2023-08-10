/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Component } from '@angular/core';

const codeTemplate = require('!!raw-loader!../stepper-demo/stepper-demo.component.html').default;
const codeController = require('!!raw-loader!../stepper-demo/stepper-demo.component.ts').default;

@Component({
  templateUrl: 'stepper-demo-page.component.html',
})
export class StepperDemoPageComponent {
  codeTemplate = codeTemplate;
  codeController = codeController;
}
