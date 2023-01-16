# post-main-navigation



<!-- Auto Generated Below -->


## Events

| Event             | Description | Type                                                        |
| ----------------- | ----------- | ----------------------------------------------------------- |
| `dropdownToggled` |             | `CustomEvent<{ open: boolean; element: DropdownElement; }>` |
| `flyoutToggled`   |             | `CustomEvent<null \| string>`                               |


## Methods

### `setActiveFlyout(id: string | null) => Promise<void>`

Open a specific flyout

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Focus the main navigation toggle button

#### Returns

Type: `Promise<void>`



### `toggleDropdown(force?: boolean | undefined) => Promise<boolean>`

Toggle the main navigation (only visible on mobile)

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
