# post-menu



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                    | Type                                                                                                                                                                 | Default    |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `placement` | `placement` | Defines the placement of the popover according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'` |


## Events

| Event        | Description | Type                   |
| ------------ | ----------- | ---------------------- |
| `toggleMenu` |             | `CustomEvent<boolean>` |


## Methods

### `hide() => Promise<void>`

Programmatically hide this menu

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Programmatically display the menu

#### Parameters

| Name     | Type          | Description                                                            |
| -------- | ------------- | ---------------------------------------------------------------------- |
| `target` | `HTMLElement` | An element with [data-menu-target="id"] where the menu should be shown |

#### Returns

Type: `Promise<void>`



### `toggle(target: HTMLElement, force?: boolean) => Promise<void>`

Toggle menu display

#### Parameters

| Name     | Type          | Description                                                                  |
| -------- | ------------- | ---------------------------------------------------------------------------- |
| `target` | `HTMLElement` | An element with [data-menu-target="id"] where the menu should be anchored to |
| `force`  | `boolean`     | Pass true to always show or false to always hide                             |

#### Returns

Type: `Promise<void>`




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
