import type { AnyNode } from 'domhandler';
import type { Cheerio } from 'cheerio';

// Dynamic class attribute type detection

export function getDynamicClassType(
  attrName: string,
  value: string | undefined,
  oldClass: string,
): { isClassBinding: boolean; isNgClass: boolean; isClass: boolean } {
  const escaped = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[^A-Za-z0-9_-])${escaped}([^A-Za-z0-9_-]|$)`);
  const hasExactClass = typeof value === 'string' && regex.test(value);

  return {
    isClassBinding: attrName === `[class.${oldClass}]`,
    isNgClass: attrName.toLowerCase() === '[ngclass]' && hasExactClass,
    isClass: attrName.toLowerCase() === '[class]' && hasExactClass,
  };
}

// Value type guards

export function isStringLiteral(value: string): boolean {
  const first = value[0],
    last = value.at(-1);
  return ['"', "'", '`'].includes(first) && first === last;
}

export function isObjectLiteral(value: string): boolean {
  return value.startsWith('{') && value.endsWith('}');
}

// One-to-one helpers (used by createClassUpdateRule)

export function getNewAttrValue(
  $node: Cheerio<AnyNode>,
  attrName: string,
  oldClass: string,
  newClass: string,
  value: string,
): string | null {
  if (isStringLiteral(value)) return updateStringLiteral(value, oldClass, newClass);
  if (isObjectLiteral(value)) {
    const rawAttr = $node.attr(attrName);
    if (!rawAttr) return null;
    return updateObjectLiteral(rawAttr, oldClass, newClass);
  }
  return null;
}

// Replaces the old class with the new class inside a string literal,
// e.g. "'foo m-tiny bar'" → "'foo m-12 bar'"
export function updateStringLiteral(value: string, oldClass: string, newClass: string): string {
  const quote = value[0];
  const inner = value.slice(1, -1);
  const parts = inner
    .split(/\s+/)
    .map(cls => (cls === oldClass ? newClass : cls))
    .filter(Boolean);
  return parts.length ? quote + parts.join(' ') + quote : '';
}

// Replaces the old class key with a new class key inside an object literal,
// e.g. "{'m-tiny': true}" → "{'m-12': true}"
export function updateObjectLiteral(
  rawAttr: string,
  oldClass: string,
  newClass: string,
): string | null {
  const sanitized = rawAttr.replace(/['"\s]/g, '');
  const inner = sanitized.slice(1, -1);
  const keys = inner.split(',').map(p => p.split(':')[0]);
  if (!keys.includes(oldClass)) return null;

  const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return rawAttr.replace(
    new RegExp(`(?<![\\w-])${escapedOldClass}(?![\\w-])`, 'g'),
    newClass ?? '',
  );
}

// One-to-many helpers (used by createResponsiveClassUpdateRule)

export function getNewAttrValueMulti(
  $node: Cheerio<AnyNode>,
  attrName: string,
  oldClass: string,
  newClasses: string[],
  value: string,
): string | null {
  if (isStringLiteral(value)) return updateStringLiteralMulti(value, oldClass, newClasses);
  if (isObjectLiteral(value)) {
    const rawAttr = $node.attr(attrName);
    if (!rawAttr) return null;
    return updateObjectLiteralMulti(rawAttr, oldClass, newClasses);
  }
  return null;
}

// Replaces the old class with multiple new classes inside a string literal,
// e.g. "'foo m-tiny-r bar'" → "'foo m-12 m-md-16 bar'"
export function updateStringLiteralMulti(
  value: string,
  oldClass: string,
  newClasses: string[],
): string {
  const quote = value[0];
  const inner = value.slice(1, -1);
  const parts = inner
    .split(/\s+/)
    .flatMap(cls => (cls === oldClass ? newClasses : [cls]))
    .filter(Boolean);
  return parts.length ? quote + parts.join(' ') + quote : '';
}

// Replaces the old class key with multiple new class keys inside an object literal,
// e.g. "{'m-tiny-r': true}" → "{'m-12': true, 'm-md-16': true}"
export function updateObjectLiteralMulti(
  rawAttr: string,
  oldClass: string,
  newClasses: string[],
): string | null {
  const sanitized = rawAttr.replace(/['"\s]/g, '');
  const inner = sanitized.slice(1, -1);
  const keys = inner.split(',').map(p => p.split(':')[0]);
  if (!keys.includes(oldClass)) return null;

  const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const keyPattern = new RegExp(`(['"]?)${escapedOldClass}\\1\\s*:\\s*([^,}]+)`);
  const match = rawAttr.match(keyPattern);
  if (!match) return null;

  const quote = match[1] || '';
  const val = match[2].trim();
  const replacement = newClasses.map(cls => `${quote}${cls}${quote}: ${val}`).join(', ');

  return rawAttr.replace(keyPattern, replacement);
}
