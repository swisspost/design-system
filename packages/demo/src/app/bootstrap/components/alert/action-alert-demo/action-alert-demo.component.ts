import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-action-alert-demo',
  templateUrl: './action-alert-demo.component.html',
  styleUrls: ['./action-alert-demo.component.scss'],
})
export class ActionAlertDemoComponent implements AfterViewInit {
  @ViewChild('ex1', { static: true }) ex1: ElementRef;
  @ViewChild('ex2', { static: true }) ex2: ElementRef;
  @ViewChild('ex3', { static: true }) ex3: ElementRef;
  @ViewChild('ex1btn', { static: true }) ex1btnTxt: ElementRef;
  @ViewChild('ex2btn', { static: true }) ex2btnTxt: ElementRef;
  @ViewChild('ex3btn', { static: true }) ex3btnTxt: ElementRef;

  ngAfterViewInit(): void {
    this.toggleEx1();
    this.toggleEx2();
    this.toggleEx3();
  }

  toggleEx1() {
    if (this.ex1 != undefined) {
      const displayStyle = this.ex1.nativeElement.style.display;
      if (displayStyle != 'none') {
        this.ex1.nativeElement.style.display = 'none';
        this.setButtonText('Show Ex. 1', this.ex1btnTxt);
      } else {
        this.ex1.nativeElement.style.display = '';
        this.setButtonText('Hide Ex. 1', this.ex1btnTxt);
      }
    }
  }

  toggleEx2() {
    if (this.ex2 != undefined) {
      const displayStyle = this.ex2.nativeElement.style.display;
      if (displayStyle != 'none') {
        this.ex2.nativeElement.style.display = 'none';
        this.setButtonText('Show Ex. 2', this.ex2btnTxt);
      } else {
        this.ex2.nativeElement.style.display = '';
        this.setButtonText('Hide Ex. 2', this.ex2btnTxt);
      }
    }
  }

  toggleEx3() {
    if (this.ex3 != undefined) {
      const displayStyle = this.ex3.nativeElement.style.display;
      if (displayStyle != 'none') {
        this.ex3.nativeElement.style.display = 'none';
        this.setButtonText('Show Ex. 3', this.ex3btnTxt);
      } else {
        this.ex3.nativeElement.style.display = '';
        this.setButtonText('Hide Ex. 3', this.ex3btnTxt);
      }
    }
  }

  setButtonText(newText: string, buttonTxt: ElementRef) {
    if (buttonTxt != undefined) {
      buttonTxt.nativeElement.innerText = newText;
    }
  }
}
