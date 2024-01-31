import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngb-modal-content',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss()"
      ></button>
    </div>
    <div class="modal-body">
      <p>Hello, {{ name }}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close()">Close</button>
    </div>
  `,
})
export class ModalComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngb-modal-component',
  standalone: true,
  template: `
    <button class="btn btn-secondary" (click)="open('foo')">Open with foo</button>
    <button class="btn btn-secondary" (click)="open('bar')">Open with bar</button>
  `,
})
export class HostComponent {
  constructor(private modalService: NgbModal) {}

  open(name: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = name;
  }
}
