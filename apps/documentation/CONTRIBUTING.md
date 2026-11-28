# Contributing to the Design System Documentation

These guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md), which explain how to set up the repository.

## Structure

The documentation consists of two apps:

- The **shell** provides the navigation, the search and the toolbar, and shows the documentation pages in an iframe.
- The **preview** is a Storybook that renders the pages.

## Development

Start the documentation from the repository root:

```bash
pnpm docs:start
```

This builds the packages the documentation depends on, then starts the shell on [localhost:9000](http://localhost:9000), which opens automatically, and the preview on [localhost:9001](http://localhost:9001).

### Dev mode

In dev mode, the navigation and the search list certain pages that are otherwise hidden.

To activate dev mode, add `?mode=dev` to any address. To turn it off again, add `?mode=default`. This choice is remembered.

## Writing pages

A page consists of a stories file (`*.stories.ts`) and a docs file (`*.docs.mdx`) next to it. The metadata of the stories file defines the page:

```ts
const meta: MetaComponent = {
  id: 'eb78afcb-ce92-4990-94b6-6536d5ec6af4',
  title: 'Components/Button',
  tags: ['package:styles', 'keyword:Call to Action'],
  // …
};
```

- `id` identifies the page and never changes. Give every new page a new UUID.
- `title` places the page in the navigation and defines its address: `Components/Form Input` is served at `/components/form-input`. Changing the title changes the address.

### Links

Link to other pages by ID, not by title: `/bookmark?page=<id>`, optionally followed by a `#hash`. These links will continue to work even if the title changes, with the shell automatically redirecting them to the readable address.

### Tags

| Tag               | Effect                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `package:<id>`    | Shows a link to a package on the page. The IDs are defined in `preview/src/data/packages.data.ts`. |
| `status:new`      | Shows a "New" tag for the page.                                                                    |
| `visibility:dev`  | Makes the page available in dev mode only. It stays reachable by its address.                      |
| `keyword:<words>` | Adds a keyword under which the page can be found in the search.                                    |

### Navigation

The first segment of a title is the root of the page, e.g. `Components` for `Components/Button`. How each root appears in the navigation is configured in `NAVIGATION` in `shell/src/config.ts`:

| Layout        | Effect                                                              |
| ------------- | ------------------------------------------------------------------- |
| `home`        | The pages are listed under the "Home" heading.                      |
| `collapsible` | The pages are listed in a collapsible section named after the root. |
| `flat`        | The pages are listed as top-level rows, without a heading.          |
| `hidden`      | The pages are not listed, but stay reachable by their address.      |

Roots that are not configured use `defaultRoot`.

### Story settings

Stories follow the theme, appearance, colour scheme and palette chosen in the toolbar. A story can force its own values with `globals`, e.g. `globals: { appearance: 'compact' }`.

## Tests

The end-to-end tests are written with [Cypress](https://www.cypress.io/) and live in `cypress/e2e/`. Run them from the repository root:

```bash
# Run all tests
pnpm docs:e2e

# Open the Cypress UI
pnpm docs:e2e:watch
```

Both commands start the documentation first. The tests run against the preview.
