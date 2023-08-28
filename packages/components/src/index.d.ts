import { JSXBase } from '@stencil/core/internal';

declare module '@stencil/core' {
  namespace JSXBase {
    interface HTMLAttributes<T> {
      popover?: string;
    }
  }
}
