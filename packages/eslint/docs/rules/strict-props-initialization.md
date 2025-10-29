# `strict-props-initialization`

Reports any Stencil component `@Prop` that lacks an initial value and is neither marked as optional (?) or definitely assigned (!).',

- Type: problem

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
