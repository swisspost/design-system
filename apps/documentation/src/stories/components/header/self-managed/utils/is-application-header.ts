import { Args } from '@storybook/web-components-vite';

export function isApplicationHeader(args: Args): boolean {
  return (
    args.localNav &&
    !args.mainNav &&
    !args.targetGroup &&
    !args.globalNavPrimary &&
    !args.globalNavSecondary &&
    !args.postLogin
  );
}
