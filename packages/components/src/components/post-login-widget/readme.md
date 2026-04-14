# post-login-widget



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                                                                                        | Type      | Default |
| --------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `authenticated` | `authenticated` | The current authentication state. - `null`  → loading / not yet determined - `true`  → user is authenticated - `false` → user is not authenticated | `boolean` | `null`  |


## Events

| Event             | Description                                                                                                                                   | Type                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `postLoginChange` | Emitted whenever the authentication state changes. Payload: `{ authenticated: boolean }`. Not emitted for the initial `null` (loading) state. | `CustomEvent<{ authenticated: boolean; }>` |


## Methods

### `refresh() => Promise<void>`

Re-fetches the authentication state from the session API and updates
the component rendering accordingly.

#### Returns

Type: `Promise<void>`




## Slots

| Slot                | Description                                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"authenticated"`   | Content rendered when the user is authenticated (e.g. user menu).                                                                                                                |
| `"unauthenticated"` | Content rendered when the user is not authenticated (e.g. login link).  While the authentication state is being determined (`authenticated === null`), neither slot is rendered. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
