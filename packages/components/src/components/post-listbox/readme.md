# post-listbox



<!-- Auto Generated Below -->


## Events

| Event               | Description                                | Type                                |
| ------------------- | ------------------------------------------ | ----------------------------------- |
| `postListboxToggle` | Fires when the listbox visibility changes. | `CustomEvent<{ isOpen: boolean; }>` |


## Methods

### `filter(query: string) => Promise<void>`

Filters the list of options using default text matching.
An empty string resets the filter to its original state.

#### Parameters

| Name    | Type     | Description                              |
| ------- | -------- | ---------------------------------------- |
| `query` | `string` | - The search query to filter options by. |

#### Returns

Type: `Promise<void>`



### `getOptions() => Promise<HTMLPostListboxOptionElement[]>`

Returns all post-listbox-option children.

#### Returns

Type: `Promise<HTMLPostListboxOptionElement[]>`



### `getVisibleOptions() => Promise<HTMLPostListboxOptionElement[]>`

Returns only the visible (non-hidden) options.

#### Returns

Type: `Promise<HTMLPostListboxOptionElement[]>`



### `hide() => Promise<void>`

Hides the listbox popover.

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Shows the listbox popover, positioning it relative to the given target element.

#### Parameters

| Name     | Type          | Description                                                         |
| -------- | ------------- | ------------------------------------------------------------------- |
| `target` | `HTMLElement` | - The element to anchor the popover to (typically the input field). |

#### Returns

Type: `Promise<void>`




## Slots

| Slot            | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
|                 | Default slot for `<post-listbox-option>` elements.                                 |
| `"blank-slate"` | Content shown when no options match the current filter (e.g. an image or message). |


## Dependencies

### Depends on

- [post-popovercontainer](../post-popovercontainer)
- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-listbox --> post-popovercontainer
  post-listbox --> post-icon
  style post-listbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
