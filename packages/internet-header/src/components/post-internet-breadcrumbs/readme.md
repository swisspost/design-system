# post-internet-breadcrumbs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                        | Type                                       | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `customItems` | `custom-items` | Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has it's own navigation structure. | `IBreadcrumbItem[] \| string \| undefined` | `undefined` |
| `hideButtons` | `hide-buttons` | Hide all buttons.                                                                                                                  | `boolean`                                  | `false`     |


## Methods

### `toggleOverlayById(overlayId: IBreadcrumbOverlay['id']) => Promise<void>`

Toggle an overlay associated with a button.

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `overlayId` | `string` |             |

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [focus-trap](../shared)

### Graph
```mermaid
graph TD;
  swisspost-internet-breadcrumbs --> focus-trap
  style swisspost-internet-breadcrumbs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
