import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { I18n } from './datepicker-localization.service';

const dpSimpleHtml =
  require('!!raw-loader!../datepicker-simple/datepicker-simple.component.html').default;
const dpSimpleHtmlLg =
  require('!!raw-loader!../datepicker-simple/datepicker-simple-lg.component.html').default;
const dpValidationHtml =
  require('!!raw-loader!../datepicker-validation/datepicker-validation.component.html').default;
const dpValidationHtmlLg =
  require('!!raw-loader!../datepicker-validation/datepicker-validation-lg.component.html').default;
const dpSimpleTs =
  require('!!raw-loader!../datepicker-simple/datepicker-simple-demo.component.ts').default;
const dpValidationTs =
  require('!!raw-loader!../datepicker-validation/datepicker-validation-demo.component.ts').default;
const localizationService = require('!!raw-loader!./datepicker-localization.service.ts').default;
const localizationDirective =
  require('!!raw-loader!./datepicker-title-localization.directive.ts').default;

@Component({
  selector: 'app-datepicker-demo-page',
  templateUrl: './datepicker-demo-page.component.html',
})
export class NgbDatepickerDemoPageComponent implements OnInit {
  dpSimpleHtml = dpSimpleHtml;
  dpSimpleHtmlLg = dpSimpleHtmlLg;
  dpValidationHtml = dpValidationHtml;
  dpValidationHtmlLg = dpValidationHtmlLg;
  dpSimpleTs = dpSimpleTs;
  dpValidationTs = dpValidationTs;
  localizationService = localizationService;
  localizationDirective = localizationDirective;

  form: UntypedFormGroup;
  sizes = ['sm', 'rg', 'md', 'lg'];

  constructor(private _i18n: I18n, private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      dpNavigation: ['arrows'],
      sizeRange: [3],
      sizeRangeSimple: [2],
    });
  }

  get sizeRangeSimple() {
    return this.form.get('sizeRangeSimple');
  }

  get dpNavigation() {
    return this.form.get('dpNavigation');
  }

  get sizeRange() {
    return this.form.get('sizeRange');
  }

  get dpValidationSize() {
    return this.sizes[this.form.get('sizeRange').value];
  }

  get dpSimpleSize() {
    return this.sizes[this.form.get('sizeRangeSimple').value];
  }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }
}
