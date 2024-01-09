# post-collapsible



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                              | Type      | Default |
| ----------- | ----------- | ------------------------------------------------------------------------ | --------- | ------- |
| `collapsed` | `collapsed` | If `true`, the element is initially collapsed otherwise it is displayed. | `boolean` | `false` |


## Events

| Event            | Description                                                                                                                                                                            | Type                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `collapseChange` | An event emitted when the collapse element is shown or hidden, before the transition.  The event payload is a boolean: `true` if the collapsible was opened, `false` if it was closed. | `CustomEvent<boolean>` |


## Methods

### `toggle(open?: boolean) => Promise<boolean>`

Triggers the collapse programmatically.

If there is a collapsing transition running already, it will be reversed.

#### Parameters

| Name   | Type      | Description |
| ------ | --------- | ----------- |
| `open` | `boolean` |             |

#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [post-accordion-item](../post-accordion-item)

### Graph
```mermaid
graph TD;
  post-accordion-item --> post-collapsible
  style post-collapsible fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
