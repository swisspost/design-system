import { Args } from '@storybook/web-components-vite';

export function hasGlobalLogin(args: Args): boolean {
  return !args.title && !args.jobs && args.postLogin;
}
