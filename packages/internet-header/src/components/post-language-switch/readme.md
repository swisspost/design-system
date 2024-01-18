# post-language-switch



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                   | Default     |
| -------- | --------- | ----------- | ---------------------- | ----------- |
| `mode`   | `mode`    |             | `"dropdown" \| "list"` | `undefined` |


## Events

| Event             | Description | Type                                                        |
| ----------------- | ----------- | ----------------------------------------------------------- |
| `dropdownToggled` |             | `CustomEvent<{ open: boolean; element: DropdownElement; }>` |
| `languageChanged` |             | `CustomEvent<string>`                                       |


## Methods

### `toggleDropdown(force?: boolean) => Promise<boolean>`

Open or close the language switch programatically

#### Parameters

| Name    | Type                   | Description              |
| ------- | ---------------------- | ------------------------ |
| `force` | `boolean \| undefined` | Boolean to force a state |

#### Returns

Type: `Promise<boolean>`

Boolean indicating new state


## Dependencies

### Used by

 - [swisspost-internet-header](../post-internet-header)

### Graph
```mermaid
graph TD;
  swisspost-internet-header --> post-language-switch
  style post-language-switch fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
