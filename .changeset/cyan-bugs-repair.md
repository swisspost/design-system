---
'@swisspost/design-system-demo': patch
---

Refactors dynamic attribute bindings.
Switches bindings from class="class1 class2-{{ angularVariable }}" to class="class1" [class]="'class2-' + {{ angularVariable }}".
