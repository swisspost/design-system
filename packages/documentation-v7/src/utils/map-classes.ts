export function mapClasses(classObject: Record<string, boolean>): string {
  return Object.entries(classObject)
    .filter(([_newClass, shouldAddClass]) => shouldAddClass)
    .map(([newClass]) => newClass)
    .join(' ');
}
