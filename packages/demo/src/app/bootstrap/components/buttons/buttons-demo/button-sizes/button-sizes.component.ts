import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-sizes',
  templateUrl: './button-sizes.component.html',
})
export class ButtonSizesComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
