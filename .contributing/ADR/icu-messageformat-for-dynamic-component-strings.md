# ICU MessageFormat for Dynamic Component Strings

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/7582>

Dynamic strings in components are currently handled inconsistently, making localization and translation more difficult — especially when dealing with pluralization, gender, or language-specific word order.

## Decision

All component strings that require partial replacement must use the ICU MessageFormat (Unicode standard).

This applies to:

- Component properties (e.g. labels, aria texts, helper texts)
- Any user-facing string with interpolated variables

## Consequences

- More consistent handling of dynamic text
- Better support for localization and translation workflows
- Requires familiarity with ICU MessageFormat syntax and potential refactoring of existing strings

## Example

```html
<post-stepper
  textCompletedStep="Completed step"
  textCurrentStep="Current step"
  textStepNumber="Step {number}:"
  [currentIndex]="1"
>
  <post-stepper-item>Step 1</post-stepper-item>
  <post-stepper-item>Step 2</post-stepper-item>
  <post-stepper-item>Step 3</post-stepper-item>
  <post-stepper-item>Step 4</post-stepper-item>
</post-stepper>
```

```
"Step {current} of {total}"
```
