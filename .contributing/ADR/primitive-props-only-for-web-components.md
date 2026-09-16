# Primitive props only for web components

## Context

Discussion: <https://github.com/swisspost/design-system/issues/6052>

Web components are intended to work across frameworks and in plain HTML, but complex props are handled inconsistently: HTML attributes are limited to strings and booleans, JavaScript properties can accept objects, and frameworks may ignore object values in HTML-rendered markup. This makes object-based component APIs fragile for framework-agnostic usage. The Design System should prefer the lowest common denominator for public props and keep the API simple, portable, and predictable.

## Decision

Use only simple prop types for web components: `string`, `number`, and `boolean` in Stencil components.

If a component needs richer configuration, it should expose a flat set of simple props. In exceptional cases, stringified JSON may be used with clear justification and documentation. Exceptions needs to prevent significant complexity in other parts of the system.

## Consequences

### Positive

- Consistent API across frameworks and plain HTML.
- Better compatibility with SSR and server-rendered content.
- Easier to document, test, and maintain.
- Cleaner component contracts that align with the web platform's attribute model.

### Negative

- Some use cases that are convenient with object props require a more explicit prop API.
- Complex configuration may need to be split across multiple props.
- Consumers may need slightly more code to pass structured data than with a single object prop.

## Example

Preferred:

```html
<post-component foo bar="baz"></post-component>
```

Avoid:

```js
component.config = { foo: true, bar: 'baz' };
```
