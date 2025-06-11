---
'@swisspost/design-system-components': major
---

Improved `post-header` component responsive behavior for better mobile and desktop experience. Removed `postUpdateDevice` event as part of internal refactoring - if you were listening to this event in your application, you'll need to remove those event listeners.