type DeepMerged<T, U> = T extends object
  ? U extends object
    ? {
        [K in keyof T | keyof U]: K extends keyof T
          ? K extends keyof U
            ? DeepMerged<T[K], U[K]>
            : T[K]
          : K extends keyof U
          ? U[K]
          : never;
      }
    : T & U
  : T & U;

export function deepmerge<T extends object, U extends object>(obj1: T, obj2: U): DeepMerged<T, U> {
  const result = { ...obj1 } as DeepMerged<T, U>;

  for (const key in obj2) {
    if (Object.hasOwn(obj2, key)) {
      const k = key as keyof (T | U);
      const val1 = obj1[k as keyof T];
      const val2 = obj2[k as keyof U];

      const shouldMerge =
        typeof val1 === 'object' &&
        typeof val2 === 'object' &&
        val1 !== null &&
        val2 !== null &&
        !Array.isArray(val1) &&
        !Array.isArray(val2);

      result[k as keyof DeepMerged<T, U>] = shouldMerge
        ? (deepmerge(val1, val2) as DeepMerged<T, U>[typeof k])
        : (val2 as DeepMerged<T, U>[typeof k]);
    }
  }

  return result;
}
