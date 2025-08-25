---
'@swisspost/design-system-components-angular': major
---

Updated Angular components to output as standalone components to align with Angular 20's default approach where components are standalone by default, eliminating the need to declare them within NgModules. Developers using our components should replace `PostComponentsModule` imports with `providePostComponents()` in their app providers and import individual components (e.g., `import { PostIcon, PostButton } from '@swisspost/design-system-components-angular'`) for standalone use.

**Before:**

```ts
//app.module.ts
import { NgModule } from '@angular/core'
import { PostComponentsModule } from '@swisspost/design-system-components-angular';

@NgModule({
    imports: [PostComponentsModule],
})
export class AppModule {}
```

**After:**

```ts
//app.module.ts
import { NgModule } from '@angular/core'
import { providePostComponents } from '@swisspost/design-system-components-angular';

@NgModule({
    provider: [providePostComponents()]
})
export class AppModule {}
```

