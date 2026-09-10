# Localisation for web-components

## Context

How should Design System Components be localised? In #3411 we discussed two different approaches, configuration vs. composition, for translating texts used by the system.

## Decision

We're using composition for translations, enabling users to define all necessary texts.

- Enables users to use any language without the need to update or add specific languages to the Design System
- Lowers maintenance work on Design System side
- Enables precise naming of actions for better descriptions (instead of just "close", the close button could read "close menu" or "close parcel details"
- Offers more flexibility for composing components because the markup is defined on user side and not internalised into the component

An exception to this rule is the Header for Online Services, which will be available with a configuration containing all the translations. This exception makes it easy to transition from the existing Internet Header wich already uses this approach. All data is stored and managed in an external CMS, therefore this exception does not incur any maintenance cost on Design System side.

## Consequences

Users have to define every text either displayed or used as description for screen readers and less abstractions can be made when defining the API for components (see `post-closebutton` in the example below which could be internalised with the config approach).

## Example

```html
<post-alert>
  <h3>Eine Meldung</h3>
  <p>Ein Text einer Meldung</p>

  <!-- A dismissable alert has a button, a non-dismissible alert simply does not have this button -->
  <post-closebutton>Schliessen</post-closebutton>
</post-alert>
```
