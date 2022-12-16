export function objectify (scss: object) {
  let output: { [key: string]: string; } = {};

  return Object
    .entries(scss)
    .reduce((object, [path, value]) => {
      let temp: any = object;

      path
        .split('_')
        .forEach((key: string, index: number, values: string[]) => {
          temp[key] = index === values.length - 1 ? value : temp[key] || {};
          temp = temp[key];
        });

      return object;  
    }, output);
};
