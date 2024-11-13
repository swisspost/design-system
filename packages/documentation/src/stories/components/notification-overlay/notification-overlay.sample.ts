import { Component } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal-content',
  standalone: true,
  template: `template.html`,
  imports: [NgbModalModule],
})
export class NotificaionOverlayComponent {
  constructor(protected activeModal: NgbActiveModal) {}
}
