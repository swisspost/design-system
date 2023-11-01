import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.scss'],
})
export class ToastDemoComponent {
  toastOptions = {
    closeButton: false,
    timeOut: 5000,
    extendedTimeOut: 1000,
  };
  JSON = JSON;

  constructor(private toastr: ToastrService) {}

  showError() {
    this.toastr.error(null, 'Error w/o message', this.toastOptions);
  }
  showInfo() {
    this.toastr.info('Information w/o title', '', this.toastOptions);
  }
  showSuccess() {
    this.toastr.success('w/ message', 'Success', this.toastOptions);
  }
  showWarning() {
    this.toastr.warning('w/ message', 'Warning', this.toastOptions);
  }
}
