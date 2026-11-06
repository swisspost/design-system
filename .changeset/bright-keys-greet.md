---
'@swisspost/design-system-components': minor
---

Added the `post-klp-login-widget` component, which connects to the KLP session and shows either the login link or a user menu with the account or company switch, My profile, Messages with the number of unread messages, Settings and Log out. The entries link to the KLP pages of the selected `environment` and `language` by default, with the required `service` (and the optional `app`, which defaults to it, and `in-iframe`) as KLP application; each target can be replaced through a URL property such as `url-my-profile`, and each text, translated into German, French, Italian and English, through a slot such as `text-my-profile`. Custom entries, each a `post-menu-item`, placed in the default slot are listed between Settings and Log out.
