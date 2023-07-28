---
'@swisspost/internet-header': patch
---

Fixed an issue with uppercase environment strings. Uppercase environment strings caused issues with mapping to datasets throughout the header. Now the property is being converted to lowercase internally.
