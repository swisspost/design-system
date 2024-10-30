import { Args } from '@storybook/web-components';

export const getBannerClasses = (args: Args): string =>
  [
    'banner',
    args.type,
    args.fixed ? 'banner-fixed-bottom' : '',
    args.action ? 'banner-action' : '',
    args.noIcon ? 'no-icon' : '',
    args.show ? '' : 'd-none',
  ]
    .filter(c => c)
    .join(' ');
