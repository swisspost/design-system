# post-language-option



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description                                                                                                                                                 | Type      | Default     |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `active`            | `active`  | If set to `true`, the language option is considered the current language for the page.                                                                      | `boolean` | `undefined` |
| `code` _(required)_ | `code`    | The ISO 639 language code, formatted according to [RFC 5646 (also known as BCP 47)](https://datatracker.ietf.org/doc/html/rfc5646). For example, "de".      | `string`  | `undefined` |
| `name`              | `name`    | The full name of the language. For example, "Deutsch".                                                                                                      | `string`  | `undefined` |
| `url`               | `url`     | The URL used for the href attribute of the internal anchor. This field is optional; if not provided, a button will be used internally instead of an anchor. | `string`  | `undefined` |


## Events

| Event        | Description                                                                                            | Type                  |
| ------------ | ------------------------------------------------------------------------------------------------------ | --------------------- |
| `postChange` | An event emitted when the language option is clicked. The payload is the ISO 639 code of the language. | `CustomEvent<string>` |


## Methods

### `select() => Promise<void>`

Selects the language option programmatically.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                                               |
| ----------- | --------------------------------------------------------- |
| `"default"` | Slot for placing the content inside the anchor or button. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
