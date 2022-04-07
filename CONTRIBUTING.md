# Contributing

These contribution guidelines apply to this repository in general and describe how to set up and maintain the repository. You can find dedicated guidelines in each package.

- [Demo App](./packages/web-demo/README.md)
- [Web Styles](./packages/web-styles/CONTRIBUTING.md)
- [Angular Components (Intranet Header)](./packages/angular-components/projects/swisspost-intranet-header/CONTRIBUTING.md)

## Prerequisites
In order to be able to use `npm` commands, [node.js](https://nodejs.org/en/) v14+ needs to be installed on your machine.

We use [pnpm](https://pnpm.io/) to manage dependencies, so make sure you have it installed: `npm i -g pnpm`. To install dependencies for all packages in this repo, run `pnpm install` from the root. Adding a new dependency to a package is just a matter of running `pnpm add <PACKAGE_NAME>` in the current packages sub-folder.

## Setup
To set up the repository and install dependencies for all packages, run (at the root):
```bash
# If you haven't already
npm install -g pnpm

# Install dependencies, build local dependencies and finally link them correctly with lerna (this step wouldn't be necessary if https://github.com/pnpm/pnpm/issues/3901 was fixed)
pnpm run bootstrap

# Start the web-demo
pnpm start
```


## Accessibility

Swiss Post is guided by the standards of the Web Content Accessibility Guidelines (WCAG), Level AA.

The Web Content Accessibility Guidelines are a recommendation for designing accessible Internet content. They were developed by the World Wide Web Consortium’s (W3C) Web Accessibility Initiative. The Level AA guidelines set out the following requirements in particular:

1. Perceivability through text alternatives for images, subtitles for audio, ability to display content in different ways and change colour contrasts.

2. Operability through keyboard operation, colour contrasts, time limits for data entry, prevention of seizures and navigability.

3. Understandability through readability, predictability and assistance with entering data.

4. Robustness through compatibility with assistive technologies.

You can find more information about accessibility at the Swiss Post in our [accessibility statement](https://www.post.ch/en/pages/footer/accessibility-at-swiss-post).


## Submitting issues and requests

We're happy to receive your input. You can submit your issues at TODO: GitHub issues URL;. If you're rather looking for help, please reach out on our [support channel]() TODO: URL;.

When you're planning to work on bigger changes, please reach out to someone from the core team to plan your change before investing a lot of time.


## Branching

We base our workflow on the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching model. 
- The `main` branch is the currently released branch. Changes on this branch can be released immediately after merging or accumulated for grouping a set of changes if they belong together.
- Changes are done on branches based on `main` and merged back into `main`.
- Older releases live on their `release/x` branch. Fixes for old releases are based and merged back into the release branch.


## Pull requests

When submitting pull requests, make sure you checked the following points:
- Your changes are tested on browsers according to the [browser support list](./web-styles/.browserslistrc)
- Your changes are tested on multiple viewports, at least 320px - 1920px
- If you made significant changes to the design of a component, make sure at least someone from the [design team](https://github.com/orgs/swisspost/teams/design) is added as a reviewer
- Describe your changes in the PR description as detailed as possible
- Include a changeset if the changes in your PR should be released (run `pnpm changeset` and follow the instructions)


## Merging

We're using the [squash and merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits) strategy to create a readable git history and eventually use the commit messages in the changelog. The commit message must follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) rules as it is used for automatic versioning.


## Versioning

To automate versioning, [changesets](https://github.com/changesets/changesets) are used as one of the officially supported versioning mechanics with pnpm ([workflow documentation](https://pnpm.io/using-changesets)). 

Create a changeset with `pnpm changeset` and follow the CLI instructions and push the changeset markdown file to your pull request. Alternatively, the Changesets GitHub Bot will post a comment with a link where you can add a changeset to your PR.

To apply all changesets, run `pnpm changeset version`, usually on the `main` branch to prepare for a new release. This command will update the versions of the mentioned packages, update upstream dependencies and bump dependents. You're able to review the changes before committing and pushing.

## Releases

TODO: describe the release workflow with pnpm, lerna, changesets and github actions when the repo migration is done.





## License

By contributing your code, you agree to license your contribution under the [Apache 2.0](./LICENSE).

Licenses of third party packages that are bundled with any output (e.g. Bootstrap) need to be included in the output and delivered with the output code.
