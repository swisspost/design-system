import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button-tags',
  templateUrl: './button-tags.component.html',
})
export class ButtonTagsComponent {
  elementRef: ElementRef;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }
}
