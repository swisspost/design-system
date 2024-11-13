---
'@swisspost/internet-header': major
'@swisspost/design-system-components': major
---

Switched stencil hydrated flag from class (`hydrated`) to attribute (`data-hydrated`). This flag indicates when a component finished rendering on the page. If your tests relied on the class being present, please rewrite the selector to use the new attribute selector.
