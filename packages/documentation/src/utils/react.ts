export function forEach(
  iterable: any[] | object,
  callback: (data: { key: string; value: any }) => any[] | object,
) {
  const input = Object.assign(iterable);

  return Object.entries(input).map(([key, value]) => callback({ key, value }));
}
