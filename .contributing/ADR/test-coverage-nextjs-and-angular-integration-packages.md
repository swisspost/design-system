# Test coverage definition for Next.js and Angular integration packages

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/6462>

We need a clear definition of what the Next.js and Angular integration packages should test, so coverage is consistent and focused on framework integration rather than duplicating component-level tests.

## Decision

The integration packages should cover the following.

### Basic integration checks

- Component renders and exists in the DOM
- Component is visible (not hidden by CSS)
- No errors originating from the tested component (not external sources):
  - Console errors
  - Runtime exceptions

### Framework-specific features

- **React/Next.js**: Verify component hydration (confirm client-side JavaScript has loaded and the component is interactive)

### Framework version compatibility (nice to have)

- Matrix test components across different framework versions (e.g. Angular 15/16/17, React 18/19)

## Consequences

Integration tests stay focused on framework wiring (rendering, visibility, hydration, and version compatibility) rather than re-testing component behavior that is already covered at the web-component level.
