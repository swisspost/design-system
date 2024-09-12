# post-avatar



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute   | Description                                                                                                                       | Type                 | Default     |
| ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `email`                  | `email`     | Defines the users email address.                                                                                                  | `string`             | `undefined` |
| `firstname` _(required)_ | `firstname` | Defines the users firstname.                                                                                                      | `string`             | `undefined` |
| `lastname`               | `lastname`  | Defines the users lastname.                                                                                                       | `string`             | `undefined` |
| `size`                   | `size`      | Defines the size of the avatar.                                                                                                   | `"large" \| "small"` | `'large'`   |
| `userid`                 | `userid`    | Defines the company internal userId.<div className="mb-1 alert alert-warning alert-sm">Can only be used on post.ch domains!</div> | `string`             | `undefined` |


## Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
| `"default"` | Slot for inserting a custom image as avatar. |


## Dependencies

### Depends on

- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-avatar --> post-icon
  style post-avatar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
