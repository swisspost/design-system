import { Component } from '@angular/core';
const cardDemo = require('!!raw-loader!../card-demo/card-demo.component.html').default;
const complexCardDemo =
  require('!!raw-loader!../complex-card-demo/complex-card-demo.component.html').default;
const postCardDemo =
  require('!!raw-loader!../post-card-demo/post-card-demo.component.html').default;

@Component({
  selector: 'app-card-demo-page',
  templateUrl: './card-demo-page.component.html',
})
export class CardDemoPageComponent {
  cardDemo = cardDemo;
  complexCardDemo = complexCardDemo;
  postCardDemo = postCardDemo;

  public imgPath: string = 'assets/images/computer-stuff.jpg';
}
