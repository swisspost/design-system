import { HTMLInputMaskElement } from 'imask';
import type { EventHandlers } from 'imask/esm/controls/mask-element';

const nativeValueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!;

// iMask adapter that bypasses the instance-level `input.value` override (which returns ISO strings)
// so iMask always works with locale-formatted display text.
export class NativeInputMaskElement extends HTMLInputMaskElement {
  allowEvents = false;

  private _inputEventSuppressor = (e: Event) => {
    if (this.allowEvents) return;
    if (!e.isTrusted) e.stopImmediatePropagation();
  };

  get value(): string {
    return nativeValueDescriptor.get!.call(this.input);
  }

  set value(val: string) {
    nativeValueDescriptor.set!.call(this.input, val);
  }

  bindEvents(handlers: EventHandlers): void {
    this.input.addEventListener('input', this._inputEventSuppressor, true);
    super.bindEvents(handlers);
  }

  unbindEvents(): void {
    this.input.removeEventListener('input', this._inputEventSuppressor, true);
    super.unbindEvents();
  }
}

export function getNativeValue(input: HTMLInputElement): string {
  return nativeValueDescriptor.get!.call(input);
}

export function setNativeValue(input: HTMLInputElement, val: string): void {
  nativeValueDescriptor.set!.call(input, val);
}
