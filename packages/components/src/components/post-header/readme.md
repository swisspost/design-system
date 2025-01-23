# post-header



<!-- Auto Generated Below -->


## Events

| Event              | Description                                  | Type               |
| ------------------ | -------------------------------------------- | ------------------ |
| `postUpdateDevice` | An event emitted when the device has changed | `CustomEvent<any>` |


## Methods

### `toggleMobileMenu() => Promise<void>`

Toggles the mobile navigation.

#### Returns

Type: `Promise<void>`




## Slots

| Slot                     | Description                                                                   |
| ------------------------ | ----------------------------------------------------------------------------- |
| `"default"`              | Custom controls or content, right aligned in the local header.                |
| `"meta-navigation"`      | Holds an `<ul>` with meta navigation links.                                   |
| `"post-language-switch"` | Should be used with the `<post-language-switch>` component.                   |
| `"post-logo"`            | Should be used together with the `<post-logo>` component.                     |
| `"post-mainnavigation"`  | Has a default slot because it's only meant to be used in the `<post-header>`. |
| `"post-togglebutton"`    | Holds the mobile menu toggler.                                                |
| `"title"`                | Holds the application title.                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
