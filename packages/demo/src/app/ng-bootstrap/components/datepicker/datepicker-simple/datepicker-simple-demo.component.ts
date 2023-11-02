import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from '../datepicker-demo-page/datepicker-localization.service';

@Component({ template: '' })
export class DatepickerSimpleDemoComponent implements OnInit {
  form: UntypedFormGroup;

  @Input() inputSize: 'sm' | 'rg' | 'md' | 'lg';
  @Input() navigation: 'arrows' | 'select';

  constructor(private _i18n: I18n, private formBuilder: UntypedFormBuilder) {}

  @Input() set language(value: string) {
    this._i18n.language = value;
  }

  get simpleDatepicker() {
    return this.form.get('simpleDatepicker');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      simpleDatepicker: [null as NgbDateStruct],
    });
  }
}
