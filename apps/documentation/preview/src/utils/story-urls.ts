import { type Globals, stringifyGlobals } from '@shared/globals';
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

export function storyUrl(storyId: string, options: StoryUrlOptions = {}): string {
  return previewUrl(storyId, 'story', {
    args: stringifyArgs(options.args ?? {}, options.initialArgs),
    globals: stringifyGlobals(options.globals ?? {}),
  });
}

export function stringifyArgs(
  args: Record<string, unknown>,
  initialArgs: Record<string, unknown> = {},
): string {
  return Object.entries(args)
    .filter(
      ([key, value]) =>
        key && STRING_REGEX.test(key) && !(key in initialArgs && initialArgs[key] === value),
    )
    .flatMap(([key, value]) => {
      const serialized = stringifyArg(value);
      return serialized === null ? [] : [`${key}:${serialized}`];
    })
    .join(';');
}

function stringifyArg(value: unknown): string | null {
  if (typeof value === 'string') return STRING_REGEX.test(value) ? value : null;
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : null;
  if (typeof value === 'boolean' || value === null || value === undefined) return `!${value}`;
  return null;
}

export function parseArgs(value: string): Record<string, ArgValue> {
  const args: Record<string, ArgValue> = {};

  value.split(';').forEach(pair => {
    const separator = pair.indexOf(':');
    if (separator < 1) return;

    const key = pair.slice(0, separator);
    // older links encoded the values twice
    const raw = decodeUrlComponent(pair.slice(separator + 1));
    if (!STRING_REGEX.test(key)) return;

    if (Object.hasOwn(SPECIAL_VALUES, raw)) args[key] = SPECIAL_VALUES[raw];
    else if (NUMBER_REGEX.test(raw)) args[key] = Number(raw);
    else if (STRING_REGEX.test(raw)) args[key] = raw;
  });

  return args;
}
