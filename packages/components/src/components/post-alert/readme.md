# post-alert



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                     | Type      | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `dismissLabel` | `dismiss-label` | The label to use for the close button of a dismissible alert.                                                                   | `string`  | `undefined` |
| `dismissible`  | `dismissible`   | If `true`, a close button (×) is displayed and the alert can be dismissed by the user.                                          | `boolean` | `false`     |
| `fixed`        | `fixed`         | If `true`, the alert is positioned at the bottom of the window, from edge to edge.                                              | `boolean` | `false`     |
| `icon`         | `icon`          | The icon to display in the alert.  If `null`, no icon will be displayed. By default, the icon depends on the alert type.        | `string`  | `undefined` |
| `type`         | `type`          | The type of the alert.  We provide styles for the following types: `'primary'`, `'success'`, `'danger'`, `'warning'`, `'info'`. | `string`  | `'primary'` |


## Methods

### `close() => Promise<void>`

Triggers alert closing programmatically (same as clicking on the close button (×)).

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
