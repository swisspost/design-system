---
'@swisspost/internet-header': patch
---

Fixed an issue with the search redirect to track and trace. The track and trace API `ok` response type changed from boolean to string. The new type is now supported in the redirect logic.
