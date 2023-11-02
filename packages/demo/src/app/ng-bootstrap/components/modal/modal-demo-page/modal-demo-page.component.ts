import { Component } from '@angular/core';
const modalTemplate = require('!!raw-loader!../modal-demo-content/modal-demo.content.html').default;
const modalTsTemplate =
  require('!!raw-loader!../modal-demo-content/modal-demo-content.component.ts').default;
const buttonsTemplate = require('!!raw-loader!../modal-demo/modal-demo.component.html').default;
const tsTemplate = require('!!raw-loader!../modal-demo/modal-demo.component.ts').default;

@Component({
  selector: 'app-ngb-modal-demo-page',
  templateUrl: './modal-demo-page.component.html',
})
export class NgbModalDemoPageComponent {
  modalTemplate = modalTemplate;
  buttonsTemplate = buttonsTemplate;
  tsTemplate = tsTemplate;
  modalTsTemplate = modalTsTemplate;
}
