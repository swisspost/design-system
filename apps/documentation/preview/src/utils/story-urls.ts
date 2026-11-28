import {
  filterGlobals,
  type Globals,
  SHARABLE_GLOBALS_FILTER,
  stringifyGlobals,
} from '@shared/globals';
import { decodeUrlComponent, previewUrl } from '@shared/urls';

export type ArgValue = string | number | boolean | null | undefined;

export interface StoryUrlOptions {
  args?: Record<string, unknown>;
  initialArgs?: Record<string, unknown>;
  globals?: Partial<Globals>;
}

const STRING_REGEX = /^[a-zA-Z0-9 _-]*$/;
const NUMBER_REGEX = /^-?[0-9]+(\.[0-9]+)?$/;

const SPECIAL_VALUES: Record<string, ArgValue> = {
  '!true': true,
  '!false': false,
  '!null': null,
  '!undefined': undefined,
};

type TextSerializer = (text: string) => string | null;

export function storyUrl(storyId: string, options: StoryUrlOptions = {}): string {
  return previewUrl(storyId, 'story', {
    args: serializeArgs(options.args ?? {}, options.initialArgs ?? {}, toStorybookText),
    globals: stringifyGlobals(filterGlobals(options.globals ?? {}, SHARABLE_GLOBALS_FILTER)),
  });
}

/**
 * Serializes the args for a deep link. `parseArgs` reads them back as they
 * were.
 */
export function stringifyArgs(
  args: Record<string, unknown>,
  initialArgs: Record<string, unknown> = {},
): string {
  return serializeArgs(args, initialArgs, toDeepLinkText);
}

export function parseArgs(value: string): Record<string, ArgValue> {
  const args: Record<string, ArgValue> = {};

  for (const pair of value.split(';')) {
    const separator = pair.indexOf(':');
    if (separator < 1) continue;

    const key = pair.slice(0, separator);
    const raw = pair.slice(separator + 1);
    if (!STRING_REGEX.test(key)) continue;

    if (Object.hasOwn(SPECIAL_VALUES, raw)) args[key] = SPECIAL_VALUES[raw];
    else if (NUMBER_REGEX.test(raw)) args[key] = Number(raw);
    // Text is encoded where needed. Legacy links encode every text.
    else args[key] = decodeUrlComponent(raw);
  }

  return args;
}

function serializeArgs(
  args: Record<string, unknown>,
  initialArgs: Record<string, unknown>,
  serializeText: TextSerializer,
): string {
  return Object.entries(args)
    .filter(
      ([key, value]) =>
        key && STRING_REGEX.test(key) && !(key in initialArgs && initialArgs[key] === value),
    )
    .flatMap(([key, value]) => {
      const serialized = serializeArg(value, serializeText);
      return serialized === null ? [] : [`${key}:${serialized}`];
    })
    .join(';');
}

function serializeArg(value: unknown, serializeText: TextSerializer): string | null {
  if (typeof value === 'string') return serializeText(value);
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : null;
  if (typeof value === 'boolean' || value === null || value === undefined) return `!${value}`;
  return null;
}

// Storybook reads the args of a story URL itself and only accepts plain text.
function toStorybookText(text: string): string | null {
  return STRING_REGEX.test(text) ? text : null;
}

function toDeepLinkText(text: string): string {
  // Text that reads as a number or a special value is told apart by its
  // escaped first character, e.g. `%3110` for the text "10".
  if (NUMBER_REGEX.test(text) || Object.hasOwn(SPECIAL_VALUES, text)) {
    return `%${text.charCodeAt(0).toString(16).toUpperCase()}${text.slice(1)}`;
  }

  return STRING_REGEX.test(text) ? text : encodeURIComponent(text);
}
