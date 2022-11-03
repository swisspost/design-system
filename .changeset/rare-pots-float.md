---
'@swisspost/design-system-styles': minor
---

Added automatic migration functionality which includes cheerio. This enalbes us to write migrations to mutate the html files of a project, with a simple jQuery like selector and with jQuery like update functions (e.g. $element.removeClass('test');, etc.).
