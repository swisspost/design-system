# post-listbox



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                     | Type      | Default |
| ---------- | ---------- | ----------------------------------------------- | --------- | ------- |
| `multiple` | `multiple` | Whether the listbox allows multiple selections. | `boolean` | `false` |


## Events

| Event                       | Description                                                      | Type                                             |
| --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| `postListboxChange`         | Emitted when an option is selected within the listbox.           | `CustomEvent<{ value: string; label: string; }>` |
| `postListboxFilterComplete` | Emitted when the visible options change (e.g., after filtering). | `CustomEvent<{ count: number; }>`                |


## Methods

### `activateFirstOption() => Promise<string | null>`

Activates the first enabled option.

#### Returns

Type: `Promise<string>`

The ID of the first option.

### `activateLastOption() => Promise<string | null>`

Activates the last enabled option.

#### Returns

Type: `Promise<string>`

The ID of the last option.

### `activateNextOption() => Promise<string | null>`

Moves the active option to the next enabled option.
Wraps around to the first option if at the end.

#### Returns

Type: `Promise<string>`

The ID of the newly active option.

### `activatePreviousOption() => Promise<string | null>`

Moves the active option to the previous enabled option.
Wraps around to the last option if at the beginning.

#### Returns

Type: `Promise<string>`

The ID of the newly active option.

### `clearFilter() => Promise<void>`

Clears any active filtering, showing all options.

#### Returns

Type: `Promise<void>`



### `filter(query: string) => Promise<number>`

Filters options based on a query string.
Options whose text content does not include the query (case-insensitive) are hidden.

#### Parameters

| Name    | Type     | Description                      |
| ------- | -------- | -------------------------------- |
| `query` | `string` | - The search query to filter by. |

#### Returns

Type: `Promise<number>`

The number of visible options after filtering.

### `getActiveOption() => Promise<HTMLPostOptionElement | null>`

Gets the currently active option element.

#### Returns

Type: `Promise<HTMLPostOptionElement>`



### `getSelectedOptions() => Promise<HTMLPostOptionElement[]>`

Gets the currently selected option(s).

#### Returns

Type: `Promise<HTMLPostOptionElement[]>`



### `hide() => Promise<void>`

Hides the listbox popover.

#### Returns

Type: `Promise<void>`



### `selectActiveOption() => Promise<void>`

Selects the currently active option.

#### Returns

Type: `Promise<void>`



### `setActiveOption(optionId: string | null) => Promise<void>`

Sets the active option by ID (for keyboard navigation).

#### Parameters

| Name       | Type     | Description                            |
| ---------- | -------- | -------------------------------------- |
| `optionId` | `string` | - The ID of the option to make active. |

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Shows the listbox as a popover.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                         |
| ----------- | --------------------------------------------------- |
| `"default"` | The post-option elements to display in the listbox. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
