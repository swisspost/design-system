# Contributing to the Angular Components Library

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md), where you can find instructions on how to set up the repository for contributing.

> **Note:** This package contains Angular wrapper components that are **automatically generated** from the web components in `/packages/components`. Do not manually edit the generated files in `src/stencil-generated/`.

## Development

Run the following commands from the repository root:

```bash
# Production build
pnpm components-angular:build
```

## Linting

```bash
# Check for lint errors
pnpm components-angular:lint

# Auto-fix lint errors
pnpm components-angular:lint:fix
```

## Updating Angular

To update the Angular version used by this library:

1. **Determine the target versions.** If you don't know which versions to use, generate a temporary app to get the correct dependency versions:

   ```bash
   pnpm dlx @angular/cli@latest new test-angular --directory=apps/test-angular
   pnpm --filter test-angular ng generate library test-library
   pnpm --filter test-angular ng add angular-eslint
   ```

   Then report all relevant versions from `apps/test-angular/package.json` to the `catalogs.angular` section in `pnpm-workspace.yaml`. Delete the temporary app once done:

   ```bash
   rm -rf apps/test-angular
   ```

2. **Install the new versions:**

   ```bash
   pnpm install
   ```

3. **Run migration schematics** to apply any code changes required by the new version:

   ```bash
   pnpm -r ng update @angular/core --migrate-only --from=<previousVersion> --to=<targetVersion>
   ```

   Replace `<previousVersion>` and `<targetVersion>` with the appropriate Angular major versions (e.g. `--from=21 --to=22`).

   > **Note:** The `-r` flag runs the migration schematics for **all** packages that have `@angular/core` as a dependency. If you only need to update this library, use:
   >
   > ```bash
   > pnpm components-angular:ng update @angular/core --migrate-only --from=<previousVersion> --to=<targetVersion>
   > ```
