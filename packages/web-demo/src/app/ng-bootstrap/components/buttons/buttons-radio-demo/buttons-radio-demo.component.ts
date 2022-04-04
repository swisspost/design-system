import { Component } from '@angular/core';

enum Choice {
  LEFT,
  MIDDLE,
  RIGHT,
}

@Component({
  selector: 'app-radio-buttons-demo',
  templateUrl: './buttons-radio-demo.component.html'
})
export class NgbRadioButtonsDemoComponent {
    Choice = Choice;

    radioGroup = Choice.MIDDLE;
}
