---
'@swisspost/design-system-components': major
'@swisspost/design-system-documentation': patch
---

Updated the `post-login-widget`:

- The slot `unauthenticated` has been renamed to `login-link`.
- The slot `authenticated` has been renamed to `user-links` and should now only contain the links to show in the user menu (list of `post-menu-item`) when the user is authenticated. The trigger of the user menu with the avatar and user name is now handled internally by the component and should not be implemented by the consumer anymore.
- Added three required props for labels: `textUserMenu`, `textUserMenuTrigger` and `textCurrentUser`.
