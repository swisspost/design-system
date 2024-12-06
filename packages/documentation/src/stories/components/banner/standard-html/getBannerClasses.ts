import { Args } from '@storybook/web-components';

export const getBannerClasses = (args: Args): string =>
  [
    'banner',
    args.type,
    args.action ? 'banner-action' : '',
    args.dismissible ? 'banner-dismissible' : '',
    args.noIcon ? 'no-icon' : '',
    args.show ? '' : 'd-none',
  ]
    .filter(c => c)
    .join(' ');
