/**
 * The Storybook globals the documentation uses for its styles: theme, appearance, color scheme and palette.
 * Shared by the shell (toolbar, URL) and the preview (`.storybook/preview.ts`, `.storybook/helpers/shell-bridge.ts`),
 * so it must not import anything from either side.
 */

export const DOCS_GLOBALS = {
  theme: { label: 'Theme', options: { post: 'Post', cargo: 'Cargo' } },
  appearance: {
    label: 'Appearance',
    options: { default: 'Default', compact: 'Compact', condensed: 'Condensed' },
  },
  scheme: { label: 'Color Scheme', options: { light: 'Light', dark: 'Dark' } },
  palette: {
    label: 'Palette',
    options: { default: 'Default', alternate: 'Alternate', accent: 'Accent', brand: 'Brand' },
  },
} as const;

export type GlobalName = keyof typeof DOCS_GLOBALS;

export type DocsGlobals = { [K in GlobalName]: keyof (typeof DOCS_GLOBALS)[K]['options'] };

export const GLOBAL_NAMES = Object.keys(DOCS_GLOBALS) as GlobalName[];

export const DEFAULT_GLOBALS: DocsGlobals = {
  theme: 'post',
  appearance: 'default',
  scheme: 'light',
  palette: 'default',
};

export function isGlobalValue<K extends GlobalName>(
  name: K,
  value: unknown,
): value is DocsGlobals[K] {
  return typeof value === 'string' && Object.hasOwn(DOCS_GLOBALS[name].options, value);
}

/**
 * Picks the known globals with a valid value from `input`; everything else comes from `fallback`.
 */
export function normalizeGlobals(
  input: Record<string, unknown>,
  fallback: DocsGlobals = DEFAULT_GLOBALS,
): DocsGlobals {
  const globals = { ...fallback };
  GLOBAL_NAMES.forEach(name => {
    const value = input[name];
    if (isGlobalValue(name, value)) (globals as Record<GlobalName, string>)[name] = value;
  });
  return globals;
}

export function sameGlobals(a: DocsGlobals, b: DocsGlobals): boolean {
  return GLOBAL_NAMES.every(name => a[name] === b[name]);
}

/**
 * Parses Storybook's `globals` URL param (`theme:cargo;scheme:dark`).
 */
export function parseGlobalsParam(value: string): Record<string, string> {
  return Object.fromEntries(
    value
      .split(';')
      .map(pair => pair.split(':').map(part => part.trim()))
      .filter(([key, val]) => key && val),
  );
}

/**
 * The globals that differ from the defaults, as the query params of a shell URL
 * (`?theme=cargo&scheme=dark`).
 */
export function getGlobalsQueryParams(globals: DocsGlobals): Record<string, string> {
  return Object.fromEntries(
    GLOBAL_NAMES.filter(name => globals[name] !== DEFAULT_GLOBALS[name]).map(name => [
      name,
      globals[name],
    ]),
  );
}

/**
 * Serializes the globals that differ from the defaults in Storybook's `globals` URL param format.
 */
export function stringifyGlobalsParam(globals: DocsGlobals): string {
  return GLOBAL_NAMES.filter(name => globals[name] !== DEFAULT_GLOBALS[name])
    .map(name => `${name}:${globals[name]}`)
    .join(';');
}

/**
 * The design-system stylesheet for a theme and appearance, e.g. `/styles/cargo-compact.css`.
 */
export function getStylesheetHref({ theme, appearance }: DocsGlobals): string {
  return `/styles/${theme}-${appearance}.css`;
}
