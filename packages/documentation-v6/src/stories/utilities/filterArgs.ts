import { Args } from '@storybook/react';

/**
 * Filter args using a custom filter function. Will also cast boolean false to string "false" because they are otherwise omitted in the code window.
 * @param obj A storybook args object
 * @param predicate A filter function returning a boolean. Return true if you want the arg to persist, false if you want to filter it out
 * @returns Filtered args object
 */
export const filterArgs = (obj: Args, predicate: (arg: any) => boolean): Args => {
  let result: Args = {},
    key;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      // Cast boolean false to string so it's displayed in the docs code block. False values are otherwise omitted
      result[key] = obj[key] === false ? 'false' : obj[key];
      if (typeof obj[key] === 'object') {
        result[key] = JSON.stringify(obj[key]);
      }
    }
  }

  return result;
};
