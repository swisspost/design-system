import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  /* eslint-disable-next-line @angular-eslint/directive-selector */
  selector: 'post-card-control[type="radio"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PostCardControlRadioValueAccessorDirective,
      multi: true,
    },
  ],
})
export class PostCardControlRadioValueAccessorDirective implements ControlValueAccessor {
  private onChange: (value: unknown) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };
  protected lastValue: unknown;

  constructor(protected el: ElementRef) {}

  writeValue(value: unknown) {
    this.el.nativeElement.checked = this.lastValue =
      this.el.nativeElement.value != value ? false : value;
  }

  @HostListener('postChange', ['$event.detail.value'])
  handleChangeEvent(value: unknown) {
    this.onChange(value);
  }

  @HostListener('focusout')
  _handleBlurEvent() {
    this.onTouched();
  }

  registerOnChange(fn: (value: unknown) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled;
  }
}
