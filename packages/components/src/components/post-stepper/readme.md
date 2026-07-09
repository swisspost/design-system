# post-stepper

<!-- Auto Generated Below -->


## Properties

| Property                         | Attribute             | Description                                                                                                                                              | Type     | Default     |
| -------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `currentIndex`                   | `current-index`       | Defines the current step, which is the next step the user has to complete.                                                                               | `number` | `-1`        |
| `selectedIndex`                  | `selected-index`      | Defines the selected (active) step, which is the step the user is currently on. If not defined, the selected step is the current step.                   | `number` | `undefined` |
| `textCompletedStep` _(required)_ | `text-completed-step` | "Completed step" label for accessibility                                                                                                                 | `string` | `undefined` |
| `textCurrentStep` _(required)_   | `text-current-step`   | "Current step" label for accessibility                                                                                                                   | `string` | `undefined` |
| `textStepNumber` _(required)_    | `text-step-number`    | Label for the "Step {number}:" indicator for mobile view. Use `{number}` as a placeholder — it will be replaced with the current step number at runtime. | `string` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
