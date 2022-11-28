/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

export function camelToKebabCase(camelCaseString: string): string {
  return camelCaseString.replace(/([A-Z])/g, "-$1").toLowerCase();
}
