import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerModule } from '../datepicker.module';
import { DatepickerSimpleLgComponent } from '../datepicker-simple/datepicker-simple-lg.component';
import { By } from '@angular/platform-browser';
import { I18N_VALUES } from './datepicker-localization.service';

describe('DatepickerTitleLocalizationDirective', () => {
  let fixture: ComponentFixture<DatepickerSimpleLgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerSimpleLgComponent);
    fixture.detectChanges();
  });

  it('should localize previous month title and aria attribute', () => {
    fixture.debugElement
      .query(By.css('.ngb-dp-open'))
      .nativeElement.dispatchEvent(new Event('click'));
    expect(
      fixture.debugElement.query(By.css(`[aria-label="${I18N_VALUES.de.previousMonth}"]`)),
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css(`[title="${I18N_VALUES.de.previousMonth}"]`)),
    ).toBeTruthy();
  });
});
