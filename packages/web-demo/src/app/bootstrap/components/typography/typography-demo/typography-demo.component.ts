import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-typography-demo',
  templateUrl: './typography-demo.component.html'
})
export class TypographyDemoComponent  {
  @Input() isContinuous : boolean = false;
}
