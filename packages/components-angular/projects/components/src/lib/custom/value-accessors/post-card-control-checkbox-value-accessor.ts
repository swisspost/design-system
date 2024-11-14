import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  /* eslint-disable-next-line @angular-eslint/directive-selector */
  selector: 'post-card-control[type="checkbox"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PostCardControlCheckboxValueAccessorDirective,
      multi: true,
    },
  ],
})
export class PostCardControlCheckboxValueAccessorDirective implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {
    /**/
  };
  private onTouched: () => void = () => {
    /**/
  };
  protected lastValue: any;

  constructor(protected el: ElementRef) {}

  writeValue(value: any) {
    this.el.nativeElement.checked = this.lastValue = value === null ? false : value;
  }

  @HostListener('postChange', ['$event.detail.state'])
  handleChangeEvent(value: any) {
    this.onChange(value);
  }

  @HostListener('focusout')
  _handleBlurEvent() {
    this.onTouched();
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled;
  }
}
