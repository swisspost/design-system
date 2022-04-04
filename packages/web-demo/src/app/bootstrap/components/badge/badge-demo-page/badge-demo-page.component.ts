import { Component, OnInit } from '@angular/core';
const  codeTemplate = require('!!raw-loader!../badge-demo/badge-demo.component.html').default
@Component({
  selector: 'app-badge-demo-page',
  templateUrl: './badge-demo-page.component.html'
})
export class BadgeDemoPageComponent  {
  codeTemplate = codeTemplate;

}
