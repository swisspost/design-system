# Swiss Post Design System Components-Angular

![Swiss Post Design System splash screen](https://github.com/swisspost/design-system/assets/1659006/e84f1fea-e666-4853-8c85-726a6bf22e6c)

A collection of angular-components built with Stencil JS for the Swiss Post Design System.

## Documentation

- Technical docs: [Swiss Post Design System](https://design-system.post.ch)

## Usage

Install the package in your Angular project:

```bash
npm install @swisspost/design-system-components-angular
```

In your `app.module.ts`, add the provider:

```typescript
// Other imports ....
import { providePostComponents } from '@swisspost/design-system-components-angular';

@NgModule({
  providers: [providePostComponents()],
})
export class AppModule {}
```

Import the components you need directly into your standalone component:

```typescript
// Example: Importing a single component
import { PostIcon } from '@swisspost/design-system-components-angular';

@Component({
  standalone: true,
  selector: 'my-component',
  template: `<post-icon></post-icon>`,
  imports: [PostIcon]
})
export class MyComponent {}

// Example: Importing multiple components
import { PostIcon, PostButton } from '@swisspost/design-system-components-angular';

@Component({
  standalone: true,
  selector: 'my-other-component',
  template: `<post-icon></post-icon><post-button></post-button>`,
  imports: [PostIcon, PostButton]
})
export class MyOtherComponent {}
```

```

## Contribute

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](../../../../CODE_OF_CONDUCT.md)

Considering supporting the Swiss Post Design System with your contribution? Whether you like to contribute new patterns, fix a bug, spotted a typo or have ideas for improvement - we'd love to hear from you. Learn how you can contribute to this project in the [components-angular contribution guidelines](./CONTRIBUTING.md) and also take a look at the [general contribution guidelines](../../../../CONTRIBUTING.md).

For any questions regarding the pattern library, you can reach out on the [discussions page](https://github.com/swisspost/design-system/discussions).

In order to keep our community open and inclusive, we expect you to read and follow our [Code of Conduct](/CODE_OF_CONDUCT.md).

## License

Software contained in this repository is published by the Swiss Post Ltd. under the [Apache 2.0 License](./LICENSE).

© 2024 Swiss Post, Ltd.
