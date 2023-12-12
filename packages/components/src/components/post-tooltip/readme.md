# post-tooltip



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                                                                                                                                                                               | Type                                                                                                                                                                 | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `backgroundColor` | `background-color` | Defines the background color of the tooltip. Choose the one that provides the best contrast in your scenario.                                                                                                                                                                                                             | `"primary" \| "yellow"`                                                                                                                                              | `'primary'` |
| `placement`       | `placement`        | Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement. Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`     |
| `withArrow`       | `with-arrow`       | Defines wheter an Arrow is rendered or not. true: arrow is rendered false: arrow is not rendered                                                                                                                                                                                                                          | `boolean`                                                                                                                                                            | `false`     |


## Methods

### `hide() => Promise<void>`

Programmatically hide this tooltip

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Programmatically display the tooltip

#### Returns

Type: `Promise<void>`



### `toggle(target: HTMLElement, force?: boolean) => Promise<void>`

Toggle tooltip display

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
