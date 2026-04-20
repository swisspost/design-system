import type { AnyNode } from 'domhandler';
import type { Cheerio } from 'cheerio';

// Determine type of dynamic class attribute
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

export function isStringLiteral(value: string): boolean {
  const first = value[0],
    last = value.at(-1);
  return ['"', "'", '`'].includes(first) && first === last;
}

export function isObjectLiteral(value: string): boolean {
  return value.startsWith('{') && value.endsWith('}');
}

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

export function updateStringLiteral(value: string, oldClass: string, newClass: string): string {
  const quote = value[0];
  const inner = value.slice(1, -1);
  const parts = inner
    .split(/\s+/)
    .map(cls => (cls === oldClass ? newClass : cls))
    .filter(Boolean);
  return parts.length ? quote + parts.join(' ') + quote : '';
}

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