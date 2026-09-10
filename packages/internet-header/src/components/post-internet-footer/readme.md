# post-internet-footer

<!-- Auto Generated Below -->


## Properties

| Property                          | Attribute              | Description                             | Type     | Default     |
| --------------------------------- | ---------------------- | --------------------------------------- | -------- | ----------- |
| `textCookieSettings` _(required)_ | `text-cookie-settings` | Label for the "Cookie Settings" button. | `string` | `undefined` |
| `textFooter` _(required)_         | `text-footer`          | Visually hidden label for the footer.   | `string` | `undefined` |


## Dependencies

### Depends on

- post-footer

### Graph
```mermaid
graph TD;
  swisspost-internet-footer --> post-footer
  post-footer --> post-accordion
  post-footer --> post-accordion-item
  post-accordion-item --> post-collapsible-trigger
  post-accordion-item --> post-icon
  post-accordion-item --> post-collapsible
  style swisspost-internet-footer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
