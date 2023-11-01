import { Directive, ElementRef, HostListener } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { forkJoin, fromEvent, take, timer } from 'rxjs';

@Directive({
  selector: 'code[appCopyToClipboard]',
})
export class CopyToClipboardDirective {
  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly clipboard: Clipboard,
  ) {}

  @HostListener('click', ['$event'])
  private copyToClipboard(event: MouseEvent) {
    event.preventDefault();

    const { nativeElement } = this.el;
    this.clipboard.copy(nativeElement.textContent);

    nativeElement.classList.add('copied');

    forkJoin([timer(1000), fromEvent(nativeElement, 'mouseleave').pipe(take(1))]).subscribe(() => {
      nativeElement.classList.remove('copied');
    });
  }
}
