# post-header

<!-- Auto Generated Below -->

## Properties

| Property                       | Attribute           | Description                          | Type     | Default     |
| ------------------------------ | ------------------- | ------------------------------------ | -------- | ----------- |
| `labelBurgerMenu` _(required)_ | `label-burger-menu` | The label of the burger menu button. | `string` | `undefined` |

## Methods

### `toggleBurgerMenu(force?: boolean) => Promise<void>`

Toggles the burger navigation menu.

#### Parameters

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| `force` | `boolean` |             |

#### Returns

Type: `Promise<void>`

## Slots

| Slot                     | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- | --- |
| `"audience"`             | Holds the list of buttons to choose the target group.                         |
| `"global-nav-primary"`   | Holds search button in the global header.                                     |
| `"global-nav-secondary"` | Holds an `<ul>` with meta navigation links.                                   |
| `"language-menu"`        | Should be used with the `<post-language-switch>` component.                   |
| `"local-nav"`            | Holds controls specific to the current application.                           |
| `"main-nav"`             | Has a default slot because it's only meant to be used in the `<post-header>`. |
| `"post-login"`           | Holds the user menu or login button in the global header.                     |
| `"post-logo"`            | Should be used together with the `<post-logo>` component.                     |     |
| `"title"`                | Holds the application title.                                                  |

## Dependencies

### Depends on

- [post-togglebutton](../post-togglebutton)
- [post-icon](../post-icon)

### Graph

```mermaid
graph TD;
  post-header --> post-togglebutton
  post-header --> post-icon
  style post-header fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
