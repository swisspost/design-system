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

# Install dependencies, build local dependencies and finally link them correctly with lerna (this step wouldn't be necessary if https://github.com/pnpm/pnpm/issues/3901 was fixed)
pnpm run bootstrap

# Start the design-system-demo
pnpm start
```

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

## Script name conventions

Whenever we add new scripts to the package.json file, we follow the instructions below.

- A script name is all lowercase.
- A script name uses only letters, numbers and semi-colons.
- A script name short and descriptive.
- A default script name persist of one word only (e.g. `lint`).
- A non default script name is post-fix which describes it's special characteristica (e.g. `lint:fix`).
- A non default script name for a specific tool, is pre-fixed with the toolname (e.g. `storybook:serve`, `storybook:bulid`, etc.).
- A non default script name can contain more than one semi-colon (e.g. `lint:fix:dry`, `stencil:test:watch`, etc.).

## Branching

We base our workflow on the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching model.

- The `main` branch is the release branch. Changes on this branch should be ready for release. Releases can be shipped right after merging or can be accumulated to a set of changes if they belong together.
- Changes are done on feature-branches based on `main` and merged back into `main`.
- Older releases live on their `release/x` branch. Fixes for old releases are based and merged back into the release branch.
- A future major release will live on the `next` branch

## Pull requests

When submitting pull requests, make sure you checked the following points:

- Your changes are tested on browsers according to the [browser support list](./packages/styles/.browserslistrc)
- Your changes are tested on multiple viewports, at least 320px - 1920px
- If you made significant changes to the design of a component, make sure that at least someone from the [design team](https://github.com/orgs/swisspost/teams/design) is added as a reviewer
- Describe your changes in the pull request description as detailed as possible
- Include a changeset if the changes in your pull request should be released and requires an entry in the changelog (run `pnpm changeset` and follow the instructions)

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
