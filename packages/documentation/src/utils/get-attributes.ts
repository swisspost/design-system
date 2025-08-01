import { Args } from '@storybook/web-components-vite';

export const getAttributes = (args: Args, condition?: (arg: unknown) => boolean): Args => {
  const attrs: { [key: string]: unknown } = {};

  for (const key in args) {
    if (Object.hasOwn(args, key) && condition && condition(args[key])) {
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
