# post-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                        | Type      | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `active`   | `active`   | Whether this option is currently active (highlighted via keyboard navigation). This is managed by the parent listbox/autocomplete. | `boolean` | `false`     |
| `selected` | `selected` | Whether this option is currently selected.                                                                                         | `boolean` | `false`     |
| `value`    | `value`    | The value of the option, similar to `<option value="val1">`.                                                                       | `string`  | `undefined` |


## Events

| Event                | Description                                                      | Type                                                        |
| -------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| `postOptionSelected` | Fires when this option is selected (via click, Enter, or Space). | `CustomEvent<{ value: string; text: string; id: string; }>` |


## Methods

### `setActive(value: boolean) => Promise<void>`

Sets the active state of this option (keyboard navigation highlight).

#### Parameters

| Name    | Type      | Description                            |
| ------- | --------- | -------------------------------------- |
| `value` | `boolean` | - Whether the option should be active. |

#### Returns

Type: `Promise<void>`



### `setSelected(value: boolean) => Promise<void>`

Sets the selected state of this option.

#### Parameters

| Name    | Type      | Description                              |
| ------- | --------- | ---------------------------------------- |
| `value` | `boolean` | - Whether the option should be selected. |

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                     |
| ----------- | ------------------------------- |
| `"default"` | The text content of the option. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
