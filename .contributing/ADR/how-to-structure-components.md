# How to structure components

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/4393>

> [!NOTE]
> This ADR needs a dev roundtable before it is finalized.

When should a component be a web component? When can it be implemented with HTML/CSS? Should a web component use Shadow DOM? What elements should be part of the Shadow DOM, what parts should be slotted? [#3287](https://github.com/swisspost/design-system/discussions/3287) highlights the key differences and gives the following recommendation.

## Decision

### HTML/CSS vs. Web Component

Initial recommendation: Use standard elements if it's possible to build the component with one element (`<a>`, `<p>`, `<h1>`). Use a custom element when JS functionality is necessary (`<post-accordion>`, `<post-tabs>`), when a specific structure is necessary (`<post-input>`, `<post-input floating-label>`), or there is no standard element for the use case (`<post-tag>`). Exceptions or edge cases are possibly a button with icon where it's hard to implement a button with all necessary variations and compatibility as a web component but a specific nesting structure is necessary.

New proposal: Use HTML/CSS if it's possible to build the component with standard elements (`<a>`, `<button>`, `<dialog>`). Use a custom element when JS functionality is necessary (`<post-accordion>`, `<post-tabs>`).

### Shadow DOM vs. Light DOM

Use light DOM when it's necessary to style the component based on slotted elements or for compatibility reasons with third party libraries; use Shadow DOM otherwise.

### Internal markup vs. slotted content

Use slots. Abstract away logic, but not content or semantic structure.

## History

There have been multiple discussions around this topic and the decision has been revised. Here's a history:

- July 2024: [HTML/CSS or Web Component? Shadow or Light DOM? Slot or internal content? Some thoughts #3287](https://github.com/swisspost/design-system/discussions/3287)
- February 2024: [RFC: Action menu button component API #1208](https://github.com/swisspost/design-system/discussions/1208)
- June 2023: [Web Components - Separation of components #1507](https://github.com/swisspost/design-system/discussions/1507)
- March 2023: [RFC: Create web components for standard html elements #1224](https://github.com/swisspost/design-system/discussions/1224) (overruled by this record)
