---
'@swisspost/design-system-components': minor
'@swisspost/design-system-styles': patch
---

Removed the layout shift the login widget caused while the session was still being resolved. The widget now shows an avatar without initials until the platform answers, instead of showing the login link and then replacing it, and it no longer lays out every menu link at full width in the moment before the component upgrades. Added an `initial-state` property so consumers that already know the visitor is anonymous can render the login link right away.
