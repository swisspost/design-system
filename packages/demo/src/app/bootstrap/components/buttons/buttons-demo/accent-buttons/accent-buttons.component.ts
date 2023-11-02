import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-accent-buttons',
  templateUrl: './accent-buttons.component.html',
})
export class AccentButtonsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
