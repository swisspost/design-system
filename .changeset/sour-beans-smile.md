---
'@swisspost/internet-header': patch
---

Updated the header API origins to support the upcoming migration.
The API is currently available at `int.post.ch` in INT and `site.post.ch` in PROD. In the coming months, the PROD API is expected to move from `site.post.ch` to `www.post.ch`.

This change supports a seamless transition between the PROD hosts, while INT will stay as is. Until the API is available at `www.post.ch`, requests to that host will fail and may produce a console error before the fallback to `site.post.ch` succeeds.