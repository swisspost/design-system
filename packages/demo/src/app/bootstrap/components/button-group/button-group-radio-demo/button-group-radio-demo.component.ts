import { Component } from '@angular/core';

enum Choice {
  LEFT,
  MIDDLE,
  RIGHT,
}

@Component({
  selector: 'app-button-group-radio-demo',
  templateUrl: './button-group-radio-demo.component.html'
})
export class ButtonGroupRadioDemoComponent {
  Choice = Choice;

  radioGroup = Choice.MIDDLE;
}
