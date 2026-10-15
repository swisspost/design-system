---
'@swisspost/internet-header': minor
---

The user menu in the `post-login` slot is now rendered by the KLP login widget instead of by the header itself. The header no longer fetches the session; it only supplies the links, and the widget decides which of them the session may see.

This changes when the two switch entries appear. Previously the account switch was shown whenever the user could change either their profile or their company, so a B2B user with `canChangeCompany` saw both switches at once. The widget follows the KLP rules, where the two are mutually exclusive: the account switch requires `changeUserAndProfile: 'userAndProfile'`, and the company switch requires either a B2B user with `canChangeCompany` and no `changeUserAndProfile`, or `changeUserAndProfile: 'profile'`.

User menus configured directly in `localHeader.navigation` are unaffected — they have no KLP session and keep their previous behaviour.
