# Swisspost Intranet Header

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

The Angular header component for Intranet applications.

## Documentation

- Technical docs: [Swiss Post Design System](https://design-system.post.ch/#/post-samples/intranet-layout)
- Design docs: [Experience Hub](https://www.experience-hub.ch/document/2803)

## Usage

Install the header in your Angular project:

```bash
npm install @swisspost/design-system-intranet-header
```

In your `app.module.ts`, add the header to your imports:

```typescript
// Other imports ....
import { SwissPostIntranetHeaderModule } from '@swisspost/design-system-intranet-header';

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

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [intranet header contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](../../../../CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.
