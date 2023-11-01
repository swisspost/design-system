import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-demo',
  templateUrl: './background-demo.component.html',
})
export class BackgroundDemoComponent {
  @Input() colorArray: string[];
  @Input() dropOpacity: boolean = false;
}
