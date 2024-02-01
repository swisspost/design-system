# post-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                | Type                         | Default |
| -------------- | --------------- | ------------------------------------------------------------------------------------------ | ---------------------------- | ------- |
| `collapsed`    | `collapsed`     | If `true`, the element is initially collapsed otherwise it is displayed.                   | `boolean`                    | `false` |
| `headingLevel` | `heading-level` | Defines the hierarchical level of the accordion item header within the headings structure. | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2`     |


## Methods

### `toggle(force?: boolean) => Promise<boolean>`

Triggers the collapse programmatically.

#### Parameters

| Name    | Type      | Description |
| ------- | --------- | ----------- |
| `force` | `boolean` |             |

#### Returns

Type: `Promise<boolean>`




## Slots

| Slot       | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
|            | Default slot for placing content within the accordion item's body.  |
| `"header"` | Slot for placing custom content within the accordion item's header. |


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"accordion-item"` |             |


## Dependencies

### Depends on

- [post-collapsible](../post-collapsible)

### Graph
```mermaid
graph TD;
  post-accordion-item --> post-collapsible
  style post-accordion-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
