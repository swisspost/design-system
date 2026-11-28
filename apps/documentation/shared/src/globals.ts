interface GlobalDefinition {
  label: string;
  options: Record<string, string>;
  /**
   * A hidden global has no menu and is never written into a shared URL, but a
   * URL can still set it.
   */
  hidden?: boolean;
}

export const GLOBAL_DEFINITIONS = {
  theme: {
    label: 'Theme',
    options: { post: 'Post', cargo: 'Cargo' },
  },
  appearance: {
    label: 'Appearance',
    options: { default: 'Default', compact: 'Compact', condensed: 'Condensed' },
  },
  scheme: {
    label: 'Color scheme',
    options: { light: 'Light', dark: 'Dark' },
  },
  palette: {
    label: 'Palette',
    options: { default: 'Default', alternate: 'Alternate', accent: 'Accent', brand: 'Brand' },
  },
  mode: {
    label: 'Mode',
    options: { default: 'Default', dev: 'Development' },
    hidden: true,
  },
} satisfies Record<string, GlobalDefinition>;

export type Globals = { [K in GlobalName]: GlobalValue<K> };
export type GlobalName = keyof typeof GLOBAL_DEFINITIONS;
export type GlobalValue<K extends GlobalName> = keyof (typeof GLOBAL_DEFINITIONS)[K]['options'];

// `Object.keys` is typed as `string[]`, as objects may have extra keys, but the
// definitions are a literal.
export const GLOBAL_NAMES = Object.keys(GLOBAL_DEFINITIONS) as GlobalName[];

/**
 * The globals that are not hidden.
 *
 * @see {GlobalDefinition.hidden}
 */
export const SHARABLE_GLOBAL_NAMES = GLOBAL_NAMES.filter(name => {
  const definition: GlobalDefinition = GLOBAL_DEFINITIONS[name];
  return !definition.hidden;
});

/**
 * The globals of shared URLs: the ones that differ from the defaults, without
 * the hidden ones.
 */
export const SHARABLE_GLOBALS_FILTER: GlobalsFilter = { defaultValues: false, hidden: false };

/**
 * The globals of deep links: all the sharable ones, so that a deep link never
 * depends on stored globals.
 */
export const DEEP_LINK_GLOBALS_FILTER: GlobalsFilter = { hidden: false };

export const DEFAULT_GLOBALS: Globals = {
  theme: 'post',
  appearance: 'default',
  scheme: 'light',
  palette: 'default',
  mode: 'default',
};

export class GlobalsChangeEvent extends Event {
  constructor(public readonly globals: Globals) {
    super('globals-change');
  }
}

export interface GlobalsEventMap {
  'globals-change': GlobalsChangeEvent;
}

export function isGlobalValue<K extends GlobalName>(
  name: K,
  value: unknown,
): value is GlobalValue<K> {
  return typeof value === 'string' && Object.hasOwn(GLOBAL_DEFINITIONS[name].options, value);
}

export function normalizeGlobals(
  input: Record<string, unknown>,
  fallback: Globals = DEFAULT_GLOBALS,
): Globals {
  const globals: Globals = { ...fallback };

  for (const name of GLOBAL_NAMES) {
    if (isGlobalValue(name, input[name])) {
      globals[name] = input[name];
    }
  }

  return globals;
}

export function compareGlobals(a: Globals, b: Globals): boolean {
  return GLOBAL_NAMES.every(name => a[name] === b[name]);
}

export interface GlobalsFilter {
  /** Keeps the globals that have their default value. */
  defaultValues?: boolean;
  /** Keeps the hidden globals. */
  hidden?: boolean;
}

/**
 * Leaves out the globals that the filter excludes, e.g.
 * `{ defaultValues: false }`. Both are kept by default.
 */
export function filterGlobals(globals: Partial<Globals>, filter: GlobalsFilter): Partial<Globals> {
  const names = GLOBAL_NAMES.filter(
    name =>
      globals[name] &&
      (filter.defaultValues !== false || globals[name] !== DEFAULT_GLOBALS[name]) &&
      (filter.hidden !== false || SHARABLE_GLOBAL_NAMES.includes(name)),
  );

  return Object.fromEntries(names.map(name => [name, globals[name]]));
}

export function stringifyGlobals(globals: Partial<Globals>): string {
  return Object.entries(filterGlobals(globals, { defaultValues: false }))
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
}

export function parseGlobals(value: string, fallback?: Globals): Globals {
  const entries = value.split(';').map(pair => pair.split(':').map(part => part.trim()));
  return normalizeGlobals(Object.fromEntries(entries), fallback);
}
