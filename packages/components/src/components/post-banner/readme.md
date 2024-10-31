# post-alert



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                           | Type                                                        | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------- |
| `dismissLabel` | `dismiss-label` | The label to use for the close button of a dismissible banner.                                                        | `string`                                                    | `undefined` |
| `dismissible`  | `dismissible`   | If `true`, a close button (×) is displayed and the banner can be dismissed by the user.                               | `boolean`                                                   | `false`     |
| `icon`         | `icon`          | The icon to display in the banner. By default, the icon depends on the banner type.  If `none`, no icon is displayed. | `string`                                                    | `undefined` |
| `type`         | `type`          | The type of the banner.                                                                                               | `"danger" \| "info" \| "neutral" \| "success" \| "warning"` | `'neutral'` |


## Events

| Event           | Description                                                                                                                             | Type                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `postDismissed` | An event emitted when the alert element is dismissed, after the transition. It has no payload and only relevant for dismissible alerts. | `CustomEvent<void>` |


## Methods

### `dismiss() => Promise<void>`

Triggers banner dismissal programmatically (same as clicking on the close button (×)).

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `"actions"` | Slot for placing custom actions (buttons, links, etc.) within the alert. |
| `"default"` | Slot for placing the main content/message of the alert.                  |
| `"heading"` | Slot for placing custom content within the alert's heading.              |


## Dependencies

### Depends on

- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-banner --> post-icon
  style post-banner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
