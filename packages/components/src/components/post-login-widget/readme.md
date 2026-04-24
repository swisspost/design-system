# post-login-widget



<!-- Auto Generated Below -->


## Events

| Event             | Description                                                                                                                                                   | Type                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `postLoginChange` | Emitted when the authentication state changes. The event payload is an object: `authenticated` is `true` when the user is logged in, `false` when logged out. | `CustomEvent<{ authenticated: boolean; }>` |


## Methods

### `refresh() => Promise<void>`

Re-fetches the authentication state from the session API and updates
the component rendering accordingly.

#### Returns

Type: `Promise<void>`




## Slots

| Slot                | Description                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"authenticated"`   | Content rendered when the user is authenticated (e.g. user menu).                                                                                                                                                                                                                                                                   |
| `"unauthenticated"` | Content rendered when the user is not authenticated (e.g. login link).  The `authenticated` property reflects the current authentication state and can be read after the component has mounted. It is set internally — do not set it from outside. `null` while loading, `true` when authenticated, `false` when not authenticated. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
