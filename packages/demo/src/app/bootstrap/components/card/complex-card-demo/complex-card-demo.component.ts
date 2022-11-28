import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-complex-card-demo',
  templateUrl: './complex-card-demo.component.html',
})
export class ComplexCardDemoComponent {
  @Input()
  public imagePath: string;
}
