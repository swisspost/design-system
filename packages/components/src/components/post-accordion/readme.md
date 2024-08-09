# post-accordion



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                        | Type                         | Default     |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `headingLevel` _(required)_ | `heading-level` | Defines the hierarchical level of the `post-accordion-item` headers within the headings structure. | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` |
| `multiple`     | `multiple`      | If `true`, multiple `post-accordion-item` can be open at the same time.                            | `boolean`                    | `false`     |


## Methods

### `collapseAll() => Promise<void>`

Collapses all `post-accordion-item`.

#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`

Expands all `post-accordion-item`.

If `multiple="true"` is not set and all items are closed, it will open the first one.
Otherwise, it will keep the opened one.

#### Returns

Type: `Promise<void>`



### `toggle(id: string) => Promise<void>`

Toggles the `post-accordion-item` with the given id.

#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                      |
| ----------- | ------------------------------------------------ |
| `"default"` | Slot for placing post-accordion-item components. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
