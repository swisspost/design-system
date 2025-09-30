export function generateReplacedClassMessages(
  classesMap: Array<{ old: string; new: string }>,
): Record<string, string> {
  return classesMap.reduce(
    (o, key) =>
      Object.assign(o, {
        [key.old]: `The "${key.old}" class has been deleted. Please remove it or replace it with "${key.new}".`,
      }),
    {},
  );
}
