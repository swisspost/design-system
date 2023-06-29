import { Args } from '@storybook/react';

export const getAlertClasses = (args: Args): string =>
  [
    'alert',
    args.variant,
    args.noIcon ? 'no-icon' : '',
    args.dismissible ? 'alert-dismissible' : '',
    args.fixed ? 'alert-fixed-bottom' : '',
    args.action ? 'alert-action' : '',
    args.show ? '' : 'd-none',
  ]
    .filter(c => c)
    .join(' ');
