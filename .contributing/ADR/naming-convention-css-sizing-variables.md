# Naming Convention - CSS sizing variables

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/4394>

We used a naming system to describe spacing sizes (small, regular, large, huge, big, etc.). With the increasing need for more and more different spacings, it got difficult to tell which name describes which pixel size (is big bigger than huge and is there something in between?). In [#588](https://github.com/swisspost/design-system/discussions/588) we decided to change to a pixel based naming scheme.

## Decision

We're naming utility classes for sizings and spacings according to the resulting pixel value.

- It's easy to decide which utility class to use when measuring distances in Figma
- Intermediary sizes can easily be added without changing existing classes
- Naming system is scalable

## Consequences

This is a large breaking change, introduced with v9. All projects using sizing/spacing classes have to be updated. For a large number of projects, automatic migrations should ease the pain.

## Example

Spacings in v9 preview: <https://next.design-system.post.ch/?path=/docs/facaacfd-18f1-49b4-80f1-a96680730fa0--docs>
