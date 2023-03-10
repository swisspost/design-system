# post-tab-header



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                            | Type      | Default     |
| -------- | --------- | ---------------------------------------------------------------------- | --------- | ----------- |
| `active` | `active`  | If `true`, the header is active and its corresponding panel is visible | `boolean` | `undefined` |


## Events

| Event         | Description                                                                                     | Type                  |
| ------------- | ----------------------------------------------------------------------------------------------- | --------------------- |
| `activated`   | An event emitted whenever the tab header becomes active. The payload is the index of the tab.   | `CustomEvent<number>` |
| `deactivated` | An event emitted whenever the tab header becomes inactive. The payload is the index of the tab. | `CustomEvent<number>` |


## Methods

### `activate() => Promise<void>`

Activates the tab programmatically.

#### Returns

Type: `Promise<void>`



### `deactivate() => Promise<void>`

Deactivates the tab programmatically.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
