# post-menu



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                    | Type                                                                                                                                                                 | Default    |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `placement` | `placement` | Defines the placement of the popover according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'` |


## Events

| Event        | Description                                                                                                                          | Type                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `toggleMenu` | Emits when the menu is shown or hidden. The event payload is a boolean: `true` when the menu was opened, `false` when it was closed. | `CustomEvent<boolean>` |


## Methods

### `hide() => Promise<void>`

Programmatically hide this menu

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Programmatically display the menu

#### Parameters

| Name     | Type          | Description |
| -------- | ------------- | ----------- |
| `target` | `HTMLElement` |             |

#### Returns

Type: `Promise<void>`



### `toggle(target: HTMLElement) => Promise<void>`

Programmatically toggle the menu visibility.
If the menu is currently visible, it will be hidden; otherwise, it will be shown.

#### Parameters

| Name     | Type          | Description |
| -------- | ------------- | ----------- |
| `target` | `HTMLElement` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                               |
| ----------- | ----------------------------------------- |
| `"default"` | Slot for placing content inside the menu. |


## Dependencies

### Depends on

- [post-popovercontainer](../post-popovercontainer)

### Graph
```mermaid
graph TD;
  post-menu --> post-popovercontainer
  style post-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
