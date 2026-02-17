# post-listbox-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                         | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------- | --------- | ----------- |
| `selected` | `selected` | Represents an initially selected option.                            | `boolean` | `false`     |
| `value`    | `value`    | A value string, similar to `<option value="val1">Value 1</option>`. | `string`  | `undefined` |


## Events

| Event                | Description                                                                     | Type                                            |
| -------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------- |
| `postOptionSelected` | Fires when this option is selected. Bubbles up to the listbox and autocomplete. | `CustomEvent<{ value: string; text: string; }>` |


## Slots

| Slot | Description                               |
| ---- | ----------------------------------------- |
|      | Default slot for the option text content. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
