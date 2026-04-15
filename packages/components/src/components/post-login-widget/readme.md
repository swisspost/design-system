# post-login-widget



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                              | Type      | Default |
| --------------- | --------------- | -------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `authenticated` | `authenticated` | The current authentication state: `null` (loading), `true` (authenticated), `false` (not authenticated). | `boolean` | `null`  |


## Events

| Event             | Description                                                                   | Type                                       |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `postLoginChange` | Emitted when the authentication state changes (not for initial `null` state). | `CustomEvent<{ authenticated: boolean; }>` |


## Methods

### `refresh() => Promise<void>`

Re-fetches the authentication state from the session API and updates
the component rendering accordingly.

#### Returns

Type: `Promise<void>`




## Slots

| Slot                | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `"authenticated"`   | Content rendered when the user is authenticated (e.g. user menu).      |
| `"unauthenticated"` | Content rendered when the user is not authenticated (e.g. login link). |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
