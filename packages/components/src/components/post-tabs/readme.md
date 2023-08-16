# post-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                    | Type     | Default     |
| ------------- | -------------- | ---------------------------------------------- | -------- | ----------- |
| `activePanel` | `active-panel` | The name of the panel that is initially shown. | `string` | `undefined` |


## Events

| Event       | Description                                                                                          | Type                  |
| ----------- | ---------------------------------------------------------------------------------------------------- | --------------------- |
| `tabChange` | An event emitted whenever a new tab becomes active. The payload is the name of the associated panel. | `CustomEvent<string>` |


## Methods

### `show(panelName: string) => Promise<void>`

Shows the panel with the given name and selects its associated tab.
Any other panel that was previously shown becomes hidden and its associated tab is unselected.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
