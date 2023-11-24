import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalDemoContentComponent } from '../modal-demo-content/modal-demo-content.component';

@Component({
  selector: 'app-ngb-modal-demo',
  templateUrl: './modal-demo.component.html',
})
export class NgbModalDemoComponent {
  constructor(private modalService: NgbModal) {}

  open(modalOptions?) {
    this.modalService.open(NgbModalDemoContentComponent, modalOptions);
  }

  openWithLongContent() {
    const modalRef = this.modalService.open(NgbModalDemoContentComponent);
    modalRef.componentInstance.showLongContent = true;
  }
}
