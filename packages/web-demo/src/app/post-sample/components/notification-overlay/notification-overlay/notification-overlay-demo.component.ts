import {Component} from '@angular/core';
import {NotificationOverlayContentComponent} from "../notification-overlay-content/notification-overlay-content";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-nofitication-overlay-demo',
  templateUrl: './notification-overlay-demo.component.html'
})
export class NotificationOverlayDemoComponent  {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(NotificationOverlayContentComponent);
    modalRef.componentInstance.name = 'World';
  }

}
