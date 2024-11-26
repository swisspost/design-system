import { Args } from '@storybook/web-components';

export const getAlertClasses = (args: Args): string =>
  [
    'alert',
    args.type,
    args.fixed ? 'alert-fixed-bottom' : '',
    args.action ? 'alert-action' : '',
    args.noIcon ? 'no-icon' : '',
    args.show ? '' : 'd-none',
  ]
    .filter(c => c)
    .join(' ');
