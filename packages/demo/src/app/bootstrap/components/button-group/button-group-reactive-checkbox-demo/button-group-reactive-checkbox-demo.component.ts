import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-group-reactive-checkbox-demo',
  templateUrl: './button-group-reactive-checkbox-demo.component.html',
})
export class ButtonGroupReactiveCheckboxDemoComponent {
  checkboxes: FormGroup;

  constructor(fb: FormBuilder) {
    this.checkboxes = fb.group({
      one: true,
      two: false,
      three: true,
      four: { value: false, disabled: true },
    });
  }
}
