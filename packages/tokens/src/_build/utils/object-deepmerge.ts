export type DeepMerged<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? T[K] extends object
        ? U[K] extends object
          ? DeepMerged<T[K], U[K]>
          : U[K]
        : U[K]
      : U[K]
    : K extends keyof T
      ? T[K]
      : never;
};

// This deepmerge function recursively combines two objects, prioritizing values from the second object and deeply merging nested objects
export default function deepmerge<T extends object, U extends object>(
  obj1: T,
  obj2: U,
): DeepMerged<T, U> {
  const result = { ...obj1 } as Record<string, any>;

  for (const key in obj2) {
    if (Object.hasOwn(obj2, key)) {
      const val1 = (obj1 as Record<string, any>)[key];
      const val2 = obj2[key as keyof U];

      const shouldMerge =
        typeof val1 === 'object' &&
        typeof val2 === 'object' &&
        val1 !== null &&
        val2 !== null &&
        !Array.isArray(val1) &&
        !Array.isArray(val2);

      if (shouldMerge) {
        result[key] = deepmerge(val1 as object, val2 as object);
      } else {
        result[key] = val2;
      }
    }
  }

  return result as DeepMerged<T, U>;
}
