import { DEPENDENCIES, getVersion } from '../utils/version';
import metaStyles from '../stories/getting-started/packages/styles/styles.stories';
import metaComponents from '../stories/getting-started/packages/components/components.stories';
import metaComponentsAngular from '../stories/getting-started/packages/components-angular/components-angular.stories';
import metaInternetHeader from '../stories/getting-started/packages/internet-header/internet-header.stories';
import metaIntranetHeader from '../stories/getting-started/packages/intranet-header/intranet-header.stories';
import metaIcons from '../stories/getting-started/packages/icons/package-icons.stories';
import { PackageType } from '../../types';

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
    name: 'Internet-Header',
    docsStoryId: metaInternetHeader.id,
    type: PackageType.Wc,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/internet-header',
        ariaLabel: 'Source of Internet-Header package',
      },
      docs: {
        href: generateDocsRelativeLink(metaInternetHeader.id),
        ariaLabel: 'Getting started with Internet-Header package',
      },
    },
    img: {
      src: '/assets/images/packages/internet-header.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/internet-header'])}`,
  },
  {
    name: 'Intranet-Header',
    docsStoryId: metaIntranetHeader.id,
    type: PackageType.Angular,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/intranet-header-workspace/projects/intranet-header',
        ariaLabel: 'Source of Intranet-Header package',
      },
      docs: {
        href: generateDocsRelativeLink(metaIntranetHeader.id),
        ariaLabel: 'Getting started with Intranet-Header package',
      },
    },
    img: {
      src: '/assets/images/packages/intranet-header.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-intranet-header'])}`,
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
];

function generateDocsRelativeLink(storyId: string) {
  return `/?path=/docs/${storyId}--docs`;
}
