/**
 * Blow up all possible args and create a long list of all possible combinations of args.
 * You can then pass this to a template to create a lot of different variations of stories.
 * Credit: https://stackoverflow.com/questions/43055569/all-combinations-of-of-an-object-with-array-values-for-its-keys
 *
 * @param variants List of args to blow up
 * @returns
 */
export const bombArgs = (variants: { [key: string]: unknown[] | undefined }) => {
  return (function recurse(keys): Array<{ [key: string]: unknown }> {
    if (!keys.length) return [{}];
    const result = recurse(keys.slice(1));
    const variantsArray = variants[keys[0]] ?? [];

    return variantsArray.reduce(
      (acc: Array<{ [key: string]: unknown }>, value) =>
        acc.concat(result.map((item: object) => Object.assign({}, item, { [keys[0]]: value }))),
      [],
    );
  })(Object.keys(variants));
};
