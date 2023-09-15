export function parse(scss: object) {
  let output: { [key: string]: any } = {};

  return Object.entries(scss).reduce((object, [path, value]) => {
    let temp: any = object;

    path.split('_').forEach((key: string, index: number, values: string[]) => {
      const isJsonArray = typeof value === 'string' && /^\[.*\]$/.test(value);
      const parsedValue = isJsonArray ? JSON.parse(value) : value;
      const v = index === values.length - 1 ? parsedValue : temp[key] || {};

      temp[key] = v;
      temp = temp[key];
    });

    return object;
  }, output);
}

export function formatAsMap(obj: object) {
  return JSON.stringify(obj, null, 2).replace(/[{\[]/g, '(').replace(/[}\]]/g, ')');
}
