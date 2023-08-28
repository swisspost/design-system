# post-tooltip



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                                                                                                                                                              | Type                                                                                                                                                                 | Default     |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `class`     | `class`     | Internally used to track changes to the class attribute on the host element                                                                                                                                                                                                                                              | `string`                                                                                                                                                             | `undefined` |
| `placement` | `placement` | Define the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement. Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries. | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'top'`     |


## Methods

### `hideTooltip() => Promise<void>`

Hide this tooltip

#### Returns

Type: `Promise<void>`



### `showTooltip() => Promise<void>`

Show this tooltip

#### Returns

Type: `Promise<void>`



### `toggleTooltip(force?: boolean) => Promise<void>`

Toggle tooltip display

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
