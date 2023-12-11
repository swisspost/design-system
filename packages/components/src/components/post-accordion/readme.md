# post-accordion



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                             | Type      | Default |
| ---------- | ---------- | ----------------------------------------------------------------------- | --------- | ------- |
| `multiple` | `multiple` | If `true`, multiple `post-accordion-item` can be open at the same time. | `boolean` | `false` |


## Methods

### `collapseAll() => Promise<void>`

Collapses all `post-accordion-item`.

#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`

Expands all `post-accordion-item`.

If `close-others` is `true` and all items are closed, it will open the first one.
Otherwise, it will keep the opened one.

#### Returns

Type: `Promise<void>`



### `toggle(id: string) => Promise<void>`

Toggles the `post-accordion-item` with the given id.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
