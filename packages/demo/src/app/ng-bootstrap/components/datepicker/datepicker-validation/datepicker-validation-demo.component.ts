import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {I18n} from '../datepicker-demo-page/datepicker-localization.service';

@Component({template: ''})
export class DatepickerValidationDemoComponent implements OnInit {
  form: FormGroup;
  navigation = 'arrows';

  @Input() inputSize: 'sm' | 'rg' | 'md' | 'lg';

  constructor(private _i18n: I18n,
              private formBuilder: FormBuilder) {
  }

  @Input() set language(value: string) {
    this._i18n.language = value;
  }

  get datepickerValidation() {
    return this.form.get('datePickerValidation');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      datePickerValidation: [null as NgbDateStruct, [Validators.required]],
    });
  }
}
