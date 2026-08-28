# Major design changes trigger a major version bump

## Context

Discussion: <https://github.com/swisspost/design-system/discussions/5114>

A change in Design is not inherently breaking a build when projects upgrade to a new version. Some Design Changes however can be quite consequential, so much so that it's required to only include them in a new major version.

Discussion: [#3490](https://github.com/swisspost/design-system/issues/3490)

## Decision

When significant Design Changes on one or multiple components are required, the change is declared as a major change with a major version bump.

## Consequences

Major Design Changes have to follow the major release cycle of ca. 1 major release/year. This is not a fixed requirement and depending on the work required for migration, multiple major versions can be published per year. The main decision factor have to be the users of the Design System and the balance between gain and invest on user side.

## Example

The disabled styles for form fields changed from slightly greyed out to a dotted border and strikethrough placeholder/label text. The change had significant consequences for projects that used the disabled state to communicate a loading state or generally un-editable fields instead of showing a loading indicator or hide unnecessary inputs.
