![Swiss Post Logo](https://www.post.ch/-/media/portal-opp/global/logos/logo---die-post.svg?vs=2&sc_lang=en)

<br>

# Swisspost Intranet Header

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Usage

Install the header in your Angular project:

```bash
npm install @swisspost/design-system-header-intranet
```

In your `app.module.ts`, add the header to your imports:
```typescript
// Other imports ....
import { SwissPostIntranetHeaderModule } from "@swisspost/design-system-header-intranet";

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    SwissPostIntranetHeaderModule,
  ],
  // ...
})
export class AppModule {}

```

In your templates, the Intranet Header is available as:

```html
<sp-intranet-header></sp-intranet-header>
```

## Options


## Contributing

Have a look at the [contribution guide](./CONTRIBUTING.md) to learn how you can contribute to this component.
