---
'@swisspost/design-system-components': patch
'@swisspost/design-system-components-angular': patch
---

Fixed an issue with dependency managemant around @stencil/core. This package no longer has to be installed as a dependency by projects using the Design System Components or Components Angular packages as it's now declared a dependency of the components package (was a devDependency before).
