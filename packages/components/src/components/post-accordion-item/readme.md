# post-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                  | Type                         | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `collapsed`    | `collapsed`     | If `true`, the element is collapsed; otherwise, it is displayed.                                                                                                                                                             | `boolean`                    | `false`     |
| `headingLevel` | `heading-level` | <span style="color:red">**[DEPRECATED]**</span> Set the `heading-level` property on the parent `post-accordion` instead.<br/><br/>Defines the hierarchical level of the accordion item header within the headings structure. | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` |


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

| Slot        | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `"default"` | Slot for placing content within the accordion item's body.          |
| `"header"`  | Slot for placing custom content within the accordion item's header. |
| `"logo"`    | Slot for placing a logo before the header.                          |


## Shadow Parts

| Part               | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `"accordion-item"` |                                                                                                  |
| `"body"`           | The pseudo-element, used to override styles on the component's internal `body` element.          |
| `"button"`         | The pseudo-element, used to override styles on the component's internal header `button` element. |


## Dependencies

### Used by

 - [post-footer](../post-footer)

### Depends on

- [post-collapsible-trigger](../post-collapsible-trigger)
- [post-icon](../post-icon)
- [post-collapsible](../post-collapsible)

### Graph
```mermaid
graph TD;
  post-accordion-item --> post-collapsible-trigger
  post-accordion-item --> post-icon
  post-accordion-item --> post-collapsible
  post-footer --> post-accordion-item
  style post-accordion-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
