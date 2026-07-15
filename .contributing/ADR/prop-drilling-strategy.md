# Prop drilling strategy

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/6242>

Components that re-use other components internally create prop drilling scenarios where parent components must accept and forward props they don't directly use. We evaluated three approaches to address this architectural challenge:

- **Composition (current solution)** — using slots and component composition
- **Store** — global state management using Stencil Store
- **Context** — scoped context for child components (not available in Stencil)

## Decision

Maintain composition as the default approach for the majority of components. Use store only for components that require configuration.

## Consequences

Guidelines:

- **Default approach**: keep composition (current solution) for most components.
- **Configuration-heavy components**: use store for components like the configurable header and footer that need shared configuration.
