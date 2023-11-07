import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

enum Choice {
  One,
  Two,
  Three,
  Four,
}

@Component({
  selector: 'app-button-group-reactive-radio-demo',
  templateUrl: './button-group-reactive-radio-demo.component.html',
})
export class ButtonGroupReactiveRadioDemoComponent {
  readonly Choice = Choice;
  radio = new FormControl(Choice.Two);
  fourthIsDisabled = true;
}
