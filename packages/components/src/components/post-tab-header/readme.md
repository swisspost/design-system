# post-tab-header



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                            | Type      | Default     |
| -------- | --------- | ---------------------------------------------------------------------- | --------- | ----------- |
| `active` | `active`  | If `true`, the header is active and its corresponding panel is visible | `boolean` | `undefined` |


## Events

| Event         | Description                                                                   | Type                |
| ------------- | ----------------------------------------------------------------------------- | ------------------- |
| `activated`   | An event emitted whenever the tab header becomes active. It has no payload.   | `CustomEvent<void>` |
| `deactivated` | An event emitted whenever the tab header becomes inactive. It has no payload. | `CustomEvent<void>` |


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
