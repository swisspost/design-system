import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-inverted-buttons',
  templateUrl: './inverted-buttons.component.html',
})
export class InvertedButtonsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
