# post-main-navigation



<!-- Auto Generated Below -->


## Events

| Event             | Description | Type                                                        |
| ----------------- | ----------- | ----------------------------------------------------------- |
| `dropdownToggled` |             | `CustomEvent<{ open: boolean; element: DropdownElement; }>` |
| `flyoutToggled`   |             | `CustomEvent<string>`                                       |


## Methods

### `setActiveFlyout(id: null | string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleDropdown(force?: boolean) => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [swisspost-internet-header](../post-internet-header)

### Graph
```mermaid
graph TD;
  swisspost-internet-header --> post-main-navigation
  style post-main-navigation fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
