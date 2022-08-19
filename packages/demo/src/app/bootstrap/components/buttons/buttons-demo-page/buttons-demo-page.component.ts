import { Component, OnInit } from '@angular/core';
const  codeTemplate = require('!!raw-loader!../buttons-demo/buttons-demo.component.html').default
@Component({
  selector: 'app-buttons-demo-page',
  templateUrl: './buttons-demo-page.component.html'
})
export class ButtonsDemoPageComponent  {

 codeTemplate = codeTemplate;

}
