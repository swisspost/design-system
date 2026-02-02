# post-datepicker



<!-- Auto Generated Below -->


## Properties

| Property                          | Attribute              | Description                                                                                         | Type                                                                                                             | Default     |
| --------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| `inline`                          | `inline`               | Whether the calendar is inline in the page (not showing in a popover when input clicked)            | `boolean`                                                                                                        | `false`     |
| `max`                             | `max`                  | Maximum possible date to select                                                                     | `string`                                                                                                         | `undefined` |
| `min`                             | `min`                  | Minimun possible date to select                                                                     | `string`                                                                                                         | `undefined` |
| `range`                           | `range`                | Whether the datepicker expects a range selection or a single date selection                         | `boolean`                                                                                                        | `false`     |
| `renderCellCallback`              | --                     | Used to extend the existing on render cell to disable dates                                         | `(data: { date: Date; cellType: AirDatepickerViewsSingle; datepicker: AirDatepicker<HTMLDivElement>; }) => void` | `undefined` |
| `selectedEndDate`                 | `selected-end-date`    | Selected end date for range datepicker only                                                         | `string`                                                                                                         | `undefined` |
| `selectedStartDate`               | `selected-start-date`  | Selected date If range datepicker: Selected start date                                              | `string`                                                                                                         | `undefined` |
| `textNextDecade` _(required)_     | `text-next-decade`     | Label for "Next decade" button                                                                      | `string`                                                                                                         | `undefined` |
| `textNextMonth` _(required)_      | `text-next-month`      | Label for "Next month" button                                                                       | `string`                                                                                                         | `undefined` |
| `textNextYear` _(required)_       | `text-next-year`       | Label for "Next year" button                                                                        | `string`                                                                                                         | `undefined` |
| `textPreviousDecade` _(required)_ | `text-previous-decade` | Label for "Previous decade" button                                                                  | `string`                                                                                                         | `undefined` |
| `textPreviousMonth` _(required)_  | `text-previous-month`  | Label for "Previous month" button                                                                   | `string`                                                                                                         | `undefined` |
| `textPreviousYear` _(required)_   | `text-previous-year`   | Label for "Previous year" button                                                                    | `string`                                                                                                         | `undefined` |
| `textSwitchYear` _(required)_     | `text-switch-year`     | Label for the "Switch to year view" title button                                                    | `string`                                                                                                         | `undefined` |
| `textToggleCalendar`              | `text-toggle-calendar` | Label for the toggle button that opens the calendar Only needed when calendar is connected to input | `string`                                                                                                         | `undefined` |


## Events

| Event             | Description                                                         | Type                          |
| ----------------- | ------------------------------------------------------------------- | ----------------------------- |
| `postUpdateDates` | An event emitted when a date or a range of dates have been selected | `CustomEvent<Date \| Date[]>` |


## Methods

### `hide() => Promise<void>`

Hides the popover calendar

#### Returns

Type: `Promise<void>`



### `show(target: HTMLElement) => Promise<void>`

Displays the popover calendar, focusing the first calendar item

#### Parameters

| Name     | Type          | Description                                                                   |
| -------- | ------------- | ----------------------------------------------------------------------------- |
| `target` | `HTMLElement` | - The HTML element relative to which the popover calendar should be displayed |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [post-icon](../post-icon)
- [post-popovercontainer](../post-popovercontainer)

### Graph
```mermaid
graph TD;
  post-datepicker --> post-icon
  post-datepicker --> post-popovercontainer
  style post-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
