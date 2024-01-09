# post-collapsible



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                             | Type                         | Default |
| -------------- | --------------- | --------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| `collapsed`    | `collapsed`     | If `true`, the element is initially collapsed otherwise it is displayed.                | `boolean`                    | `false` |
| `headingLevel` | `heading-level` | Defines the hierarchical level of the collapsible header within the headings structure. | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2`     |


## Events

| Event            | Description                                                                                              | Type                |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| `collapseChange` | An event emitted when the collapse element is shown or hidden, before the transition. It has no payload. | `CustomEvent<void>` |


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




## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"accordion-item"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
