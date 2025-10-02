export function generateReplacedClassMutations(
  classesMap: Array<{ old: string; new: string }>,
): Record<string, [string, string]> {
  return classesMap.reduce(
    (o, key) =>
      Object.assign(o, {
        [key.old]: [key.old, key.new],
      }),
    {},
  );
}
