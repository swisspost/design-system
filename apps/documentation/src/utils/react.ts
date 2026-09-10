import { ReactNode } from 'react';

export function forEach(
  iterable: string[] | number[] | object,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  callback: ({ key, value }: { key: string; value: any }) => ReactNode | ReactNode[],
) {
  const input = Object.assign(iterable);

  return Object.entries(input).map(([key, value]) => callback({ key, value }));
}
