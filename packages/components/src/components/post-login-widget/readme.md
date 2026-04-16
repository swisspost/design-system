# post-login-widget



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                              | Type      | Default |
| --------------- | --------------- | -------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `authenticated` | `authenticated` | The current authentication state: `null` (loading), `true` (authenticated), `false` (not authenticated). | `boolean` | `null`  |


## Events

| Event             | Description                                                                                                                                                            | Type                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `postLoginChange` | An event emitted when the authentication state changes. The event payload is an object: `authenticated` is `true` when the user is logged in, `false` when logged out. | `CustomEvent<{ authenticated: boolean; }>` |


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
