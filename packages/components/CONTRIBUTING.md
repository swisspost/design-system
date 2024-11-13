# Contributing to Design System Components

These contribution guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md), where you can find instructions on how to set up the repository for contributing.

## Getting Started

```bash
pnpm bootstrap
pnpm components:start
```

To build the component for production, run:

```bash
pnpm components:build
```

To run the unit tests for the components, run:

```bash
pnpm components:test
```

## Writing Components

### Generate a New Component

To generate a new component, run:

```bash
pnpm components:generate post-my-new-component
```

All components should be named with the prefix `post-`.

### Observe Coding Style

This project uses ESLint [@stencil-community/eslint-plugin](https://www.npmjs.com/package/@stencil-community/eslint-plugin) rules
to enforce standardization of the components and their compliance with [Stencil Style Guide](https://stenciljs.com/docs/style-guide).

To analyse your code and find problems, run:

```bash
pnpm components:lint
```

### Use slots

You can use [the `<slot>` HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) as a placeholder for any user-defined markup.

If the component has only one slot, it should not have a `name` attribute.
Also, don't use named slots for primary content, but instead reserve them for secondary content.

When you need to access elements assigned to a given slot, use the `onSlotChange` event to ensure that all asynchronous changes to the content are taken into account.
Parent components are not re-rendered if only their content changes.

### Validate Properties

Properties, defined with the `@Prop` decorator, are custom attributes publicly exposed on the HTML element.
To ensure that the value passed by the user matches what is expected, it is necessary to implement validation.

All property validators are available in the `src/utils/property-checkers` folder.

You can use these validators in a function decorated with the `@Watch` decorator to validate the value given to a prop every time it changes, as shown in the [Stencil documentation](https://stenciljs.com/docs/properties#prop-validation).
Also make sure to call this function in the `connectedCallback` lifecycle hook so that the value is also validated when the component is initially rendered.

### Prefix CustomEvents

Events defined with the `@Event` decorator, are custom events, publicly exposed on the HTML element.
To ensure that no build warnings or naming conflicts occur, it is necessary to prefix such events with `post` (e.g. `postChange`, `postToggle`, etc.).

### Write Component Styles

Components that have a standard HTML variant have their styles defined in the `@swisspost/design-system-styles` package.
It is sometimes possible to reuse these styles as-is but in many cases, the shadow DOM structure needs specific selectors.
In these cases write custom CSS inside the component styles, using variables, mixins and functions from the styles package.
Make sure to only include styles related to the component to ensure it remains lightweight,
and include them using the [Sass `@use` rule](https://sass-lang.com/documentation/at-rules/use/).

To add specific styles for slotted elements use the [CSS `::slotted()` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted),
or to style parts of the component based on a parent use the [CSS `::part()` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).
Document parts in Storybook as they are also exposed to the host document and people can customize these elements.

Do not assume that any CSS from the styles package is actually present on the page.
It should be possible to use the component package standalone.
Therefore, if you're using CSS Custom Properties (CSS variables), which is highly encouraged, define fallback values for them:

```css
:host {
  --post-accordion-background-color: var(
    --post-accordion-background-color,
    #{accordion.$background-color}
  );
}
```

### Handle animations

All CSS animations can be found in the `src/animations` folder.
They are built with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

Calling these functions will start the animation, you can then wait for them to complete as well as pause them, reverse them or force their completion.
More information can be found in the [Web Animations documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API).

### Write stories

Components are documented in the `@swisspost/design-system-documentation` package, a [Storybook](https://storybook.js.org) documentation.

By setting a component's name as a `component` property in your stories' metadata, all controls are inferred from the component's `@Prop`.

### Write tests

All components should have automated tests.
These tests are available in the `cypress/e2e` folder.

### Set inital component Visibility to hidden

To prevent flickering while components load, add each new component to the list in `packages/styles/src/utilities/_not-defined.scss`, which applies `visibility: hidden` to all listed components until they are registered by the browser (when the hydrated attribute actually starts to take effect).

## Stencil

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

Need help? Check out the docs [here](https://stenciljs.com/docs/my-first-component).
