import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../rating-demo/rating-demo.component.html').default;

@Component({
  selector: 'app-ngb-rating-demo-page',
  templateUrl: './rating-demo-page.component.html',
})
export class NgbRatingDemoPageComponent {
  codeTemplate = codeTemplate;
}
