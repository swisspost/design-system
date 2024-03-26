/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { NgModule } from '@angular/core';
import { FormRangeCustomDemoComponent } from './form-range-custom-demo.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormRangeCustomDemoComponent],
  exports: [FormRangeCustomDemoComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class FormRangeCustomDemoModule {}
