export function forEach (iterable: any[] | object, callback: Function) {
  const input = Object.assign(iterable);

  return Object
    .entries(input)
    .map(([key, value]) => callback({ key, value }));
}
