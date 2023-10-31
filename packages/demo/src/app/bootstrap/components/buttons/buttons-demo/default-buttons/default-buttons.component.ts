import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-default-buttons',
  templateUrl: './default-buttons.component.html',
})
export class DefaultButtonsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  get templateString() {
    return this.elementRef.nativeElement.innerHTML;
  }
}
