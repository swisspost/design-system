type Scss = {
  [key: string]: string;
};

type Normalized = string | string[];

type Output = {
  [key: string]: Normalized | Output;
};

export function parse(scss: Scss) {
  return Object.entries(scss).reduce((object, [path, value]) => {
    let output: Output = object;

    path.split('_').forEach((key, i, values) => {
      const normalized: Normalized = /^\[.*\]$/.test(value)
        ? (JSON.parse(value) as string[])
        : value;
      const pathValue: Normalized | Output =
        i >= values.length - 1 ? normalized : output[key] || {};

      output[key] = pathValue;

      if (i < values.length) {
        output = output[key] as Output;
      }
    });

    return object;
  }, {});
}

export function formatAsMap(obj: object) {
  return JSON.stringify(obj, null, 2).replace(/[{[]/g, '(').replace(/[}\]]/g, ')');
}
