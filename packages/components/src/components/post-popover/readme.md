# post-popover



<!-- Auto Generated Below -->


## Properties

| Property                          | Attribute              | Description                                                                                                                                                                                                                                                                                                                                                                               | Type                                                                                                                                                                 | Default     |
| --------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `arrow`                           | `arrow`                | Show a little indicator arrow                                                                                                                                                                                                                                                                                                                                                             | `boolean`                                                                                                                                                            | `true`      |
| `closeButtonCaption` _(required)_ | `close-button-caption` | Define the caption of the close button for assistive technology                                                                                                                                                                                                                                                                                                                           | `string`                                                                                                                                                             | `undefined` |
| `placement`                       | `placement`            | Defines the position of the popover relative to its trigger. Popovers are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries. For supported values and behavior details, see the [Floating UI placement documentation](https://floating-ui.com/docs/computePosition#placement). | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`     |


## Methods

### `hide() => Promise<void>`

Programmatically hide this popover

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Programmatically display the popover

#### Parameters

| Name     | Type          | Description                                                                  |
| -------- | ------------- | ---------------------------------------------------------------------------- |
| `target` | `HTMLElement` | An element with [data-popover-target="id"] where the popover should be shown |

#### Returns

Type: `Promise<void>`



### `toggle(target: HTMLElement, force?: boolean) => Promise<void>`

Toggle popover display

#### Parameters

| Name     | Type          | Description                                                                        |
| -------- | ------------- | ---------------------------------------------------------------------------------- |
| `target` | `HTMLElement` | An element with [data-popover-target="id"] where the popover should be anchored to |
| `force`  | `boolean`     | Pass true to always show or false to always hide                                   |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [post-popovercontainer](../post-popovercontainer)

### Graph
```mermaid
graph TD;
  post-popover --> post-popovercontainer
  style post-popover fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
