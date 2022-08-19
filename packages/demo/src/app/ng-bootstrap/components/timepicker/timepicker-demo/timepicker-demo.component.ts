import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker-demo',
  templateUrl: './timepicker-demo.component.html',
})
export class NgbTimepickerDemoComponent {
  time: NgbTimeStruct;

  ctrl = new FormControl(null, (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 12) {
      return { tooEarly: true };
    }

    if (value.hour > 14) {
      return { tooLate: true };
    }

    return null;
  });
}
