# post-popover



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                                                                                               | Type                                                                                                                                                                 | Default |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `arrow`     | `arrow`     | Wheter or not to display a little pointer arrow                                                                                                                                                                                                                                                                           | `boolean`                                                                                                                                                            | `false` |
| `placement` | `placement` | Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement. Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'` |


## Events

| Event                | Description                                                                                          | Type                   |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------- |
| `postPopoverToggled` | Fires whenever the popover gets shown or hidden, passing the new state in event.details as a boolean | `CustomEvent<boolean>` |


## Methods

### `hide() => Promise<void>`

Programmatically hide this tooltip

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Programmatically display the tooltip

#### Returns

Type: `Promise<void>`



### `toggle(target: HTMLElement, force?: boolean) => Promise<boolean>`

Toggle tooltip display

#### Returns

Type: `Promise<boolean>`




## Shadow Parts

| Part        | Description |
| ----------- | ----------- |
| `"popover"` |             |


## Dependencies

### Used by

 - [post-popover](../post-popover)
 - [post-tooltip](../post-tooltip)

### Graph
```mermaid
graph TD;
  post-popover --> post-popovercontainer
  post-tooltip --> post-popovercontainer
  style post-popovercontainer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
