import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-disabled',
  templateUrl: './button-disabled.component.html',
})
export class ButtonDisabledComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  get templateString() {
    return this.elementRef.nativeElement.innerHTML;
  }
}
