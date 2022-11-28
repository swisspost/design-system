import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
})
export class CardDemoComponent {
  @Input()
  public imagePath: string;
}
