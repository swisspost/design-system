---
'@swisspost/design-system-documentation': minor
---

Read params `devModeEnabled` from URL to show docs in `development` mode.
- If the URL contains the parameter `?devModeEnabled=true`, it overrides `initialEnv` and sets the mode to `development`.
- If the URL parameter is not present, the mode falls back to the existing logic using the value from `localStorage` (`storedDevMode`).
- Updated the CI workflow to append `?devModeEnabled=true` to the generated preview URL to show the preview deploy runs in development mode.
