# `no-deprecated-breakpoints`

Flags all deprecated breakpoint size classes and replaces with existing ones.

- Type: problem
- 🔧 Supports autofix (--fix)

## Class list

The classes that are handled by this rule are all of the layout and utility classes that have the breakpoints:

- `sm`, `rg`, `xxl`

The exhaustive list of covered classes are:

- Grid
  - `col-*-{1/2/3/4/5/6/7/8/9/10/11/12}`
  - `offset-*-{0/1/2/3/4/5/6/7/8/9/10/11}`
  - `gap-*-{1/2/3/4/5}`
  - `row-gap-*-{1/2/3/4/5}`
  - `column-gap-*-{1/2/3/4/5}`
- Spacing
  - `g-*-{1/2/3/4/5}`
  - `gx-*-{1/2/3/4/5}`
  - `gy-*-{1/2/3/4/5}`
  - `{p/ps/pe/pt/pb/px/py/m/ms/me/mt/mb/mx/my}-*-{auto/1/2/3/4/5/hair/line/micro/mini/small-regular/regular/small-large/large/big/bigger-big/small-huge/huge/small-giant/giant/bigger-giant}`
- Sizing
  - `{w/mw/h/mh}-*-{auto/25/50/75/100/hair/line/micro/mini/small-regular/regular/small-large/large/big/bigger-big/small-huge/huge/small-giant/giant/bigger-giant}`
- Flex
  - `flex-*-{row/row-reverse/column/column-reverse}`
  - `justify-content-*-{start/end/center/between/around/evenly}`
  - `align-content-*-{start/end/center/between/around/stretch}`
  - `align-items-*-{start/end/center/baseline/stretch}`
  - `align-self-*-{start/end/center/baseline/stretch}`
  - `flex-*-fill`
  - `flex-*-{grow/shrink}-{0/1}`
  - `flex-*-{nowrap/wrap/wrap-reverse}`
  - `order-*-{0/1/2/3/4/5/first/last}`
- Others
  - `float-*-{start/end/none}`
  - `text-*-{left/center/end}`
  - `d-*-{none/inline/inline-block/block/grid/inline-grid/table/table-cell/table-row/flex/inline-flex}`

**Note that the `sm` breakpoint is not actually deprecated but the pixel range of the breakpoints having changed, the previous `sm` breakpoint is now merged with `xs`.**

## Rule Options

This rule does not have any configuration options.

## Example

### ❌ Invalid Code

```html
<div class="w-rg-16">Content</div>
<div class="col-rg-5">Content</div>
<div class="g-xxl-4">Content</div>
```

### ✅ Valid Code

```html
<div class="w-md-48">Content</div>
<div class="col-lg-5">Content</div>
<div class="gx-xl-16">Content</div>
```
