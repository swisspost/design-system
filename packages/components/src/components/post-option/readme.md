# post-option



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                                      | Type      | Default     |
| -------------------- | ---------- | -------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled`           | `disabled` | Whether this option is disabled and cannot be selected.                          | `boolean` | `false`     |
| `selected`           | `selected` | Whether this option is currently selected.                                       | `boolean` | `false`     |
| `value` _(required)_ | `value`    | The value of this option. Used as the selection value when the option is chosen. | `string`  | `undefined` |


## Events

| Event                | Description                                                                   | Type                              |
| -------------------- | ----------------------------------------------------------------------------- | --------------------------------- |
| `postOptionSelected` | Emitted when the option is clicked or activated. Detail: `{ value: string }`. | `CustomEvent<{ value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
