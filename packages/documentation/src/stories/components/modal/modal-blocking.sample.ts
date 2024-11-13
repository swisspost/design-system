import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmation</h4>
    </div>
    <div class="modal-body">
      <p>Do you confirm?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">No</button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close(true)">Yes</button>
    </div>
  `,
})
export class ModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngb-modal-component',
  standalone: true,
  template: `
    <button class="btn btn-secondary" (click)="open()">Open Modal</button>
  `,
})
export class HostComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result
      .catch(() => {
        console.error('Modal dismissal is actually not be possible.');
      })
      .then((isConfirmed: boolean) => {
        console.info(`Confirmed? ${isConfirmed}`);
      });
  }
}
