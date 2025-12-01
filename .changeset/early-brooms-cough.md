---
'@swisspost/design-system-components': major
---

Updated the `post-accordion` and `post-accordion-item` styles to fully align with the design specification.
As part of this cleanup, the `accordion-item` part has been removed from `post-accordion-item`. The component’s styles can now be customized directly by targeting the host or by using the exposed parts for the trigger button and body elements (e.g., `::part(post-accordion-body) { ... }`).
