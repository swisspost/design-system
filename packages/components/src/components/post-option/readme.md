# post-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                          | Type      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Whether this option is disabled and cannot be selected.                                              | `boolean` | `false`     |
| `selected` | `selected` | Whether this option is currently selected.                                                           | `boolean` | `false`     |
| `value`    | `value`    | The value associated with this option. If not provided, the text content of the option will be used. | `string`  | `undefined` |


## Events

| Event                | Description                                                                                                                           | Type                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `postOptionSelected` | Emitted when the option is selected via click or keyboard interaction. The event bubbles up to allow the listbox to handle selection. | `CustomEvent<{ value: string; label: string; }>` |


## Slots

| Slot        | Description                      |
| ----------- | -------------------------------- |
| `"default"` | The content/label of the option. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
