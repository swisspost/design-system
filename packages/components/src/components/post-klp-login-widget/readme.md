# post-klp-login-widget



<!-- Auto Generated Below -->


## Properties

| Property                           | Attribute                | Description                                                                                                                                                                                                                                                                                                              | Type                                                                      | Default                      |
| ---------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ---------------------------- |
| `environment`                      | `environment`            | The KLP platform instance to talk to. Determines every backend URL the widget uses.                                                                                                                                                                                                                                      | `"dev01" \| "dev02" \| "devs1" \| "int01" \| "int02" \| "prod" \| "test"` | `'prod'`                     |
| `initialState`                     | `initial-state`          | What to show before the session is known. Leave unset unless the server already knows who the visitor is: the widget then shows an avatar without initials, which costs anonymous visitors a short placeholder but never flashes the wrong state at anyone. Set `anonymous` to render the login link right away instead. | `"anonymous" \| "authenticated"`                                          | `undefined`                  |
| `keepAliveDisabled`                | `keep-alive-disabled`    | Whether to stop refreshing the session while the user is active on the page.                                                                                                                                                                                                                                             | `boolean`                                                                 | `false`                      |
| `keepAliveEvents`                  | `keep-alive-events`      | Space separated list of the events that count as user activity.                                                                                                                                                                                                                                                          | `string`                                                                  | `'click touchstart keydown'` |
| `keepAliveInterval`                | `keep-alive-interval`    | Minutes between two keep-alive ticks.                                                                                                                                                                                                                                                                                    | `number`                                                                  | `9`                          |
| `keepAliveUrl`                     | `keep-alive-url`         | The portal's own keep-alive url. The platform session is refreshed either way.                                                                                                                                                                                                                                           | `string`                                                                  | `undefined`                  |
| `textAccessUserLinks` _(required)_ | `text-access-user-links` | Visually hidden label for the button that opens the user menu.                                                                                                                                                                                                                                                           | `string`                                                                  | `undefined`                  |
| `textCurrentUser` _(required)_     | `text-current-user`      | Visually hidden label for the current user. The placeholder `{user}` will be replaced with the full name of the currently logged-in user.                                                                                                                                                                                | `string`                                                                  | `undefined`                  |
| `textUserLinks` _(required)_       | `text-user-links`        | Visually hidden label for the user menu.                                                                                                                                                                                                                                                                                 | `string`                                                                  | `undefined`                  |


## Slots

| Slot               | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `"account-switch"` | Entry for switching account, rendered only when the session permits it. |
| `"company-switch"` | Entry for switching company, rendered only when the session permits it. |
| `"login-link"`     | The link offered to anonymous visitors.                                 |
| `"logout-link"`    | The entry that ends the session.                                        |
| `"menu-links"`     | Entries of the user menu, as `post-menu-item` elements.                 |


## Dependencies

### Depends on

- [post-menu-trigger](../post-menu-trigger)
- [post-avatar](../post-avatar)
- [post-menu](../post-menu)

### Graph
```mermaid
graph TD;
  post-klp-login-widget --> post-menu-trigger
  post-klp-login-widget --> post-avatar
  post-klp-login-widget --> post-menu
  post-menu --> post-popovercontainer
  style post-klp-login-widget fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
