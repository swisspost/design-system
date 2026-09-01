---
'@swisspost/design-system-components': minor
---

The `<post-closebutton>` component now automatically detects and closes the nearest closable ancestor when clicked, with no explicit wiring required from the consumer.

It supports the following closable ancestors:

* An element with a `popover` attribute
* `<dialog>`
* `<post-collapsible>`
* `<post-accordion-item>`
* `<post-popover>`
* `<post-popovercontainer>`
* `<post-banner>`

