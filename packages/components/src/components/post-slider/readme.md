# post-slider



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                      | Type                         | Default        |
| -------- | --------- | ---------------------------------------------------------------- | ---------------------------- | -------------- |
| `max`    | `max`     | The greatest value in the range of permitted values.             | `number`                     | `100`          |
| `min`    | `min`     | The lowest value in the range of permitted values.               | `number`                     | `0`            |
| `orient` | `orient`  | The orientation of the slider: "horizontal" or "vertical".       | `"horizontal" \| "vertical"` | `'horizontal'` |
| `range`  | `range`   | If true, the slider has two thumbs allowing for range selection. | `boolean`                    | `false`        |
| `step`   | `step`    | The granularity that the value must adhere to.                   | `"any" \| number`            | `1`            |
| `value`  | `value`   | The number or range initially selected.                          | `[number, number] \| number` | `undefined`    |


## Events

| Event        | Description                                                                            | Type                                      |
| ------------ | -------------------------------------------------------------------------------------- | ----------------------------------------- |
| `postChange` | Event dispatched when a thumb is released after sliding, payload is the current value. | `CustomEvent<[number, number] \| number>` |
| `postInput`  | Event dispatched while a thumb is sliding, payload is the current value.               | `CustomEvent<[number, number] \| number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
