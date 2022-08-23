import { Component, OnInit } from '@angular/core';
const  codeTemplate = require('!!raw-loader!../typography-demo/typography-demo.component.html').default
@Component({
  selector: 'app-typography-demo-page',
  templateUrl: './typography-demo-page.component.html'
})
export class TypographyDemoPageComponent  {
  codeTemplate = codeTemplate;
}
