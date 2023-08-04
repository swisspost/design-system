/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

export function mapClasses(classObject: {[cssClass: string]: boolean}): string {
  return Object.entries(classObject)
    .filter(([_newClass, shouldAddClass]) => shouldAddClass)
    .map(([newClass]) => newClass)
    .join(' ');
}
