import { Args } from '@storybook/web-components';

export const getAttributes = (args: Args, condition?: (arg: any) => boolean): Args => {
  const attrs: { [key: string]: any } = {};

  for (const key in args) {
    if (args.hasOwnProperty(key) && condition && condition(args[key])) {
      const attrKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

      // Cast boolean false to string, so it's displayed in the docs code block. False values are otherwise omitted
      attrs[attrKey] = args[key] === false ? 'false' : args[key];
      if (typeof args[key] === 'object') {
        attrs[attrKey] = JSON.stringify(args[key]);
      }
    }
  }

  return attrs;
};
