import { Args } from '@storybook/web-components';

export const getAlertClasses = (args: Args): string =>
  [
    'alert',
    args.variant,
    args.icon !== 'null' ? `pi-${args.icon}` : '',
    args.noIcon ? 'no-icon' : '',
    args.dismissible ? 'alert-dismissible' : '',
    args.fixed ? 'alert-fixed-bottom' : '',
    args.action ? 'alert-action' : '',
    args.show ? '' : 'd-none',
  ]
    .filter(c => c)
    .join(' ');
