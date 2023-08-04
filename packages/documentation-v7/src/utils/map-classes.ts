/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

export function mapClasses(classObject: {[cssClass: string]: boolean}): string {
  return Object.entries(classObject).reduce((classes, [newClass, shouldAddClass]) => {
    return shouldAddClass ? `${classes} ${newClass}` : classes;
  }, '');
}
