---
'@swisspost/design-system-styles': patch
---

When outside days get hidden, they collapse in their flex context and change the alignment of the first days of the month. Adding flex-grow 1 ensures the hidden days still keep their space so the day labels on top match correctly with the calendar days.
