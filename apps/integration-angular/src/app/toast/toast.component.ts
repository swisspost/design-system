import { Component, inject } from '@angular/core';
import { PostClosebutton } from '@swisspost/design-system-components-angular';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: 'toast.html',
  imports: [PostClosebutton],
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
