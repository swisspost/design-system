# post-megadropdown



<!-- Auto Generated Below -->


## Events

| Event                    | Description                                                                                                                                                                                                                                                                                                                                   | Type                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `postToggleMegadropdown` | Emits when the dropdown is shown or hidden. The event payload is an object. `isVisible` is true when the dropdown gets opened and false when it gets closed `focusParent` determines whether after the closing of the mega dropdown, the focus should go back to the trigger parent or naturally go to the next focusable element in the page | `CustomEvent<{ isVisible: boolean; focusParent?: boolean; }>` |


## Methods

### `focusFirst() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `hide(focusParent?: boolean) => Promise<void>`

Hides the dropdown with an animation.

#### Parameters

| Name          | Type      | Description |
| ------------- | --------- | ----------- |
| `focusParent` | `boolean` |             |

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
