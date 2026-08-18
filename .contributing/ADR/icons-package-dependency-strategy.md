# Icons package dependency strategy

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/6235>

We're refactoring the `post-icon` mixin in [#6214](https://github.com/swisspost/design-system/pull/6214) to dynamically load icons as CSS files. This changes how the styles package interacts with the icons package, and we need to determine the appropriate dependency relationship.

Current state:

- Icons package is a `devDependency` in the styles package.
- The new `post-icon-load` mixin loads CSS from `@swisspost/design-system-icons/dist/custom-properties`.

The new dynamic loading approach means users need the icons package available at build time. However, we cannot make icons a regular dependency due to [pnpm issue #8338](https://github.com/pnpm/pnpm/issues/8338) — transitive dependencies are not installed when using `publishConfig.linkDirectory: true`. This means when packages like `internet-header` depend on styles, pnpm won't install the icons package, causing build failures.

Two viable approaches were evaluated:

### Option 1: Use peer dependencies

```json
"peerDependencies": {
  "@swisspost/design-system-icons": "workspace:10.0.0-next.48"
}
```

- **Pros**: Styles package itself is smaller; makes the icon dependency visible and intentional.
- **Cons**: Users must remember to install icons separately; Sass compilation breaks if the icons package is missing; cryptic "file not found" errors; version mismatches; existing users' builds break until they install icons.

### Option 2: Copy icons with build process (gulp task)

Similar to the existing token copying approach:

```js
gulp.task('copy-icon-files', () => {
  return gulp.src(['../icons/dist/**/*.css'])
    .pipe(gulp.dest('./src/icons/temp'));
});
```

- **Pros**: Solves the pnpm issue (self-contained package works in all environments); no external runtime dependencies; consistent with existing token handling; guaranteed availability during build; no breaking changes for consumers.
- **Cons**: Duplicates files across packages; larger package size; need to keep copied files in sync.

## Decision

Go with **Option 2**: copy the icons CSS files during the build process. It is the easiest solution and follows the way the token files are already implemented.

## Consequences

The styles package stays self-contained and builds reliably across all environments without requiring consumers to install the icons package separately, at the cost of some file duplication and larger package size that must be kept in sync.
