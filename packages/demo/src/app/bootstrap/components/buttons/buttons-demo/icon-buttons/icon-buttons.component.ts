import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-icon-buttons',
  templateUrl: './icon-buttons.component.html',
})
export class IconButtonsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
