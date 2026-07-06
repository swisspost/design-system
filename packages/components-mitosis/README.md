# @swisspost/design-system-components-mitosis

Mitosis component sources for the Swiss Post Design System. Components are authored once as
[Mitosis](https://mitosis.builder.io/) `*.lite.tsx` files in `src/` and compiled to framework-specific
outputs in `dist/`.

## Scripts

| Script          | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `pnpm build`    | Clean and compile the Mitosis sources to the configured targets |
| `pnpm start`    | Compile in watch mode                                            |
| `pnpm clean`    | Remove the `dist/` output folder                                |
| `pnpm lint`     | Lint the Mitosis sources                                        |
| `pnpm lint:fix` | Lint and auto-fix the Mitosis sources                           |

## Configuration

Output targets and Mitosis options are configured in [`mitosis.config.cjs`](./mitosis.config.cjs).
See the [Mitosis configuration docs](https://mitosis.builder.io/docs/configuration/) for the full
list of available options and targets.

## Adding a component

1. Create a new `src/<name>/<name>.lite.tsx` file.
2. Export it from [`src/index.ts`](./src/index.ts).
3. Run `pnpm build` (or `pnpm start` for watch mode) to generate the framework outputs.
