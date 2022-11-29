/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import { Directive, OnInit, ElementRef, OnDestroy, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFormRange]',
})
export class FormRangeDirective implements OnInit, OnDestroy {
  private mutationObserver: MutationObserver;
  private controlSub: Subscription;

  constructor(
    private element: ElementRef,
    @Optional()
    private control: NgControl,
  ) {}

  private updateStyleProperties() {
    const elem: HTMLInputElement = this.element.nativeElement;
    elem.style.setProperty('--val', elem.value);
    elem.style.setProperty('--max', elem.getAttribute('max') || '100');
    elem.style.setProperty('--min', elem.getAttribute('min') || '0');
  }

  ngOnInit() {
    const elem: HTMLInputElement = this.element.nativeElement;
    this.updateStyleProperties();
    elem.addEventListener('input', () => {
      this.updateStyleProperties();
    });
    if (this.control) {
      this.controlSub = this.control.valueChanges.subscribe(() => {
        this.updateStyleProperties();
      });
    }
    // handle the changes of attributes values, note: can only be detected if setted by
    // elem.setAttribute.
    // elem.value = '42' will _not_ trigger the mutation observer
    this.mutationObserver = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          ['value', 'min', 'max'].indexOf(mutation.attributeName) >= 0
        ) {
          this.updateStyleProperties();
          break;
        }
      }
    });
    this.mutationObserver.observe(elem, { attributes: true });
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
    if (this.controlSub) {
      this.controlSub.unsubscribe();
    }
  }
}
