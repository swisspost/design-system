import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { JSX as PostJSX } from '@swisspost/design-system-components';

type PostIntrinsicElements = {
  [Tag in keyof PostJSX.IntrinsicElements]: PostJSX.IntrinsicElements[Tag] &
    DetailedHTMLProps<HTMLAttributes<HTMLElementTagNameMap[Tag]>, HTMLElementTagNameMap[Tag]> & {
      class?: string;
    };
};

declare module 'react' {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends PostIntrinsicElements {}
  }
}
