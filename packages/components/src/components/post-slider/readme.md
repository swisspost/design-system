# post-slider



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                                                                                                                  | Type                         | Default        |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `max`    | `max`     | Describes how much work the task indicated by the progress element requires. Must be a valid floating point number greater than min.                                                                                                                                         | `number`                     | `100`          |
| `min`    | `min`     | The minimum value of the slider. Must be a valid floating point number less than max.                                                                                                                                                                                        | `number`                     | `0`            |
| `orient` | `orient`  | The orientation of the slider: "horizontal" or "vertical".                                                                                                                                                                                                                   | `"horizontal" \| "vertical"` | `'horizontal'` |
| `range`  | `range`   | If true, the slider has two thumbs allowing for range selection.                                                                                                                                                                                                             | `boolean`                    | `false`        |
| `step`   | `step`    | The granularity that the value must adhere to.                                                                                                                                                                                                                               | `"any" \| number`            | `1`            |
| `value`  | `value`   | Specifies how much of the task has been completed. Must be a valid floating point number between min and max. If there is no value attribute, the slider is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take. | `[number, number] \| number` | `undefined`    |


## Events

| Event        | Description                                                                            | Type                                      |
| ------------ | -------------------------------------------------------------------------------------- | ----------------------------------------- |
| `postChange` | Event dispatched when a thumb is released after sliding, payload is the current value. | `CustomEvent<[number, number] \| number>` |
| `postInput`  | Event dispatched while a thumb is sliding, payload is the current value.               | `CustomEvent<[number, number] \| number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
