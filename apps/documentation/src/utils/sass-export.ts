export function parse(scss: object) {
  return Object.entries(scss).reduce((object, [path, value]) => {
    let output = object;

    path.split('_').forEach((key, i, values) => {
      const pathKey = key as keyof typeof output;
      const normalized = /^\[.*\]$/.test(value) ? JSON.parse(value) : value;
      const pathValue = i >= values.length - 1 ? normalized : output[pathKey] || {};

      output[pathKey] = pathValue as never;
      output = output[pathKey];
    });

    return object;
  }, {});
}

export function formatAsMap(obj: object) {
  return JSON.stringify(obj, null, 2).replace(/[{[]/g, '(').replace(/[}\]]/g, ')');
}
