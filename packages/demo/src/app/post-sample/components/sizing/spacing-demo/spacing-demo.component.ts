/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-spacing-demo',
  templateUrl: 'spacing-demo.component.html',
})
export class SpacingDemoComponent {
  @Input() sizes: unknown;

  demoForm: UntypedFormGroup;
  positions: { name: string; value: string }[];
  bootstrapSizes: { name: string; value: string }[];

  constructor(private fb: UntypedFormBuilder) {
    this.demoForm = fb.group({
      margin: fb.group({
        size: ['small-large'],
        position: [''],
      }),
      padding: fb.group({
        size: ['small-regular'],
        position: [''],
      }),
    });

    this.positions = [
      { value: '', name: 'All around' },
      { value: 'x', name: 'Along the horizontal axis' },
      { value: 'y', name: 'Along the vertical axis' },
      { value: 't', name: 'At the top' },
      { value: 'b', name: 'At the bottom' },
      { value: 'r', name: 'To the right' },
      { value: 'l', name: 'To the left' },
    ];

    this.bootstrapSizes = [
      { value: '0', name: '0' },
      { value: '1', name: '1' },
      { value: '2', name: '2' },
      { value: '3', name: '3' },
      { value: '4', name: '4' },
      { value: '5', name: '5' },
      { value: 'auto', name: 'Auto' },
    ];
  }

  get highlight(): string {
    return '<div class="' + this.demoClass + '"></div>';
  }

  get demoClass(): string {
    return Object.keys(this.demoForm.value).reduce((demoClass, prop) => {
      return demoClass + ' ' + prop.charAt(0) + this.getPosition(prop) + '-' + this.getSize(prop);
    }, 'border border-dark h-bigger-giant w-bigger-giant');
  }

  private getPosition(prop: string): string {
    return this.demoForm.get(prop + '.position').value;
  }

  private getSize(prop: string): string {
    return this.demoForm.get(prop + '.size').value;
  }
}
