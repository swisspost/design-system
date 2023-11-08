import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alert-demo',
  templateUrl: './alert-demo.component.html',
  styleUrls: ['./alert-demo.component.scss'],
})
export class AlertDemoComponent implements AfterViewInit {
  @ViewChild('dismissible', { static: true }) dismissible: ElementRef;
  @ViewChild('dismissibleBtn', { static: true }) dismissibleBtn: ElementRef;

  ngAfterViewInit(): void {
    this.toggleFixedAlert();
  }

  toggleFixedAlert() {
    if (this.dismissible != undefined) {
      const displayStyle = this.dismissible.nativeElement.style.display;
      if (displayStyle != 'none') {
        this.dismissible.nativeElement.style.display = 'none';
        this.setButtonText('Show fixed alert');
      } else {
        this.dismissible.nativeElement.style.display = '';
        this.setButtonText('Hide fixed alert');
      }
    }
  }

  setButtonText(newText: string) {
    if (this.dismissibleBtn != undefined) {
      this.dismissibleBtn.nativeElement.innerText = newText;
    }
  }
}
