# post-datepicker



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                              | Type      | Default      |
| ----------- | ------------ | ---------------------------------------------------------------------------------------- | --------- | ------------ |
| `inline`    | `inline`     | Whether the calendar is inline in the page (not showing in a popover when input clicked) | `boolean` | `false`      |
| `range`     | `range`      | Whether the datepicker expects a range selection or a single date selection              | `boolean` | `false`      |
| `startDate` | `start-date` | The predefined start date of the calendar Default is today                               | `Date`    | `new Date()` |


## Events

| Event              | Description                                    | Type                          |
| ------------------ | ---------------------------------------------- | ----------------------------- |
| `postSelectedDate` | An event emitted when a date has been selected | `CustomEvent<Date \| Date[]>` |


## Methods

### `hide() => Promise<void>`

Hides the popover calendar

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




## Dependencies

### Depends on

- [post-popovercontainer](../post-popovercontainer)

### Graph
```mermaid
graph TD;
  post-datepicker --> post-popovercontainer
  style post-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
