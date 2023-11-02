import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-icon-buttons-text',
  templateUrl: './icon-buttons-text.component.html',
})
export class IconButtonsTextComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
