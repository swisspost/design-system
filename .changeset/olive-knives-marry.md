---
'@swisspost/design-system-components-angular': patch
---

Redefined the dependency to the web components package as a dependency instead of a peer dependency due to a [known bug in changesets](https://github.com/changesets/changesets/issues/1011) that causes major version bumps across all linked workspace packages if one of them is installed as a peer dependency.
