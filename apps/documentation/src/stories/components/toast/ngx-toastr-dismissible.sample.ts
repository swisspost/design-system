import { ToastrService } from 'ngx-toastr';

export class ExampleComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess(): void {
    this.toastr.success('The task has been completed.', 'Success!', {
      toastClass: 'toast toast-success toast-dismissible',
      closeButton: true,
    });
  }
}
