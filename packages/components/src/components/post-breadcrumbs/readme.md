# post-breadcrumbs-new



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute    | Description                                                               | Type     | Default                   |
| ---------------------- | ------------ | ------------------------------------------------------------------------- | -------- | ------------------------- |
| `homeText`             | `home-text`  | The text label for the home breadcrumb item.                              | `string` | `'Home'`                  |
| `homeUrl` _(required)_ | `home-url`   | The URL for the home breadcrumb item.                                     | `string` | `undefined`               |
| `menuLabel`            | `menu-label` | The accessible label for the breadcrumb menu when items are concatenated. | `string` | `'More breadcrumb items'` |


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
  post-breadcrumbs --> post-icon
  post-breadcrumbs --> post-menu-trigger
  post-breadcrumbs --> post-menu
  post-breadcrumbs --> post-menu-item
  post-breadcrumbs --> post-breadcrumb-item
  post-menu --> post-popovercontainer
  post-breadcrumb-item --> post-icon
  style post-breadcrumbs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
