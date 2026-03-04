# post-internet-header

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                             | Type                                                                      | Default     |
| ------------- | ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| `environment` | `environment` | Target environment. Choose 'int01' for local testing.                   | `"dev01" \| "dev02" \| "devs1" \| "int01" \| "int02" \| "prod" \| "test"` | `'prod'`    |
| `fullWidth`   | `full-width`  | Displays the header at full width for full-screen applications          | `boolean \| undefined`                                                    | `false`     |
| `language`    | `language`    | Initial language to be used. Overrides automatic language detection.    | `"de" \| "en" \| "fr" \| "it" \| undefined`                               | `undefined` |
| `project`     | `project`     | Your project id, previously passed as query string parameter serviceId. | `string`                                                                  | `undefined` |


## Events

| Event          | Description                                          | Type                |
| -------------- | ---------------------------------------------------- | ------------------- |
| `headerLoaded` | Fires when the header has been rendered to the page. | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
