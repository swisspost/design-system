---
"@swisspost/design-system-components": major
"@swisspost/design-system-components-react": major
"@swisspost/design-system-components-angular": major
---

Refactored `<post-tabs>` component:
- Renamed `post-tab-header` component to `post-tab-item`
- Renamed `panel` property to `name` in `post-tab-item` component
- Renamed `name` property to `for` in `post-tab-panel` component  
- Renamed `activePanel` property to `activeTab` in `post-tabs` component

BEFORE:

```html
<post-tabs active-panel="first">
  <post-tab-header panel="first">First tab</post-tab-header>
  <post-tab-header panel="second">Second tab</post-tab-header>
  <post-tab-header panel="third">Third tab</post-tab-header>

  <post-tab-panel name="first">
    This is the content of the first tab.
  </post-tab-panel>
  <post-tab-panel name="second">
    This is the content of the second tab.
  </post-tab-panel>
  <post-tab-panel name="third">
    This is the content of the third tab.
  </post-tab-panel>
</post-tabs>
```

AFTER:

```html
<post-tabs active-tab="first">
  <post-tab-item name="first">First tab</post-tab-item>
  <post-tab-item name="second">Second tab</post-tab-item>
  <post-tab-item name="third">Third tab</post-tab-item>

  <post-tab-panel for="first">
    This is the content of the first tab.
  </post-tab-panel>
  <post-tab-panel for="second">
    This is the content of the second tab.
  </post-tab-panel>
  <post-tab-panel for="third">
    This is the content of the third tab.
  </post-tab-panel>
</post-tabs>
```
