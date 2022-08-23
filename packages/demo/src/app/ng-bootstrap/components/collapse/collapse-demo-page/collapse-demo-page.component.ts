import { Component, OnInit } from '@angular/core';
const codeTemplate = require('!!raw-loader!../collapse-demo/collapse-demo.component.html').default;

@Component({
  selector: 'app-ngb-collapse-demo-page',
  templateUrl: './collapse-demo-page.component.html'
})
export class NgbCollapseDemoPageComponent{

  codeTemplate = codeTemplate;
}
