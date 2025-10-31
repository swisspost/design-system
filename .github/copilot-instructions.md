# Copilot instructions for Swiss Post Design System Maintainers

Hey Copilot! Here’s how to play nice with our setup:

## Core principles

- **Accessibility**: Always prioritize accessibility. Ensure that all components meet WCAG 2.2 AA standards.
- **Simplicity**: Solve problems with the simplest solution possible. If it can be done with HTML, use HTML. Then try to use CSS. Only use JavaScript when absolutely necessary.
- **Responsiveness**: Ensure that all components are fully responsive and work seamlessly from 320px to 2560px screen widths.
- **Standards Compliance**: Always follow W3C web standards best practices. Avoid using framework specific solutions.
- **Compatibility**: Only use features that are baseline widely available according to webstatus.dev and caniuse.com.
- **Inclusion**: Ensure that components and documentation are usable by people with diverse abilities and technologies.

## HTML

- Use HTML and CSS for components that don't require additional interactivity.
- Use semantic HTML5 elements to enhance accessibility and SEO.
- Avoid unnecessary aria and role attributes when semantic HTML5 elements suffice.
- Test new components in the `/packages/styles/index.html` playground file.

## CSS

- Create styles for HTML/CSS components under the `/packages/styles` directory.
- Use Sass for styling components.
- Use simple selectors and avoid deep nesting.
- Use the existing tokens from the Swiss Post Design System for colors, typography, spacing, etc., suggest new tokens for new components when necessary.

## Web components

- Create web components under the `/packages/components` directory.
- Use web components for encapsulating complex UI elements that require interactivity.
- Use the `post-` prefix for all custom elements to avoid naming collisions.
- Use shadow dom for encapsulation of styles and markup.
- Use stencil best practices for authoring web components.

## Testing

- Write and maintain tests for all components and utilities.
- Use **Cypress** for end-to-end and visual regression testing, following the patterns in the `/cypress` directories.
- Use **Storybook** stories for interactive and visual documentation; ensure stories cover all component states and accessibility scenarios.
- Prefer **unit tests** for logic-heavy utilities and helpers, using the existing test setup in each package (e.g., Jest or similar tools).
- Run tests locally before submitting changes, and ensure all tests pass in CI.
- Add new tests or update existing ones when fixing bugs or adding features.

## Documentation

- Document all components under the `/packages/documentation` directory.
- Document all components thoroughly, including usage examples, API references, and accessibility considerations with storybook stories.
- Use standard HTML or lit to create documentation pages for components when necessary, avoid creating react components for documentation.
- Write easy to understand documentation using simple language and clear examples.

## Process

- Follow the contribution guidelines outlined in the Swiss Post Design System repository.
- For changes affecting end users, create a changeset in the `/.changeset` directory following the changeset format and best practices as described in https://github.com/changesets/changesets.
- Use GitHubFlow for branching and pull requests.

## Avoid

- Avoid using JavaScript for tasks that can be accomplished with HTML and CSS.
- Avoid using non-standard HTML elements or attributes.
- Avoid inline styles; always use CSS classes for styling.
- Avoid using framework-specific code or libraries like tailwind, bootstrap, react, angular, vue, etc.
- Avoid using deprecated HTML, CSS, or JavaScript features.
- Avoid using heavy libraries or dependencies that can bloat the project.
- Avoid rebuilding existing components; always check if a component already exists in the Swiss Post Design System before creating a new one.
- Avoid creating Angular or react components in the `/packages/components-angular` or `/packages/components-react` directories. These components are generated automatically from the web components.
- Avoid using CSS-in-JS solutions; stick to Sass for styling.
- Avoid generating any security issues; always follow best security practices for web development.
- Avoid hallucinations; if unsure about a requirement or implementation detail, ask for clarification. Always ensure that references are actual and verifiable and that referenced websites are real.
- Avoid using any external resources or CDNs; all assets should be self-contained within the project.
- Avoid using any non-approved fonts or icons; only use those provided by the Swiss Post Design System.
