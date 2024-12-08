# post-breadcrumbs-new



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type     | Default     |
| ---------- | ----------- | ----------- | -------- | ----------- |
| `homeText` | `home-text` |             | `string` | `'Home'`    |
| `homeUrl`  | `home-url`  |             | `string` | `undefined` |


## Dependencies

### Depends on

- [post-icon](../post-icon)
- [post-menu-trigger](../post-menu-trigger)
- [post-menu](../post-menu)
- [post-menu-item](../post-menu-item)
- [post-breadcrumb-item](../post-breadcrumb-item)

### Graph
```mermaid
graph TD;
  post-breadcrumb --> post-icon
  post-breadcrumb --> post-menu-trigger
  post-breadcrumb --> post-menu
  post-breadcrumb --> post-menu-item
  post-breadcrumb --> post-breadcrumb-item
  post-menu --> post-popovercontainer
  post-breadcrumb-item --> post-icon
  style post-breadcrumb fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
