# post-header



<!-- Auto Generated Below -->


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
| ------------------------ | ----------------------------------------------------------------------------- |
| `"audience"`             | Holds the list of buttons to choose the target group.                         |
| `"global-nav-primary"`   | Holds search button in the global header.                                     |
| `"global-nav-secondary"` | Holds an `<ul>` with meta navigation links.                                   |
| `"language-menu"`        | Should be used with the `<post-language-switch>` component.                   |
| `"local-nav"`            | Holds controls specific to the current application.                           |
| `"main-nav"`             | Has a default slot because it's only meant to be used in the `<post-header>`. |
| `"post-login"`           | Holds the user menu or login button in the global header.                     |
| `"post-logo"`            | Should be used together with the `<post-logo>` component.                     |
| `"post-togglebutton"`    | Holds the burger menu toggler.                                                |
| `"title"`                | Holds the application title.                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
