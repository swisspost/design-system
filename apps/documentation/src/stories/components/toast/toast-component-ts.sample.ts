import { Component, inject } from '@angular/core';
import { PostClosebutton } from '@swisspost/design-system-components-angular';
import { ToastService } from './toast.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: 'toast.html',
  imports: [PostClosebutton, TranslatePipe],
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
