import { Component } from '@angular/core';

enum Choice { One, Two, Three, Four }

@Component({
  selector: 'app-button-group-radio-demo',
  templateUrl: './button-group-radio-demo.component.html',
})
export class ButtonGroupRadioDemoComponent {
  readonly Choice = Choice;
  radio = Choice.Two;
}
