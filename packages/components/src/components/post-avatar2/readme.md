# post-avatar



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute   | Description                                                                                                                          | Type     | Default     |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| `email`                  | `email`     | Defines the users email address associated with a gravatar profile picture.                                                          | `string` | `undefined` |
| `firstname` _(required)_ | `firstname` | Defines the users firstname.                                                                                                         | `string` | `undefined` |
| `lastname`               | `lastname`  | Defines the users lastname.                                                                                                          | `string` | `undefined` |
| `userid`                 | `userid`    | Defines the company internal userId.<div className="mb-4 banner banner-warning banner-sm">Can only be used on post.ch domains!</div> | `string` | `undefined` |


## Slots

| Slot        | Description                                  |
| ----------- | -------------------------------------------- |
| `"default"` | Slot for inserting a custom image as avatar. |


## Dependencies

### Used by

 - [post-user-menu2](../post-user-menu2)

### Graph
```mermaid
graph TD;
  post-user-menu2 --> post-avatar2
  style post-avatar2 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
