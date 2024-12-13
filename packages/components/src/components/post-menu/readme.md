# post-menu



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                                                                                                                                                                                                                                               | Type                                                                                                                                                                 | Default    |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `isLanguageSwitch` | `is-language-switch` | Whether or not the post-menu is used within a post-language-switch component as the children structure is not the same.                                                                                                                                                                                                   | `boolean`                                                                                                                                                            | `false`    |
| `placement`        | `placement`          | Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement. Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'` |


## Events

| Event        | Description                                                                                                                          | Type                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `toggleMenu` | Emits when the menu is shown or hidden. The event payload is a boolean: `true` when the menu was opened, `false` when it was closed. | `CustomEvent<boolean>` |


## Methods

### `hide() => Promise<void>`

Hides the popover menu and restores focus to the previously focused element.

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Displays the popover menu, focusing the first menu item.

#### Parameters

| Name     | Type          | Description                                                                |
| -------- | ------------- | -------------------------------------------------------------------------- |
| `target` | `HTMLElement` | - The HTML element relative to which the popover menu should be displayed. |

#### Returns

Type: `Promise<void>`



### `toggle(target: HTMLElement) => Promise<void>`

Toggles the menu visibility based on its current state.

#### Parameters

| Name     | Type          | Description |
| -------- | ------------- | ----------- |
| `target` | `HTMLElement` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [post-language-switch](../post-language-switch)

### Depends on

- [post-popovercontainer](../post-popovercontainer)

### Graph
```mermaid
graph TD;
  post-menu --> post-popovercontainer
  post-language-switch --> post-menu
  style post-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
