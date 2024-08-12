# post-avatar-picture



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute   | Description                             | Type                 | Default     |
| ------------------------ | ----------- | --------------------------------------- | -------------------- | ----------- |
| `email`                  | `email`     | Defines the users email address.        | `string`             | `undefined` |
| `firstname` _(required)_ | `firstname` | Defines the users firstname.            | `string`             | `undefined` |
| `lastname`               | `lastname`  | Defines the users lastname.             | `string`             | `undefined` |
| `size`                   | `size`      | Defines the size of the avatar-picture. | `"large" \| "small"` | `'large'`   |


## Dependencies

### Depends on

- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-avatar-picture --> post-icon
  style post-avatar-picture fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
