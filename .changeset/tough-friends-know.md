---
'@swisspost/design-system-components-angular': major
---

Updated Angular components to output as standalone components to align with Angular 20's default approach where components are standalone by default, eliminating the need to declare them within NgModules. Developers using our components should replace `PostComponentsModule` imports with `providePostComponents()` in their app providers and import individual components (e.g., `import { PostIcon, PostButton } from '@swisspost/design-system-components-angular'`) for standalone use.

BEFORE:
```typescript
// app.module.ts
@NgModule({
  imports: [
    PostComponentsModule,
  ],
})
```

AFTER:
```typescript
//app.module.ts
@NgModule({
  providers: [
    providePostComponents(),
  ],
})
```
