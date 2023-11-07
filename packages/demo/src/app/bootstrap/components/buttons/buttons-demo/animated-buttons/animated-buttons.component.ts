import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-animated-buttons',
  templateUrl: './animated-buttons.component.html',
})
export class AnimatedButtonsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
