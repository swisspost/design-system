import { Component, OnInit } from '@angular/core';
const codeTemplate = require('!!raw-loader!../typeahead-demo/typeahead-demo.component.html').default
@Component({
  selector: 'app-ngb-typeahead-demo-page',
  templateUrl: './typeahead-demo-page.component.html'
})
export class NgbTypeaheadDemoPageComponent {

 codeTemplate = codeTemplate;


}
