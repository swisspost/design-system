# post-user-menu



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute     | Description                                                             | Type     | Default     |
| -------------------------- | ------------- | ----------------------------------------------------------------------- | -------- | ----------- |
| `caption` _(required)_     | `caption`     | A title for the user menu                                               | `string` | `undefined` |
| `description` _(required)_ | `description` | A descriptive text for the user avatar                                  | `string` | `undefined` |
| `user`                     | `user`        | An Object containing the personal data of the user currently logged-in. | `User`   | `undefined` |


## Dependencies

### Depends on

- [post-avatar](../post-avatar)
- [post-menu-trigger](../post-menu-trigger)
- [post-menu](../post-menu)

### Graph
```mermaid
graph TD;
  post-user-menu --> post-avatar
  post-user-menu --> post-menu-trigger
  post-user-menu --> post-menu
  post-menu --> post-popovercontainer
  style post-user-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
