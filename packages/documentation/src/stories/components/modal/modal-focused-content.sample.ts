import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal-content',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-header">
      <h4 id="modalTitle" class="modal-title">What is your name?</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss()"
      ></button>
    </div>
    <div class="modal-body">
      <input
        ngbAutofocus
        [(ngModel)]="name"
        type="text"
        class="form-control"
        aria-labelledby="modalTitle"
      />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close(name)">
        Validate
      </button>
    </div>
  `,
})
export class ModalComponent {
  name = '';

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngb-modal-component',
  standalone: true,
  template: `
    <button class="btn btn-secondary" (click)="open()">Open modal</button>
  `,
})
export class HostComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.result
      .catch(() => {
        console.error('Modal was dismissed.');
      })
      .then((name: string) => {
        console.info(`The name is: ${name}`);
      });
  }
}
