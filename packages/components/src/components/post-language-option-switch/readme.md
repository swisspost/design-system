# post-language-option-switch

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                | Type                   | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `caption`     | `caption`     | A title for the list                                                                                                                                       | `string`               | `undefined` |
| `description` | `description` | A descriptive text for the list                                                                                                                            | `string`               | `undefined` |
| `mode`        | `mode`        | Mode determines if the language-switch navigates to a different page or just emits events                                                                  | `"event" \| "link"`    | `'link'`    |
| `variant`     | `variant`     | Variant that determines the rendering of the language switch either as a list (used on mobile in the header) or a dropdown (used on desktop in the header) | `"dropdown" \| "list"` | `'list'`    |


## Dependencies

### Depends on

- [post-list](../post-list)
- [post-list-item](../post-list-item)
- [post-language-option](../post-language-option)
- [post-menu-trigger](../post-menu-trigger)
- [post-menu](../post-menu)
- [post-menu-item](../post-menu-item)

### Graph
```mermaid
graph TD;
  post-language-option-switch --> post-list
  post-language-option-switch --> post-list-item
  post-language-option-switch --> post-language-option
  post-language-option-switch --> post-menu-trigger
  post-language-option-switch --> post-menu
  post-language-option-switch --> post-menu-item
  post-menu --> post-popovercontainer
  style post-language-option-switch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
