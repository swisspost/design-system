# Architecture Decision Records (ADRs)

This directory contains the Architecture Decision Records for the Swiss Post Design System.

## What is an ADR?

An **Architecture Decision Record** captures a single, significant architectural or technical decision, together with its context and consequences. Each record documents:

- **Context** — the problem or situation that motivated the decision.
- **Decision** — the change that was agreed on.
- **Consequences** — what becomes easier or harder as a result.
- **Example** (optional) — a code snippet that supports the decision.

ADRs give us a durable, searchable history of _why_ things are the way they are, so future maintainers don't have to reverse-engineer past reasoning or re-litigate settled discussions.

For a good introduction, see Michael Nygard's [Documenting architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html) and the [architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record) collection.

## Process for creating an ADR

1. **Open a discussion.** Create a new issue using the [_New architecture decision_ issue template](https://github.com/swisspost/design-system/issues/new?template=11-architecture-decision.md). It starts with the `needs: 🏓 dev roundtable` label and the Context / Decision / Consequences / Example structure.
2. **Discuss and agree.** Bring the proposal to the dev roundtable and refine it until the team agrees on the decision.
3. **Record and implement.** Once agreement is reached, remove the `needs: 🏓 dev roundtable` label. This unblocks the decision for implementation. Add the record as a Markdown file in the `.contributing/ADR` folder.

## Conventions

- Use one file per decision, named in kebab-case after the decision title (e.g. `naming-convention-web-components.md`).
- Start each record from the issue template.
- Link back to the originating discussion at the top of the **Context** section.
