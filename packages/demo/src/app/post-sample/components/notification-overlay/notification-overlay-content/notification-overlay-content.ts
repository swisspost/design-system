import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-overlay-demo-content',
  templateUrl: './notification-overlay.content.html',
})
export class NotificationOverlayContentComponent {
  @Input() name: string;

  constructor(public activeModal: NgbActiveModal) {}
}
