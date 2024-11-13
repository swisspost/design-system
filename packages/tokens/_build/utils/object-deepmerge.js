export default function deepmerge(obj1 = {}, obj2 = {}) {
  const result = { ...obj1 };

  for (let key in obj2) {
    result[key] =
      obj2[key] instanceof Object && obj1[key] instanceof Object
        ? deepmerge(obj1[key], obj2[key])
        : obj2[key];
  }

  return result;
}
