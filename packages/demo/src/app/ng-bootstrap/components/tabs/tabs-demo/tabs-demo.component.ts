import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ngb-tabs-demo',
  templateUrl: './tabs-demo.component.html',
})
export class NgbTabsDemoComponent {
  @Input() tabsBg: string;
  @Input() contentBg: string;
  @Input() wrapperBg: string;
}
