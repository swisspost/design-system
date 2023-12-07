import { Directive } from '@angular/core';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { I18n, I18N_VALUES } from './datepicker-localization.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngbDatepicker]',
})
export class DatepickerTitleLocalizationDirective {
  constructor(private _i18n: I18n, private datepicker: NgbInputDatepicker) {
    const previousToggle = this.datepicker.toggle;
    this.datepicker.toggle = () => {
      previousToggle.bind(this.datepicker)();
      if (this.datepicker.isOpen()) {
        this.swapTitles();
      }
    };
  }

  swapTitles(): void {
    // @ts-ignore
    const el = this.datepicker._cRef.location.nativeElement as HTMLElement;
    const localization = I18N_VALUES[this._i18n.language];

    const selectMonth = el.querySelector('select[title="Select month"]');
    selectMonth?.setAttribute('title', localization.selectMonth);
    selectMonth?.setAttribute('aria-label', localization.selectMonth);

    const selectYear = el.querySelector('select[title="Select year"]');
    selectYear?.setAttribute('title', localization.selectYear);
    selectYear?.setAttribute('aria-label', localization.selectYear);

    const previousMonth = el.querySelector('button[title="Previous month"]');
    previousMonth.setAttribute('title', localization.previousMonth);
    previousMonth.setAttribute('aria-label', localization.previousMonth);

    const nextMonth = el.querySelector('button[title="Next month"]');
    nextMonth.setAttribute('title', localization.nextMonth);
    nextMonth.setAttribute('aria-label', localization.nextMonth);
  }
}
