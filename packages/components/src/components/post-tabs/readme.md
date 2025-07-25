# post-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                           | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `activePanel` | `active-panel` | The name of the panel that is initially shown. If not specified, it defaults to the panel associated with the first tab.  **Changing this value after initialization has no effect.** | `string`  | `undefined` |
| `fullWidth`   | `full-width`   | When set to true, this property allows the tabs container to span the full width of the screen, from edge to edge.                                                                    | `boolean` | `false`     |


## Events

| Event        | Description                                                                                                                                                       | Type                  |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `postChange` | An event emitted after the active tab changes, when the fade in transition of its associated panel is finished. The payload is the name of the newly shown panel. | `CustomEvent<string>` |


## Methods

### `show(panelName: string) => Promise<void>`

Shows the panel with the given name and selects its associated tab.
Any other panel that was previously shown becomes hidden and its associated tab is unselected.

#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `panelName` | `string` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| `"default"` | Slot for placing tab panels. Each tab panel should be a <post-tab-panel> element.    |
| `"tabs"`    | Slot for placing tab headers. Each tab header should be a <post-tab-header> element. |


## Shadow Parts

| Part        | Description                                     |
| ----------- | ----------------------------------------------- |
| `"content"` | Add custom styles for the tab panel container.  |
| `"tabs"`    | Add custom styles for the tab header container. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
