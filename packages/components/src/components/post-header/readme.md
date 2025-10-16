# post-header



<!-- Auto Generated Below -->


## Methods

### `toggleMobileMenu(force?: boolean) => Promise<void>`

Toggles the mobile navigation.

#### Parameters

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| `force` | `boolean` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot                     | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| `"default"`              | Custom controls or content, right aligned in the local header.                |
| `"global-login"`         | Holds the user menu or login button in the global header.                     |
| `"meta-navigation"`      | Holds an `<ul>` with meta navigation links.                                   |
| `"navigation-controls"`  | Custom controls, right aligned with the main navigation.                      |
| `"post-language-switch"` | Should be used with the `<post-language-switch>` component.                   |
| `"post-logo"`            | Should be used together with the `<post-logo>` component.                     |
| `"post-mainnavigation"`  | Has a default slot because it's only meant to be used in the `<post-header>`. |
| `"post-togglebutton"`    | Holds the mobile menu toggler.                                                |
| `"target-group"`         | Holds the list of buttons to choose the target group.                         |
| `"title"`                | Holds the application title.                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
