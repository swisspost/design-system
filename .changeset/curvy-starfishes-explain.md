---
'@swisspost/web-styles': patch
---

Fixed storybook EBUSY-error which occured on a npm cache file, sometimes when starting storybook and everytime when saving new content. This error caused the webpack server to crach.
It's a workaround (for lack of alternative) and not a proper solution.
