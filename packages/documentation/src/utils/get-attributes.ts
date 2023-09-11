import { Args } from '@storybook/web-components';

export function getAttributes(
  args: Args,
  condition: (arg: Args) => boolean = (args: Args) => !!args
): Args {
  return Object.fromEntries(
    Object
      .entries(args)
      .filter(([_key, value]) => condition(value))
      .map(([key, value]) => [
        key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
        typeof value === 'object' ? JSON.stringify(value) : value
      ])
  );
}
