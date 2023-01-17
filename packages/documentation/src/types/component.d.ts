/**
 * Add custom element types from stencil generated web components
 * to a react application:
 * https://github.com/ionic-team/stencil/issues/1636#issuecomment-558778543
 */

import { LocalJSX as HeaderJSX } from '@swisspost/internet-header/loader';
import { LocalJSX as ComponentJSX } from '@swisspost/design-system-components/loader';

type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], 'ref'> | HTMLAttributes<T>;
};

type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

type HeaderToReact<T = HeaderJSX.IntrinsicElements, U = HTMLElementTagNameMap> = StencilProps<T> &
  ReactProps<U>;

type ComponentToReact<T = ComponentJSX.IntrinsicElements, U = HTMLElementTagNameMap> =
  StencilProps<T> & ReactProps<U>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    interface IntrinsicElements extends HeaderToReact, ComponentToReact {}
  }
}
