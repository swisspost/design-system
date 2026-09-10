# How to handle Design System EOL versions

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/6680>

While it may occasionally seem necessary to work on Design System versions that have reached end-of-life (EOL), this practice should generally be avoided. This ADR establishes a clear policy for handling EOL versions, outlining specific and limited exceptions.

## Decision

In general, no changes should ever be made to EOL versions.

Exceptions may be considered in the following cases:

- An EOL version must be revived due to the significant number or critical importance of dependent projects, making essential security updates or bugfixes unavoidable.
- The company mandates updates to an EOL version (for example, branding or font changes).
- Any other exceptional case should be discussed within the team in a timeboxed manner, with a collective decision made afterwards.

## Consequences

If we continue editing EOL versions, the following consequences will probably become true:

- **Resource Drain**: Team time and effort will be diverted from current and future Design System development to maintain outdated versions.
- **Increased Complexity**: Managing multiple legacy branches makes it harder to track changes, apply fixes, and ensure consistency across versions.
- **Confusion for Consumers**: Teams using the Design System may have unclear expectations about support, leading to more requests and dependency on unsupported versions.
- **Reduced Innovation**: Focus on legacy support limits the team's ability to deliver new features and improvements in actively maintained versions.
- **Financial Cost**: Ongoing work on EOL versions consumes budget that could be better spent on strategic priorities.

A clear EOL policy helps avoid these negative outcomes and keeps the team focused on delivering value through current and future releases.
