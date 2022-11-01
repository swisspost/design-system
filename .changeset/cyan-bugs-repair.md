---
'@swisspost/design-system-demo': patch
---

Refactored dynamic attribute bindings. Refactored bindings from `class="class1 class2-{{ angularVariable }}"` to `class="class1" [class]="'class2-' + {{ angularVariable }}"`.
