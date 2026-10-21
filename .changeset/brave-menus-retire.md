---
'@swisspost/internet-header': minor
---

Removed support for configuring a user menu in `localHeader.navigation`. Items in the local navigation are now always rendered as plain links. The user menu is rendered by the login widget in the `post-login` slot, and projects that need their own controls in the local navigation (such as a search, a country switch or a custom login) can place their own markup in the `local-nav` slot.
