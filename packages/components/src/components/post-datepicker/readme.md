# post-datepicker

<!-- Auto Generated Below -->


## Events

| Event            | Description                                                                                                                                  | Type                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `toggleCalendar` | Emits when the calendar is shown or hidden. The event payload is a boolean: `true` when the calendar was opened, `false` when it was closed. | `CustomEvent<boolean>` |


## Methods

### `hide() => Promise<void>`

Hides the popover calendar and restores focus to the previously focused element.

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Displays the popover calendar, focusing the first calendar item.

#### Parameters

| Name     | Type          | Description                                                                    |
| -------- | ------------- | ------------------------------------------------------------------------------ |
| `target` | `HTMLElement` | - The HTML element relative to which the popover calendar should be displayed. |

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"datepicker"` |             |


## Dependencies

### Depends on

- [post-popovercontainer](../post-popovercontainer)
- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-datepicker --> post-popovercontainer
  post-datepicker --> post-icon
  style post-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
