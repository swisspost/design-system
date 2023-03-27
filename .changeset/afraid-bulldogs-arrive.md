---
'@swisspost/internet-header': minor
---

Added the possibility to configure the header via `script` tag for Poratl specific integrations. A `lang` attribute on the html element is required for this solution to work as well as a `<script id="PPM_HEADER_DATA" type="application/json">` tag containing the header config for the defined language.
