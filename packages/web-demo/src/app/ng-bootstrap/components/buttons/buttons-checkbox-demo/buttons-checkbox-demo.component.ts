import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-buttons-demo',
  templateUrl: './buttons-checkbox-demo.component.html'
})
export class NgbCheckboxButtonsDemoComponent {
    checkBoxes = {
      left: true,
      middle: false,
      right: true,
    };
}
