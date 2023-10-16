# post-accordion



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                   | Type      | Default |
| ------------- | -------------- | ------------------------------------------------------------- | --------- | ------- |
| `closeOthers` | `close-others` | If `true`, only one `post-collapsible` can be open at a time. | `boolean` | `false` |


## Methods

### `collapseAll() => Promise<void>`

Collapses all `post-collapsible` children.

#### Returns

Type: `Promise<void>`



### `expandAll() => Promise<void>`

Expands all `post-collapsible` children.

If `close-others` is `true` and all items are closed, it will open the first one.
Otherwise, it will keep the opened one.

#### Returns

Type: `Promise<void>`



### `toggle(id: string) => Promise<void>`

Toggles the `post-collapsible` children with the given id.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
