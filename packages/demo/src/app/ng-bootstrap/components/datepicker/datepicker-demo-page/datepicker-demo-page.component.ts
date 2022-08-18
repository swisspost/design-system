import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { I18n } from './datepicker-localization.service';
const dpSimpleHtml = require('!!raw-loader!../datepicker-simple/datepicker-simple.component.html').default;
const dpSimpleHtmlLg = require('!!raw-loader!../datepicker-simple/datepicker-simple-lg.component.html').default;
const dpValidationHtml = require('!!raw-loader!../datepicker-validation/datepicker-validation.component.html').default;
const dpValidationHtmlLg = require('!!raw-loader!../datepicker-validation/datepicker-validation-lg.component.html').default;
const dpSimpleTs = require('!!raw-loader!../datepicker-simple/datepicker-simple-demo.component.ts').default;
const dpValidationTs = require('!!raw-loader!../datepicker-validation/datepicker-validation-demo.component.ts').default;
const localizationService = require('!!raw-loader!./datepicker-localization.service.ts').default;

@Component({
  selector: 'app-datepicker-demo-page',
  templateUrl: './datepicker-demo-page.component.html'
})
export class NgbDatepickerDemoPageComponent implements OnInit {
  dpSimpleHtml = dpSimpleHtml;
  dpSimpleHtmlLg = dpSimpleHtmlLg;
  dpValidationHtml = dpValidationHtml;
  dpValidationHtmlLg = dpValidationHtmlLg;
  dpSimpleTs = dpSimpleTs;
  dpValidationTs = dpValidationTs;
  localizationService = localizationService;

  form: FormGroup;
  sizes = ['sm', 'rg', 'md', 'lg'];

  constructor(
    private _i18n: I18n,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dpNavigation: ['arrows'],
      sizeRange: [3],
      sizeRangeSimple: [2],
    });
  }

  get sizeRangeSimple() { return this.form.get('sizeRangeSimple'); }
  get dpNavigation() { return this.form.get('dpNavigation'); }
  get sizeRange() { return this.form.get('sizeRange'); }
  get dpValidationSize() { return this.sizes[this.form.get('sizeRange').value]; }
  get dpSimpleSize() { return this.sizes[this.form.get('sizeRangeSimple').value]; }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }
}
