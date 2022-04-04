import { Component, OnInit } from '@angular/core';
const codeTemplate = require('!!raw-loader!../feedback-demo/feedback-demo.component.html').default;

@Component({
  selector: 'app-feedback-demo-page',
  templateUrl: './feedback-demo-page.component.html'
})
export class FeedbackDemoPageComponent  {
  codeTemplate = codeTemplate;
}
