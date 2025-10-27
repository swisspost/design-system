import { DEPENDENCIES, getVersion } from '@/utils/version';

import metaStyles from '@/stories/packages/styles/styles.stories';
import metaComponents from '@/stories/packages/components/components.stories';
import metaComponentsAngular from '@/stories/packages/components-angular/components-angular.stories';
import metaComponentsReact from '@/stories/packages/components-react/components-react.stories';
import metaIcons from '@/stories/packages/icons/package-icons.stories';
import metaTokens from '@/stories/packages/tokens/tokens.stories';
import { PackageType } from '@/../types';

interface IPackage {
  name: string;
  docsStoryId: string;
  type: PackageType;
  link: {
    [key: string]: {
      href: string;
      ariaLabel: string;
    };
  };
  img: {
    src: string;
    alt: string;
  };
  version: string;
}

export const packages: IPackage[] = [
  {
    name: 'Styles',
    docsStoryId: metaStyles.id,
    type: PackageType.Html,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/styles',
        ariaLabel: 'Source of Styles package',
      },
      docs: {
        href: generateDocsRelativeLink(metaStyles.id),
        ariaLabel: 'Getting started with Styles package',
      },
    },
    img: {
      src: '/assets/images/packages/styles.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-styles'])}`,
  },
  {
    name: 'Components',
    docsStoryId: metaComponents.id,
    type: PackageType.Wc,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/components',
        ariaLabel: 'Source of Components package',
      },
      docs: {
        href: generateDocsRelativeLink(metaComponents.id),
        ariaLabel: 'Getting started with Components package',
      },
    },
    img: {
      src: '/assets/images/packages/components.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-components'])}`,
  },
  {
    name: 'Components for Angular',
    docsStoryId: metaComponentsAngular.id,
    type: PackageType.Angular,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/components-angular',
        ariaLabel: 'Source of Components for Angular package',
      },
      docs: {
        href: generateDocsRelativeLink(metaComponentsAngular.id),
        ariaLabel: 'Getting started with Components for Angular package',
      },
    },
    img: {
      src: '/assets/images/packages/components-angular.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-components-angular'])}`,
  },
  {
    name: 'Components for React',
    docsStoryId: metaComponentsReact.id,
    type: PackageType.React,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/components-react',
        ariaLabel: 'Source of Components for React package',
      },
      docs: {
        href: generateDocsRelativeLink(metaComponentsReact.id),
        ariaLabel: 'Getting started with Components for React package',
      },
    },
    img: {
      src: '/assets/images/packages/components-react.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-components-react'])}`,
  },
  {
    name: 'Icons',
    docsStoryId: metaIcons.id,
    type: PackageType.Assets,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/icons',
        ariaLabel: 'Source of Icons package',
      },
      docs: {
        href: generateDocsRelativeLink(metaIcons.id),
        ariaLabel: 'Getting started with Icons package',
      },
    },
    img: {
      src: '/assets/images/packages/icons.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-icons'])}`,
  },
  {
    name: 'Tokens',
    docsStoryId: metaTokens.id,
    type: PackageType.Assets,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/tokens',
        ariaLabel: 'Source of Tokens package',
      },
      docs: {
        href: generateDocsRelativeLink(metaTokens.id),
        ariaLabel: 'Getting started with Tokens package',
      },
    },
    img: {
      src: '/assets/images/packages/tokens.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-tokens'])}`,
  },
];

function generateDocsRelativeLink(storyId: string) {
  return `/?path=/docs/${storyId}--docs`;
}
