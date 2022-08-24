/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import {Component} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-form-range-custom',
  templateUrl: 'form-range-custom-demo.component.html',
  styleUrls: ['form-range-custom-demo.component.scss'],
})
export class FormRangeCustomDemoComponent {

  templateDrivenValue = 67;
  displayedValue = 54;
  controlledValue = 28;
  reactiveValue: UntypedFormControl;

  constructor() {
    this.reactiveValue = new UntypedFormControl('31');
  }

}
