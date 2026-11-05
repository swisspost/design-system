import type { Args, ArgTypes } from '@storybook/web-components-vite';

/**
 * Storybook's URL format for args (`args=text:Hello;disabled:!true;color:!hex(f00)`), as the bare
 * preview (`iframe.html?args=…`) reads it. Docs pages don't read it, so the deep links of the docs
 * use the same format and `parseArgsParam` applies them.
 *
 * Like Storybook, only flat values are supported, and strings only with letters, digits, spaces,
 * `_` and `-`; other args are left out of the links.
 */

const SAFE_TEXT = /^[a-zA-Z0-9 _-]*$/;
const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const FUNCTION_COLOR =
  /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;

/**
 * Serializes the args that differ from `initialArgs`.
 */
export function stringifyArgsParam(args: Args, initialArgs: Args): string {
  return Object.entries(args)
    .filter(([key, value]) => SAFE_TEXT.test(key) && value !== initialArgs[key])
    .map(([key, value]) => {
      const encoded = encodeValue(value);
      return encoded === null ? null : `${key}:${encoded}`;
    })
    .filter(pair => pair !== null)
    .join(';');
}

/**
 * Parses an `args` param. Numbers and booleans written as plain text are converted when the arg is
 * declared (or initialized) as one.
 */
export function parseArgsParam(param: string, args: Args, argTypes: ArgTypes = {}): Args {
  const parsed: Args = {};

  param.split(';').forEach(pair => {
    const separator = pair.indexOf(':');
    if (separator < 1) return;

    const key = pair.slice(0, separator).trim();
    const value = decodeValue(pair.slice(separator + 1));
    const type = argTypes[key]?.type;
    const typeName = typeof type === 'string' ? type : type?.name;

    if (typeof value === 'string' && (typeName === 'number' || typeof args[key] === 'number')) {
      const number = Number(value);
      parsed[key] = Number.isNaN(number) ? value : number;
    } else if (
      typeof value === 'string' &&
      (typeName === 'boolean' || typeof args[key] === 'boolean')
    ) {
      parsed[key] = value === 'true';
    } else {
      parsed[key] = value;
    }
  });

  return parsed;
}

function encodeValue(value: unknown): string | null {
  if (value === undefined) return '!undefined';
  if (value === null) return '!null';
  if (typeof value === 'boolean') return `!${value}`;
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : null;
  if (typeof value !== 'string') return null;

  if (HEX_COLOR.test(value)) return `!hex(${value.slice(1)})`;
  if (FUNCTION_COLOR.test(value)) return `!${value.replace(/[\s%]/g, '')}`;
  return SAFE_TEXT.test(value) ? value : null;
}

function decodeValue(value: string): unknown {
  if (!value.startsWith('!')) return value;

  const special = value.slice(1);
  if (special === 'true') return true;
  if (special === 'false') return false;
  if (special === 'null') return null;
  if (special === 'undefined') return undefined;

  const hex = /^hex\(([0-9a-f]+)\)$/i.exec(special);
  if (hex) return `#${hex[1]}`;
  if (/^(rgba?|hsla?)\(/i.test(special)) {
    const [name, values] = special.split('(');
    const parts = values.replace(')', '').split(',');
    const withUnits = name.toLowerCase().startsWith('hsl')
      ? parts.map((part, index) => (index === 1 || index === 2 ? `${part}%` : part))
      : parts;
    return `${name}(${withUnits.join(', ')})`;
  }

  return value;
}
