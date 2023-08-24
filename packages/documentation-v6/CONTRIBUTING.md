# Contributing to Design System Documentation

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md), where you can find instructions on how to set up the repository for contributing.

## Bundling the documentation

Run the following command to build the entire Storybook source files into the dist folder, making them available for developers.

```bash
# Production build
npm run build

# Rebuild on change
npm run start
```

## Visual tests

One picture says more than a thousand words.<br>
Thanks to [Percy](https://docs.percy.io/) and [cypress](https://www.cypress.io/), we're able to visually test almost anything that runs in a browser. It handles everything from capturing and rendering screenshots, to detecting and notifying your team of visual changes.

A few steps are required before you can run the script to create the snapshots.

1. Login to your [Percy Account](https://percy.io/).
2. Create a project or navigate to an existing one.
3. Copy your write-only percy token.
4. Open a console in the project root folder.
5. Register the following local environment variable:

```bash
# Windows node/bash/cmd
set PERCY_TOKEN={token}

# Windows powershell
$env:PERCY_TOKEN="{token}"

# Unix
export PERCY_TOKEN={token}
```

6. If you want to take snapshots from a localhost url, you need to allow unauthorized node-tls connections:

```bash
# Windows node/bash/cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0

# wWindows powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"

# Unix terminal
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

7. Create your cypress tests

```javascript
// packages/documentation/cypress/integration/example.spec.js

describe('Integration test with visual testing', function () {
  it('Loads the homepage', function () {
    // Load the page or perform any other interactions with the app.
    cy.visit('{url-under-test}');
    // Do other stuff (e.g. click button, etc.)
    // Take a snapshot for visual diffing
    cy.percySnapshot();
  });
});
```

8. Run script `pnpm --filter design-system-documentation storybook:snapshots`
9. Once the snapshots has been taken, you should see a new build online in your percy project.
