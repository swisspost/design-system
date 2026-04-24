# post-login-widget



<!-- Auto Generated Below -->


## Events

| Event             | Description                                                                                                                                                                                                          | Type                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `postLoginChange` | Emitted when the authentication state changes. The event payload is an object with an `authenticated` property: `true` when the user is logged in, `false` when the user is not logged in or the API request failed. | `CustomEvent<{ authenticated: boolean; }>` |


## Methods

### `refresh() => Promise<void>`

Re-fetches the authentication state from the session API and updates
the component rendering accordingly.

#### Returns

Type: `Promise<void>`




## Slots

| Slot                | Description                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"authenticated"`   | Content rendered when the user is authenticated (e.g. user menu).                                                                                                                                                                                                                                                                                                                                                        |
| `"unauthenticated"` | Content rendered when the user is not authenticated (e.g. login link).  The `authenticated` property reflects the current authentication state and can be read after the component has mounted. It is set internally — do not set it from outside. `null` — the component is loading and has not yet received a response. `true` — the user is logged in. `false` — the user is not logged in or the API request failed. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
