# post-breadcrumbs-parent



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                          | Type               | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----------- |
| `customItems` | `custom-items` | * Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has it's own navigation structure. | `Link[] \| string` | `undefined` |


## Dependencies

### Depends on

- [post-breadcrumbs](../post-breadcrumbs)
- [post-breadcrumb-item](../post-breadcrumb-item)

### Graph
```mermaid
graph TD;
  post-breadcrumbs-parent --> post-breadcrumbs
  post-breadcrumbs-parent --> post-breadcrumb-item
  post-breadcrumbs --> post-icon
  post-breadcrumbs --> post-menu-trigger
  post-breadcrumbs --> post-menu
  post-breadcrumbs --> post-menu-item
  post-breadcrumbs --> post-breadcrumb-item
  post-menu --> post-popovercontainer
  post-breadcrumb-item --> post-icon
  style post-breadcrumbs-parent fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
