# Contributing to the Angular Integration App

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md), where you can find instructions on how to set up the repository for contributing.

## Development

Run the following commands from the repository root:

```bash
# Start the dev server
pnpm apps-angular:start

# Production build
pnpm apps-angular:build
```

## End-to-end tests

This app uses [Playwright](https://playwright.dev/) for end-to-end testing.

```bash
# Run tests
pnpm apps-angular:e2e

# Run tests with UI
pnpm apps-angular:e2e:watch
```

## Linting

```bash
# Check for lint errors
pnpm apps-angular:lint

# Auto-fix lint errors
pnpm apps-angular:lint:fix
```

## Updating Angular

To update the Angular version used by this app:

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

   > **Note:** The `-r` flag runs the migration schematics recursively across **all** workspace packages that define a `ng` script in their `package.json`. If you only need to update this integration app, use:
   >
   > ```bash
   > pnpm apps-angular:ng update @angular/core --migrate-only --from=<previousVersion> --to=<targetVersion>
   > ```
