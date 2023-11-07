import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-modal-content',
  templateUrl: './modal-demo.content.html',
})
export class NgbModalDemoContentComponent {
  @Input() showLongContent = false;

  constructor(public activeModal: NgbActiveModal) {}
}
