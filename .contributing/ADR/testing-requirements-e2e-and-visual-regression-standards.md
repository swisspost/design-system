# Testing requirements: E2E and Visual Regression standards

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/5875>

> [!NOTE]
> This ADR is still under discussion. The requirements below are proposed baselines and may be refined.

Testing coverage across components was inconsistent. This ADR proposes baseline E2E and visual regression testing requirements so that every component has a predictable minimum level of coverage.

## Decision

### Proposed E2E testing requirements

**Core requirements (all components)**

- **Basic rendering** — Component exists and renders without errors
- **Prop behavior** — Props actually change component appearance/behavior
- **Accessibility audit** — `cy.checkA11y('#root-inner')` passes
- **Responsive behavior** — Mobile/desktop breakpoints tested

**Interactive components only**

- **User interactions** — Click, keyboard, focus events, hover
- **State management** — Props update component state correctly
- **Event emission** — Custom events fire with correct payloads
- **Keyboard navigation** — Tab order and accessibility

**Form components only**

- **Form integration** — Form data submission works
- **Validation states** — Valid/invalid styling and ARIA attributes
- **Error handling** — Error messages display correctly

### Proposed visual regression testing requirements

**Core requirements (all components)**

- **Default state** — Component renders correctly with default props
- **Responsive breakpoints** — Mobile, tablet, and desktop viewports
- **Prop variants** — All component variants (primary, secondary, sizes, etc.)

**Interactive components only**

- **Interaction states** — Hover, focus, active states of triggers
- **Open/closed states** — Component in expanded and collapsed positions
- **Full page context** — Screenshots showing component positioning/overlays
- **Keyboard navigation** — Focus states and progression

**Container components only**

- **Content variations** — Empty, single item, multiple items, overflow states
- **Layout adaptations** — Horizontal, vertical, and responsive layouts
- **Scrolling behavior** — Components with scrollable content

## Consequences

Refinements raised in the discussion to consider:

- Testing all components on all devices may be too much effort. Prioritize layout-heavy components for full device coverage and keep simpler components mainly tested on desktop.
- "State management" and "Prop behavior" overlap and could be combined or clarified.
- Keyboard navigation should mainly be tested where keyboard control matters (menus, header); for visual testing, checking focus styles may be enough.
- Open/closed states are likely covered through prop variations, so separate tests may not be needed.
