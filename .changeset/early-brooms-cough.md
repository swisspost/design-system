---
'@swisspost/design-system-components': major
---

Fixed the `post-accordion` and `post-accordion-item` styles, so that they fully meet the design requirements.
This allowed the `accordion-item` part to be removed from the `post-accordion-item` component as a small optimization. However, all relevant styles remain editable from outside the web-components, either by overriding the border styles on the `post-accordion` and `post-accordion-item` hosts, or by using the corresponding parts for the `post-accordion-item` trigger button and the body shadow elements (e.g. `::part(part-name) { ... }`).
