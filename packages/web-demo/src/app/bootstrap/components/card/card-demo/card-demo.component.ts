import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.scss']
})
export class CardDemoComponent {
  @Input('image-path')
  public imagePath : string;

  constructor() {

   }
}
