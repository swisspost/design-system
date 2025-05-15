# `strict-props-initialization`

Identifies any Stencil component `@Prop` properties that have been initialized without being marked as explicitly optional (`?`) or definitely assigned (`!`)'.

- Type: suggestion

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```ts
@Prop() myProp: string;
```

### ✅ Valid Code

```ts
@Prop() myProp!: string;
```

Or

```ts
@Prop() myProp?: string;
```
