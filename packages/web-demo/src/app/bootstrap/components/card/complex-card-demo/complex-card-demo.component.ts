import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-complex-card-demo',
  templateUrl: './complex-card-demo.component.html',
  styleUrls: ['./complex-card-demo.component.scss']
})
export class ComplexCardDemoComponent {
  @Input('image-path')
  public imagePath : string;

  constructor() { }
}
