/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-sizing-demo',
  templateUrl: 'sizing-demo.component.html',
})
export class SizingDemoComponent {
  @Input() sizes: unknown;

  demoForm: UntypedFormGroup;
  bootstrapSizes: { value: string; name: string }[];

  constructor(private fb: UntypedFormBuilder) {
    this.demoForm = fb.group({
      'width': fb.group({
        prefix: ['w-'],
        size: ['small-huge'],
      }),
      'height': fb.group({
        prefix: ['h-'],
        size: ['small-huge'],
      }),
      'max-width': fb.group({
        prefix: ['mw-'],
        size: ['100'],
      }),
      'max-height': fb.group({
        prefix: ['mh-'],
        size: ['100'],
      }),
    });

    this.bootstrapSizes = [
      { value: '25', name: '25%' },
      { value: '50', name: '50%' },
      { value: '75', name: '75%' },
      { value: '100', name: '100%' },
      { value: 'auto', name: 'Auto (default)' },
    ];
  }

  get highlight(): string {
    return '<div class="' + this.demoClass + '"></div>';
  }

  get demoClass(): string {
    return Object.keys(this.demoForm.value)
      .map(prop => this.getPrefix(prop) + this.getSize(prop))
      .join(' ');
  }

  getPrefix(prop: string): string {
    return this.demoForm.get(prop + '.prefix').value;
  }

  getSize(prop: string): string {
    return this.demoForm.get(prop + '.size').value;
  }
}
