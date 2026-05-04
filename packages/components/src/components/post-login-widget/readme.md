# post-login-widget



<!-- Auto Generated Below -->


## Events

| Event        | Description                                                                                                                                                                                                          | Type                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `postChange` | Emitted when the authentication state changes. The event payload is an object with an `authenticated` property: `true` when the user is logged in, `false` when the user is not logged in or the API request failed. | `CustomEvent<{ authenticated: boolean; }>` |


## Methods

### `isAuthenticated() => Promise<boolean | null>`

Returns the current authentication state:
`null` when the component is still loading, `true` when authenticated, `false` when not.

#### Returns

Type: `Promise<boolean>`



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
