import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contextual-buttons',
  templateUrl: './contextual-buttons.component.html',
})
export class ContextualButtonsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
