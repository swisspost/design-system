/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-range-custom',
  templateUrl: 'form-range-custom-demo.component.html',
  styleUrls: ['form-range-custom-demo.component.scss'],
})
export class FormRangeCustomDemoComponent {

  templateDrivenValue = 67;
  displayedValue = 54;
  controlledValue = 28;
  reactiveValue: FormControl;

  constructor() {
    this.reactiveValue = new FormControl('31');
  }

}
