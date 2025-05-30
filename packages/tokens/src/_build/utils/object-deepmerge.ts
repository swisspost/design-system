type PlainObject = { [key: string]: unknown };

// Checks if object is of type PlainObject
function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default function deepmerge(obj1: PlainObject = {}, obj2: PlainObject = {}) {
  const result = { ...obj1 };

  for (let key in obj2) {
    result[key] =
      isPlainObject(obj2[key]) && isPlainObject(obj1[key])
        ? deepmerge(obj1[key], obj2[key])
        : obj2[key];
  }

  return result;
}
