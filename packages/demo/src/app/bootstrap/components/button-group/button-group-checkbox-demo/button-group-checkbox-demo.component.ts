import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group-checkbox-demo',
  templateUrl: './button-group-checkbox-demo.component.html'
})
export class ButtonGroupCheckboxDemoComponent {
  checkBoxes = {
    left: true,
    middle: false,
    right: true,
  };
}
