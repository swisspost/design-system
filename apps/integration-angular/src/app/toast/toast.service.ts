import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  title?: string | null;
  message: string;
  variant: 'error' | 'success' | 'warning' | 'info';
  dismissible: boolean;
}

export interface ToastOptions {
  variant?: Toast['variant'];
  dismissible?: boolean;
  autoClose?: boolean;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextToastId = 0;

  showToaster(message: string, title?: string | null, options: ToastOptions = {}): void {
    const {
      variant = 'error',
      dismissible = true,
      autoClose = false,
      timeout = 6000, // minimum recommended time for auto-closing toasts
    } = options;
    const id = this.nextToastId++;
    this.toasts.update(toasts => [...toasts, { id, title, message, variant, dismissible }]);

    if (autoClose && timeout > 0) {
      setTimeout(() => this.close(id), timeout);
    }
  }

  close(id: number): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }
}
