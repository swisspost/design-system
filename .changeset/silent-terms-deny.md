---
'@swisspost/internet-header': patch
---

Added abort controller for all existing post-search search endpoints, to avoid running parallel calls for the same endpoint and therefore get outdated suggestions in the search suggestion list.
