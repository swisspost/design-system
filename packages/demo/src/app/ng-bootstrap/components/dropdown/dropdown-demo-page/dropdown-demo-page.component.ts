import { Component, OnInit } from '@angular/core';
const codeTemplate = require('!!raw-loader!../dropdown-demo/dropdown-demo.component.html').default;

@Component({
  selector: 'app-ngb-dropdown-demo-page',
  templateUrl: './dropdown-demo-page.component.html'
})
export class NgbDropdownDemoPageComponent{

codeTemplate = codeTemplate;
}
