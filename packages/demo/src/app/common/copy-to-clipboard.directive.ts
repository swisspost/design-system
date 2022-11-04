import { Directive, ElementRef, HostListener } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Directive({
  selector: 'code[appCopyToClipboard]'
})
export class CopyToClipboardDirective {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly clipboard: Clipboard
  ) {}

  @HostListener('click', ['$event']) private copyToClipboard(event: MouseEvent) {
    event.preventDefault();
    this.clipboard.copy(this.el.nativeElement.textContent);
  }
}
