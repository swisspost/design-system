---
'@swisspost/design-system-components': minor
---

Added `post-klp-login-widget` and `post-klp-login-widget-messages` to the generated list of component names. Both elements are therefore covered by the global `:not(:defined)` rule now, which keeps them invisible until they upgrade instead of briefly showing their slotted content. The space they occupy is unchanged, and without scripting they stay visible as before.
