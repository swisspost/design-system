export function mapClasses(classObject: Record<string, boolean>): string {
  return Object.entries(classObject)
    .filter(([_newClass, shouldAddClass]) => shouldAddClass && _newClass !== 'null')
    .map(([newClass]) => newClass)
    .join(' ');
}
