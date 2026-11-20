import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type InternetHeaderAttributes = {
  'project': string;
  'environment'?: 'int01' | 'int02' | 'prod';
  'language'?: 'de' | 'fr' | 'it' | 'en';
  'text-main': string;
  'text-menu': string;
  'text-change-language': string;
  'text-current-language': string;
  'text-current-user': string;
  'text-access-user-links': string;
  'text-user-links': string;
  'text-close': string;
  'text-back': string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'swisspost-internet-header': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
        InternetHeaderAttributes;
    }
  }
}
