# post-menu-trigger



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description                                                                                       | Type     | Default     |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `for` _(required)_ | `for`     | ID of the menu element that this trigger is linked to. Used to open and close the specified menu. | `string` | `undefined` |


## Dependencies

### Used by

 - [post-breadcrumbs](../post-breadcrumbs)
 - [post-language-switch](../post-language-switch)
 - [post-user-menu](../post-user-menu)
 - [post-user-menu2](../post-user-menu2)
 - [post-user-menu3](../post-user-menu3)

### Graph
```mermaid
graph TD;
  post-breadcrumbs --> post-menu-trigger
  post-language-switch --> post-menu-trigger
  post-user-menu --> post-menu-trigger
  post-user-menu2 --> post-menu-trigger
  post-user-menu3 --> post-menu-trigger
  style post-menu-trigger fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
