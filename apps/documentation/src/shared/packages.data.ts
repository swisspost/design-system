import metaStyles from '@/stories/packages/styles/styles.stories';
import metaComponents from '@/stories/packages/components/components.stories';
import metaComponentsAngular from '@/stories/packages/components-angular/components-angular.stories';
import metaComponentsReact from '@/stories/packages/components-react/components-react.stories';
import metaInternetHeader from '@/stories/packages/internet-header/internet-header.stories';
import metaIcons from '@/stories/packages/icons/package-icons.stories';
import metaTokens from '@/stories/packages/tokens/tokens.stories';
import metaThemeAGGrid from '@/stories/packages/theme-ag-grid/theme-ag-grid.stories';

import { PackageType } from '@/../types';

export interface IPackage {
  type: PackageType;
  name: string;
  packageName: string;
  dependencyName: string;
  docs: {
    storyId: string;
    linkAriaLabel: string;
  };
  github: {
    linkAriaLabel: string;
  };
  img: {
    src: string;
    alt: string;
  };
}

export const packages: Record<string, IPackage> = {
  'design-system-styles': {
    name: 'Styles',
    packageName: 'styles',
    dependencyName: '@swisspost/design-system-styles',
    docs: {
      storyId: metaStyles.id,
      linkAriaLabel: 'Getting started with Styles package',
    },
    github: {
      linkAriaLabel: 'Source of Styles package',
    },
    type: PackageType.Styles,
    img: {
      src: '/assets/images/packages/styles.svg',
      alt: '',
    },
  },
  'design-system-components': {
    type: PackageType.Wc,
    name: 'Components',
    packageName: 'components',
    dependencyName: '@swisspost/design-system-components',
    docs: {
      storyId: metaComponents.id,
      linkAriaLabel: 'Getting started with Components package',
    },
    github: {
      linkAriaLabel: 'Source of Components package',
    },
    img: {
      src: '/assets/images/packages/components.svg',
      alt: '',
    },
  },
  'design-system-components-angular': {
    type: PackageType.Angular,
    name: 'Components for Angular',
    packageName: 'components-angular',
    dependencyName: '@swisspost/design-system-components-angular',
    docs: {
      storyId: metaComponentsAngular.id,
      linkAriaLabel: 'Getting started with Components for Angular package',
    },
    github: {
      linkAriaLabel: 'Source of Components for Angular package',
    },
    img: {
      src: '/assets/images/packages/components-angular.svg',
      alt: '',
    },
  },
  'design-system-components-react': {
    type: PackageType.React,
    name: 'Components for React',
    packageName: 'components-react',
    dependencyName: '@swisspost/design-system-components-react',
    docs: {
      storyId: metaComponentsReact.id,
      linkAriaLabel: 'Getting started with Components for React package',
    },
    github: {
      linkAriaLabel: 'Source of Components for React package',
    },
    img: {
      src: '/assets/images/packages/components-react.svg',
      alt: '',
    },
  },
  'internet-header': {
    type: PackageType.Wc,
    name: 'Internet-Header',
    packageName: 'internet-header',
    dependencyName: '@swisspost/internet-header',
    docs: {
      storyId: metaInternetHeader.id,
      linkAriaLabel: 'Getting started with Internet-Header package',
    },
    github: {
      linkAriaLabel: 'Source of Internet-Header package',
    },
    img: {
      src: '/assets/images/packages/internet-header.svg',
      alt: '',
    },
  },
  'design-system-icons': {
    type: PackageType.Assets,
    name: 'Icons',
    packageName: 'icons',
    dependencyName: '@swisspost/design-system-icons',
    docs: {
      storyId: metaIcons.id,
      linkAriaLabel: 'Getting started with Icons package',
    },
    github: {
      linkAriaLabel: 'Source of Icons package',
    },
    img: {
      src: '/assets/images/packages/icons.svg',
      alt: '',
    },
  },
  'design-system-theme-ag-grid': {
    type: PackageType.Ts,
    name: 'Theme AG Grid',
    packageName: 'theme-ag-grid',
    dependencyName: '@swisspost/design-system-theme-ag-grid',
    docs: {
      storyId: metaThemeAGGrid.id,
      linkAriaLabel: 'Getting started with Theme AG Grid package',
    },
    github: {
      linkAriaLabel: 'Source of Theme AG Grid package',
    },
    img: {
      src: '/assets/images/packages/theme-ag-grid.svg',
      alt: '',
    },
  },
  'design-system-tokens': {
    type: PackageType.Assets,
    name: 'Tokens',
    packageName: 'tokens',
    dependencyName: '@swisspost/design-system-tokens',
    docs: {
      storyId: metaTokens.id,
      linkAriaLabel: 'Getting started with Tokens package',
    },
    github: {
      linkAriaLabel: 'Source of Tokens package',
    },
    img: {
      src: '/assets/images/packages/tokens.svg',
      alt: '',
    },
  },
};
