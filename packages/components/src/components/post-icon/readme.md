# post-icon

some content

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute   | Description                                                                                                               | Type                                                                           | Default     |
| ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------- |
| `animation`         | `animation` | The name of the animation.                                                                                                | `"cylon" \| "cylon-vertical" \| "fade" \| "spin" \| "spin-reverse" \| "throb"` | `null`      |
| `base`              | `base`      | The base path, where the icons are located (must be a public url).<br/>Leave this field empty to use the default cdn url. | `string`                                                                       | `null`      |
| `flipH`             | `flip-h`    | When set to `true`, the icon will be flipped horizontally.                                                                | `boolean`                                                                      | `false`     |
| `flipV`             | `flip-v`    | When set to `true`, the icon will be flipped vertically.                                                                  | `boolean`                                                                      | `false`     |
| `name` _(required)_ | `name`      | The name/id of the icon (e.g. 1000, 1001, ...).                                                                           | `string`                                                                       | `undefined` |
| `rotate`            | `rotate`    | The number of degree for the css rotate transformation.                                                                   | `number`                                                                       | `null`      |
| `scale`             | `scale`     | The number for the css scale transformation.                                                                              | `number`                                                                       | `null`      |


## Dependencies

### Used by

 - [post-alert](../post-alert)
 - [post-breadcrumb](../post-breadcrumb)
 - [post-breadcrumb-item](../post-breadcrumb-item)
 - [post-card-control](../post-card-control)
 - [post-closebutton](../post-closebutton)
 - [post-rating](../post-rating)
 - [post-tag](../post-tag)

### Graph
```mermaid
graph TD;
  post-alert --> post-icon
  post-breadcrumb --> post-icon
  post-breadcrumb-item --> post-icon
  post-card-control --> post-icon
  post-closebutton --> post-icon
  post-rating --> post-icon
  post-tag --> post-icon
  style post-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
