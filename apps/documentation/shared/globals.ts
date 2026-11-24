interface GlobalDefinition {
  label: string;
  options: Record<string, string>;
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
} satisfies Record<string, GlobalDefinition>;

export type Globals = { [K in GlobalName]: GlobalValue<K> };
export type GlobalName = keyof typeof GLOBAL_DEFINITIONS;
export type GlobalValue<K extends GlobalName> = keyof (typeof GLOBAL_DEFINITIONS)[K]['options'];

export const GLOBAL_NAMES = Object.keys(GLOBAL_DEFINITIONS) as GlobalName[];

export const DEFAULT_GLOBALS: Globals = {
  theme: 'post',
  appearance: 'default',
  scheme: 'light',
  palette: 'default',
};

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

export function withoutDefaultValues(globals: Partial<Globals>): Partial<Globals> {
  return Object.fromEntries(
    GLOBAL_NAMES.filter(name => globals[name] && globals[name] !== DEFAULT_GLOBALS[name]).map(
      name => [name, globals[name]],
    ),
  );
}

export function stringifyGlobals(globals: Partial<Globals>): string {
  return Object.entries(withoutDefaultValues(globals))
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
}

export function parseGlobals(value: string, fallback?: Globals): Globals {
  const entries = value.split(';').map(pair => pair.split(':').map(part => part.trim()));
  return normalizeGlobals(Object.fromEntries(entries), fallback);
}
