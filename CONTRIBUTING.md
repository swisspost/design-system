# Contributing

These contribution guidelines apply to this repository in general and describe how to set up and maintain the repository. You can find dedicated guidelines in each package.

- [Angular Demo](./packages/demo/README.md)
- [Design System Styles](./packages/styles/CONTRIBUTING.md)
- [Angular Components (Intranet Header)](./packages/components-angular/projects/intranet-header/CONTRIBUTING.md)

## Prerequisites

In order to be able to use `npm` commands, [node.js](https://nodejs.org/en/) v16+ needs to be installed on your machine.

We use [pnpm](https://pnpm.io/) to manage dependencies, so make sure you have it installed: `npm i -g pnpm`. To install dependencies for all packages in this repo, run `pnpm install` from the root. Adding a new dependency to a package is just a matter of running `pnpm add <PACKAGE_NAME>` in the current packages sub-folder.

## Setup

To set up the repository and install dependencies for all packages, run (at the root):

```bash
# If you haven't already
npm install -g pnpm

# Install dependencies, build local dependencies and finally link them correctly
pnpm run bootstrap

# Start the design-system-documentation
pnpm start
```

Other root scripts are available for convenience:

### Development

Use these commands whenever you want to work on one of these packages. Ideally, these commands start a watcher for file changes and a GUI where you can see what changed for all relevant packages. The start scripts always assume that you previously ran `pnpm bootstrap` and therefore have all packages built on disk.

| Command                           | Description                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `pnpm start` or `pnpm docs:start` | starts the design-system-documentation storybook and the `start` scripts of all dependencies |
| `pnpm demo:start`                 | starts the demo Angular application and the `start` scripts of all dependencies              |
| `pnpm intranet-header:start`      | starts the intranet header demo application                                                  |
| `pnpm styles:start`               | starts the sass compiler                                                                     |
| `pnpm components:start`           | starts the stencil compiler                                                                  |
| `pnpm header:start`               | starts the stencil compiler for the header                                                   |
| `pnpm icons:start`                | starts the http server for debugging downloaded icons                                        |

### Testing

For easy test runs, the following commands are available (not all packages might have all commands available).

| Command                               | Description                                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `pnpm test`                           | runs the `test` command for all packages recursively                                      |
| `pnpm [package shortname]:test`       | runs unit and end-to-end tests for the package in headless mode                           |
| `pnpm [package shortname]:unit`       | runs unit tests for the package                                                           |
| `pnpm [package shortname]:unit:watch` | runs unit tests in watch mode                                                             |
| `pnpm [package shortname]:e2e`        | starts a headless cypress run                                                             |
| `pnpm [package shortname]:e2e:watch`  | starts a headless storybook and opens the cypress application                             |
| `pnpm [package shortname]:snapshots`  | starts a headless storybook and runs visual regression tests                              |
| `pnpm [package shortname]:tdd`        | starts all test scripts in watch mode for test driven development (might blow up your pc) |

When adding new packages, a new root command can be added. The idea is to have an easy starting point and the command should start all services necessary for local development.

## Script naming conventions

Whenever we add new scripts to the package.json file, we follow the instructions below.

- A script name is all lowercase.
- A script name uses only letters, dashes and colons.
- A script name is short and descriptive.
- A default script name persist of one word only (e.g. `lint`).
- A non default script name is postfixed with it's characteristics (e.g. `lint:fix`).
- A non default script name for a specific tool is prefixed with the tool name (e.g. `storybook:serve`, `storybook:bulid`, etc.).
- A non default script name can contain more than one colon (e.g. `lint:fix:dry`, `stencil:test:watch`, etc.).

## Accessibility

Swiss Post is guided by the standards of the Web Content Accessibility Guidelines (WCAG) version 2.1.

The Web Content Accessibility Guidelines are a recommendation for designing accessible Internet content. They were developed by the World Wide Web Consortium’s (W3C) Web Accessibility Initiative. The guidelines set the following requirements in particular:

1. Perceivability through text alternatives for images, subtitles for audio, ability to display content in different ways and change colour contrasts.

2. Operability through keyboard operation, colour contrasts, time limits for data entry, prevention of seizures and navigability.

3. Understandability through readability, predictability and assistance with entering data.

4. Robustness through compatibility with assistive technologies.

You can find more information about accessibility at the Swiss Post in our [accessibility statement](https://www.post.ch/en/pages/footer/accessibility-at-swiss-post).

## Submitting issues and requests

We are happy to receive your input. You can submit your issues to our [GitHub repository](https://github.com/swisspost/design-system/issues). If you're rather looking for help, don't hesitate to open a discussion on [GitHub discussions](https://github.com/swisspost/design-system/discussions).

When you're planning to work on bigger changes, please reach out to someone from the core team to plan your change.

## Adding a new package to the monorepo

When a new package is added to the repo, a few things need to be taken care of.

- Follow the naming convention of new packages, described in the [discussion about renaming the design system](https://github.com/swisspost/design-system/discussions/304#discussioncomment-3426149)
- Add meta information like `author`, `description`, `repository`, `homepage`, `bugs` to the package.json
- Add a license, in most cases Apache-2.0 should be applied. If you are unsure, contact the legal department
- Add the `publishConfig` field with

  ```json
  {
    "publishConfig": {
      "access": "public"
    }
  }
  ```

  if you want to release the package on npm. If you do not want to release the package, add

  ```json
  {
    "private": true
  }
  ```

  to the package.json config. The publishConfig is necessary to be set explicitly because our packages are scoped with @siwsspost (https://docs.npmjs.com/creating-and-publishing-scoped-public-packages).

- If you are publishing from a `dist` folder, configure the `publishConfig` like so:

  ```json
  {
    "publishConfig": {
      "directory": "./dist",
      "linkDirectory": true,
      "access": "public|restricted"
    }
  }
  ```

  The `linkDirectory` is necessary for pnpm to correctly link the dist folder in the node_modules. Make sure you biuld the package before using it in GitHub Actions or local scripts.

  > ⚠ On publish, the `package.json` gets copied into the `./dist` folder. This leads to an incorrect publish path because npm now tries to publish from `./dist/dist`. You'll need a pre-publish script that removes the `directory` key from the `publishConfig` (see the [styles package pre-publish workflow](./packages/styles/gulpfile.js) for an example).

## Dev Server Ports

For some packages it's necessary to run multiple dev servers at the same time. To prevent port conflicts, the following ranges are given to each package. The ranges 9000 - 9400 are chosen for compatibility with [port ranges used by Browserstack](https://www.browserstack.com/question/39572).

### Default DevServer: 9000-9099

| Package        | Port |
| :------------- | ---: |
| Demo           | 9000 |
| IntranetHeader | 9001 |

### Storybook DevServers: 9200-9299

| Package       | Port |
| :------------ | ---: |
| Documentation | 9200 |
| Styles        | 9201 |
| Components    | 9203 |

### Storybook TestServers: 9300-9399

| Package       | Port |
| :------------ | ---: |
| Documentation | 9300 |
| Styles        | 9301 |
| Components    | 9303 |

## Branching

We base our workflow on the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching model.

- The `main` branch is the release branch. Changes on this branch should be ready for release. Releases can be shipped right after merging or can be accumulated to a set of changes if they belong together.
- Changes are done on feature-branches based on `main` and merged back into `main`.
- Older major releases live on their `release/x` branch. Fixes for old releases are based and merged back into the release branch.
- A future major release will live on the `next` branch

## Pull requests

When submitting pull requests, make sure you checked the following points:

- Your changes are tested on browsers according to the [browser support list](./packages/styles/.browserslistrc)
- Your changes are tested on multiple viewports, at least 320px - 1920px
- If you made significant changes to the design of a component, make sure that at least someone from the [design team](https://github.com/orgs/swisspost/teams/design) is added as a reviewer
- Describe your changes in the pull request description as detailed as possible
- Include a changeset if the changes in your pull request should be released and require an entry in the changelog (run `pnpm changeset` and follow the instructions)

## Testing

These testing guidelines are a loose set of rules that should be considered when writing tests for the Design System.

### Unit tests

Generally, `ts-jest` should be used for this kind of test. The styles package even has a custom jest transformer for sass files.

#### Do

- write unit tests for shared functionality or services that don't depend on any state (pure functions)
- run unit tests on every push to a pull request
- design your tests to run fast, 1-2 minute test runs are fine, investigate around 5 minutes, intervene above
- mock any data needed

#### Don't

- write unit tests to compare markup output of a component, you'll likely want to make a visual snapshot because the unit test won't catch styling issues
- write unit tests when the state of the piece of code depends on a browser environment, you'll likely want to write an integration test
- depend on any outside data source you don't control, e.g. an API

### Integration tests

For integration tests, cypress is available on the documentation package.

#### Do

- write integration tests for components to test their state or output, e.g. events or aria-attributes
- write integration tests for code that needs to run in a certain environment
- try to run integration tests on pull requests only if the component was updated
- run the full set of integration tests before releasing packages
- try to keep the run duration under 2-3 minutes, investigate under 6 minutes and intervene above

#### Don't

- try to catch visual bugs, you'll likely want to write a visual regression test
- test functions or services that don't need any specific environment to run, you'll likely want to write a unit test

### Visual regression tests

Percy from Browserstack is the tool of choice here and runs with cypress integration. This allows you to write cypress style tests to set up the page/component. As of now, we have 25'000 snaps per month, assuming 4 browsers on two widths leaves us with 3'100 tests per month. With ~200 components and variants this allows for up to **15 runs per month**. This should be more than enough to run before every release.

#### Do

- write visual regression tests for every component in every state
- run the complete suite of regression tests before releasing a package
- chose the relevant browsers and viewports carefully for each test

#### Don't

- run visual regression tests on every push on a pull request (as long as we don't have way more quota available)

## Merging

We're using the [squash and merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits) strategy to create a readable git history and reserve the possibility to use the commit messages in the changelog. The commit message must follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) rules as it may be used for automatic versioning.

## Versioning

**tldr;** Add a changeset when you want to inform package users about a change you made.

To automate versioning, [changesets](https://github.com/changesets/changesets) are used as one of the officially supported versioning mechanics with pnpm ([workflow documentation](https://pnpm.io/using-changesets)).

Create a changeset with `pnpm changeset` and follow the CLI instructions and push the changeset markdown file to your pull request. Alternatively, the Changesets GitHub Bot will post a comment with a link where you can add a changeset to your PR.

### When to add a changeset

Changesets indicate a change relevant to users of a package. The changeset also indicates the impact of the change in the form of [semantic versioning](https://semver.org/) (breaking change, new feature or bugfix). This information will show up in the changelog, as well as the description text in the changeset.

Using changesets enables us to automatically generate a changelog for every package while also maintaining control over what content ends up in the changelog. Changes like updates to the build system might be irrelevant to package users and therefore do not need a changeset.

## Releases

**tldr;** Merge the "chore(changesets): 🦋📦 publish packages ..." PR into `main`.

### Preparing a release

To make releases as painless as possible, the [changeset release action](https://github.com/changesets/action), a GitHub Action workflow available on the marketplace, is implemented. This action observes the `main` branch and reacts to new changesets being added via pull requests. Whenever a new changeset is discovered, the changeset action will open a pull request (titled "chore(changesets): 🦋📦 publish packages ..."). This pull request is a release preview because the action applies all changesets, updates the package versions accordingly and generates the changelogs.

### Publishing packages

Whenever this release preview pull request looks good, the packages are ready to be published to npm and the pull request can be merged into `main`. The changeset release action running on `main` will find no new changesets and attempt a publication. If there are packages with updated versions not yet published to npm, it will publish the current version. The last commit will be tagged and you're done for the day!

## Release settings

The changeset release action supports custom commands for both versioning and publishing. To be able to publish, the packages have to be built first, and to be able to version the packages, dependencies have to be installed first.

The custom commands can be found in the [root pacakge.json](./package.json) as `cahngeset:publish` and `changeset:version` and are used in the [release workflow](./.github/workflows/release.yaml).

## License

By contributing your code, you agree to license your contribution under the [Apache 2.0 License](./LICENSE).

Licenses of third party packages that are bundled with any output (e.g. Bootstrap) need to be included in the output and delivered with the output code.
