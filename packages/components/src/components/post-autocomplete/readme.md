# post-accordion

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                        | Type      | Default     |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------- | --------- | ----------- |
| `clearable`       | `clearable`        | Show or hide the clear button                                                      | `boolean` | `false`     |
| `filterThreshold` | `filter-threshold` | Number of characters to type before filtering methods are called                   | `number`  | `0`         |
| `listbox`         | `listbox`          | Optional idref to connect the autocomplete with the options dropdown if not nested | `string`  | `undefined` |


## Events

| Event                | Description                                                     | Type                  |
| -------------------- | --------------------------------------------------------------- | --------------------- |
| `postFilteringEvent` | Cancelable event emitted when the input value is to be filtered | `CustomEvent<string>` |


## Slots

| Slot        | Description                                         |
| ----------- | --------------------------------------------------- |
| `"default"` | Slot for placing post-autocomplete-item components. |


## Dependencies

### Depends on

- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-autocomplete --> post-icon
  style post-autocomplete fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
