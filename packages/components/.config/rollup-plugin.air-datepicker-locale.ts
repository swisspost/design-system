/**
 * Rollup plugin that converts air-datepicker CJS locale files to ESM on the fly.
 *
 * This prevents Stencil's internal @rollup/plugin-commonjs from processing them,
 * which causes `shouldTransformCachedModule` to deadlock during watch rebuilds.
 * Each locale remains its own separate lazy-loaded chunk.
 */
export function airDatepickerLocalePlugin() {
  const LOCALE_REGEX = /^air-datepicker\/locale\/(.+)$/;
  const VIRTUAL_PREFIX = '\0air-datepicker-locale:';

  return {
    name: 'air-datepicker-locale',

    resolveId(source: string) {
      const match = LOCALE_REGEX.exec(source);

      if (match) {
        return VIRTUAL_PREFIX + match[1];
      }

      return null;
    },

    load(id: string) {
      if (!id.startsWith(VIRTUAL_PREFIX)) return null;

      const locale = id.slice(VIRTUAL_PREFIX.length);
      // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
      const module = require(`air-datepicker/locale/${locale}`);
      const data = module.default || module;

      return `export default ${JSON.stringify(data)};`;
    },
  };
}
