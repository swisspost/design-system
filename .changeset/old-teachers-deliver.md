---
'@swisspost/design-system-styles': major
'@swisspost/design-system-components-angular': major
'@swisspost/design-system-components-react': major
'@swisspost/design-system-components': major
---

Moved the file responsible for preventing flashes of unstyled content for components from the styles to the components package. The flashes occur when non-hydrated components are rendered before JavaScript has loaded on a client. These styles hide the non-hydrated component, preventing the flash.

**Changes:**
Removed: `@swispost/design-system-styles/components/not-defined.(scss|css)`
Added: `@swisspost/design-system-components/post-components/post-components.css`
Added: `@swisspost/design-system-components-angular/post-components.css`
Added: `@swisspost/design-system-components-react/post-components.css`
