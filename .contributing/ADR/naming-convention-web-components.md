# Naming Convention - Web Components

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/7448>

To ensure consistency and clarity across the codebase, all web components must follow a standardized naming pattern.

## Decision

### 1. Prefix

All component names must begin with the `post-` prefix. This ensures proper scoping and avoids naming collisions with native elements or third-party components.

### 2. Word separation

Component names must use kebab-case (lowercase words separated by hyphens).

Guidelines:

- Use only lowercase letters
- Separate each word with a dash (`-`)

Example: `post-popover-container`

### 3. Child components

Components that are intended to be used only as part of a parent component should follow a hierarchical naming pattern.

Rules:

- Start with the parent component's name
- If the parent name is plural, drop the trailing "s"
- Append a descriptive suffix indicating the child's role

Examples:

- `post-tabs` → `post-tab-panel`
- `post-accordion` → `post-accordion-item`

## Consequences

A single, predictable naming scheme makes components easy to discover, prevents collisions with native and third-party elements, and communicates parent-child relationships directly through the element name.

## Reference

Decision made based on the ticket [#5699](https://github.com/swisspost/design-system/issues/5699).
