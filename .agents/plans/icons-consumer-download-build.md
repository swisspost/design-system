# Expose icon download & build as a consumer CLI

## Problem
`packages/icons` downloads icons from Censhare (`src/fetch.ts`) and builds them (`src/utilities/build`). Consumers can't use it because:
- Only `public` and `dist` are published, scripts are TS run via `ts-node`
- Runtime libs (`dotenv`, `undici`, `svgo`, `node-html-parser`, `prettier`) are devDependencies
- Paths are hard-coded relative to the package root (`src/icons`, `public`, `dist/custom-properties`)

## Approach (minimal change)
Ship `src/fetch.ts` as a compiled bin. Secrets stay in env vars (`CEN_USERNAME`, `CEN_PASSWORD`, `CEN_URL_ICONSET_POST`, `CEN_URL_ICONSET_UI`, optional proxy vars). Output path via `--out <dir>`.

Usage: `npx post-icons-fetch --out ./icons`

### Output layout with `--out <dir>`
- `<dir>/source/{post,ui}` raw downloads + source reports
- `<dir>/post-icons/*.svg` built icons
- `<dir>/report.json`, `<dir>/report.min.json`
- `<dir>/custom-properties/*.css`

Without `--out`, all paths stay exactly as today, so `pnpm --filter design-system-icons fetchSVGs`, `build`, nodemon and `.github/workflows/fetch-icons*.yaml` keep working unchanged.

## Todos
1. **paths-from-cli** – In `src/utilities/constants.ts`, read `--out` from `process.argv` and derive `SOURCE_PATH`, `OUTPUT_PATH`, `OUTPUT_PATH_ICONS`, `OUTPUT_PATH_CSS` from it, defaults unchanged. No other source file needs to change since `iconsets.config.ts` and `build/index.ts` already consume these constants
2. **bin-build** – Add `tsconfig.bin.json` (extends `tsconfig.json`, `outDir: dist/bin`, includes `src/fetch.ts`, excludes tests). Keeps relative imports (`../../package.json`, `../../../svgo.config*`) valid in the output. Add `#!/usr/bin/env node` to `src/fetch.ts`. Append `&& tsc -p tsconfig.bin.json` to the `build` script
3. **package-json** – Add `"bin": { "post-icons-fetch": "dist/bin/src/fetch.js" }`, move `dotenv`, `undici`, `svgo`, `node-html-parser`, `prettier` to `dependencies` (prettier could stay a catalog dep)
4. **tests** – Unit test for `--out` path derivation in existing `src/utilities/__tests__` setup, verify it fails when the arg handling is removed
5. **docs** – README section "Download icons yourself" (env vars, `--out`, proxy), short note in CONTRIBUTING
6. **changeset** – minor for `@swisspost/design-system-icons`
7. **verify** – `pnpm --filter design-system-icons build`, `unit`, `typecheck`, `pnpm pack` and run the packed bin from a temp dir with `--out` (secrets from local `.env`)

## Notes
- `dotenv.config()` loads `.env` from the consumer's cwd, which is a convenient side effect
- Moving libs to `dependencies` increases install size for all consumers of the icons package, including those who only use the SVGs
- `fetch.ts` runs `setup()` which deletes `<out>/source` before downloading; built output dirs are also cleaned. Document that `--out` should be a dedicated folder
- Commit plan to `.agents/plans` per workflow instructions
