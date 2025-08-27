# post-card-control

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                              | Type                    | Default     |
| -------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ----------- |
| `checked`            | `checked`     | Defines the `checked` attribute of the control. If `true`, the control is selected at its value will be included in the forms' data.                                                                                                                                                                                                                                     | `boolean`               | `false`     |
| `description`        | `description` | Defines the description in the control-label.                                                                                                                                                                                                                                                                                                                            | `string`                | `undefined` |
| `disabled`           | `disabled`    | Defines the `disabled` attribute of the control. If `true`, the user can not interact with the control and the controls value will not be included in the forms' data.                                                                                                                                                                                                   | `boolean`               | `false`     |
| `icon`               | `icon`        | Defines the icon `name` inside the card. <post-banner data-size="sm">If not set the icon will not show up.</post-banner>                                                                                                                                                                                                                                                 | `string`                | `undefined` |
| `label` _(required)_ | `label`       | Defines the text in the control-label.                                                                                                                                                                                                                                                                                                                                   | `string`                | `undefined` |
| `name`               | `name`        | Defines the `name` attribute of the control. <post-banner data-size="sm">This is a required property, when the control should participate in a native `form`. If not specified, a native `form` will never contain this controls value.</post-banner> <post-banner data-size="sm">This is a required property, when the control is used with type `radio`.</post-banner> | `string`                | `undefined` |
| `type` _(required)_  | `type`        | Defines the `type` attribute of the control.                                                                                                                                                                                                                                                                                                                             | `"checkbox" \| "radio"` | `undefined` |
| `validity`           | `validity`    | Defines the validation `validity` of the control. To reset validity to an undefined state, simply remove the attribute from the control.                                                                                                                                                                                                                                 | `boolean`               | `undefined` |
| `value`              | `value`       | Defines the `value` attribute of the control. <post-banner data-size="sm">This is a required property, when the control is used with type `radio`.</post-banner>                                                                                                                                                                                                         | `string`                | `undefined` |


## Events

| Event        | Description                                                                                                                                                                                                                                                                                                                                                               | Type                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `postChange` | An event emitted whenever the components checked state is toggled. The event payload (emitted under `event.detail.state`) is a boolean: `true` if the component is checked, `false` if it is unchecked. <post-banner data-size="sm">If the component is used with type `radio`, it will only emit this event, when the checked state is changing to `true`.</post-banner> | `CustomEvent<{ state: boolean; value: string; }>` |
| `postInput`  | An event emitted whenever the components checked state is toggled. The event payload (emitted under `event.detail.state`) is a boolean: `true` if the component is checked, `false` if it is unchecked.                                                                                                                                                                   | `CustomEvent<{ state: boolean; value: string; }>` |


## Methods

### `groupReset() => Promise<void>`

A hidden public method to reset the group controls `checked` state to `false`.

#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`

A public method to reset the controls `checked` and `validity` state.
The validity state is set to `undefined`, so it's neither valid nor invalid.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"default"` | Content to place into the `default` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Block-level_contentt">block content</a>.<post-banner type="warning" data-size="sm">Even if it is generally possible, we do not recommend using interactive elements in this slot because the background of the card control is clickable.<br/>This can lead to confusion when the hit box of nested interactive controls is not clearly separated from the background, is invalid HTML and click events bubbling up to the card control will unexpectedly toggle it if they're not captured.<br/>More info: <a href="https://accessibilityinsights.io/info-examples/web/nested-interactive/">https://accessibilityinsights.io/info-examples/web/nested-interactive/</a></post-banner> |
| `"icon"`    | To insert a custom icon into the named `icon` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a>.<post-banner data-size="sm">It is only meant for <code>img</code> or <code>svg</code> elements and overrides the `icon` property.</post-banner>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |


## Dependencies

### Depends on

- [post-icon](../post-icon)

### Graph
```mermaid
graph TD;
  post-card-control --> post-icon
  style post-card-control fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
