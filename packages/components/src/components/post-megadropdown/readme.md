# post-megadropdown



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description | Type     | Default     |
| ---------------- | ---------------- | ----------- | -------- | ----------- |
| `duration_entry` | `duration_entry` |             | `number` | `undefined` |
| `duration_exit`  | `duration_exit`  |             | `number` | `undefined` |
| `slide_down`     | `slide_down`     |             | `number` | `undefined` |
| `slide_up`       | `slide_up`       |             | `number` | `undefined` |
| `x1_entry`       | `x-1_entry`      |             | `number` | `undefined` |
| `x1_exit`        | `x-1_exit`       |             | `number` | `undefined` |
| `x2_entry`       | `x-2_entry`      |             | `number` | `undefined` |
| `x2_exit`        | `x-2_exit`       |             | `number` | `undefined` |
| `y1_entry`       | `y-1_entry`      |             | `number` | `undefined` |
| `y1_exit`        | `y-1_exit`       |             | `number` | `undefined` |
| `y2_entry`       | `y-2_entry`      |             | `number` | `undefined` |
| `y2_exit`        | `y-2_exit`       |             | `number` | `undefined` |


## Events

| Event                    | Description                                                                                                                                                                                                                                                                                                                                   | Type                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `postToggleMegadropdown` | Emits when the dropdown is shown or hidden. The event payload is an object. `isVisible` is true when the dropdown gets opened and false when it gets closed `focusParent` determines whether after the closing of the mega dropdown, the focus should go back to the trigger parent or naturally go to the next focusable element in the page | `CustomEvent<{ isVisible: boolean; focusParent?: boolean; }>` |


## Methods

### `focusFirst() => Promise<void>`

Sets focus to the first focusable element within the component.

#### Returns

Type: `Promise<void>`



### `hide(focusParent?: boolean, forceClose?: boolean) => Promise<void>`

Hides the dropdown with an animation.

#### Parameters

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| `focusParent` | `boolean` |             |
| `forceClose`  | `boolean` |             |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Displays the dropdown.

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggles the dropdown visibility based on its current state.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
