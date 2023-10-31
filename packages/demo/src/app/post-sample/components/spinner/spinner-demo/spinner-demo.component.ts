import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-demo',
  templateUrl: './spinner-demo.component.html',
})
export class SpinnerDemoComponent {
  @Input() small: boolean;
}
