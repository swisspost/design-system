import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker-demo',
  templateUrl: './timepicker-demo.component.html',
})
export class NgbTimepickerDemoComponent  {
  time: NgbTimeStruct;
}
