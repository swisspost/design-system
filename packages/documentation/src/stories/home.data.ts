import { DEPENDENCIES, getVersion } from '../utils/version';
import metaStyles from './getting-started/packages/styles/styles.stories';
import metaComponents from './getting-started/packages/components/components.stories';
import metaComponentsAngular from './getting-started/packages/components-angular/angular.stories';
import metaInternetHeader from './getting-started/packages/internet-header/internet-header.stories';
import metaIntranetHeader from './getting-started/packages/intranet-header/intranet-header.stories';
import metaIcons from './getting-started/packages/icons/package-icons.stories';

interface IPackage {
  name: string;
  docsStoryId: string;
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

interface ITechnology {
  name: string;
  href: string;
  img: {
    src: string;
    alt: string;
  };
}

export const packages: IPackage[] = [
  {
    name: 'Styles',
    docsStoryId: metaStyles.id,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/styles',
        ariaLabel: 'Source of Styles package',
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
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/components',
        ariaLabel: 'Source of Components package',
      },
    },
    img: {
      src: '/assets/images/packages/components.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-components'])}`,
  },
  {
    name: 'Components Angular',
    docsStoryId: metaComponentsAngular.id,
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/components-angular',
        ariaLabel: 'Source of Components for Angular package',
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
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/internet-header',
        ariaLabel: 'Source of Internet-Header package',
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
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/intranet-header-workspace/projects/intranet-header',
        ariaLabel: 'Source of Intranet-Header package',
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
    link: {
      github: {
        href: 'https://github.com/swisspost/design-system/tree/main/packages/icons',
        ariaLabel: 'Source of Icons package',
      },
    },
    img: {
      src: '/assets/images/packages/icons.svg',
      alt: '',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-icons'])}`,
  },
];

export const technologies: ITechnology[] = [
  {
    name: 'Figma',
    href: 'https://www.figma.com/',
    img: {
      src: '/assets/images/technologies/logo-figma.svg',
      alt: 'Figma Logo',
    },
  },
  {
    name: 'pnpm',
    href: 'https://pnpm.io/',
    img: {
      src: '/assets/images/technologies/logo-pnpm.svg',
      alt: 'Pnpm Logo',
    },
  },
  {
    name: 'Changesets',
    href: 'https://github.com/changesets/changesets',
    img: {
      src: '/assets/images/technologies/logo-changesets.png',
      alt: 'Changesets Logo',
    },
  },
  {
    name: 'Vite',
    href: 'https://vitejs.dev/',
    img: {
      src: '/assets/images/technologies/logo-vite.svg',
      alt: 'Vite Logo',
    },
  },
  {
    name: 'Gulp',
    href: 'https://gulpjs.com/',
    img: {
      src: '/assets/images/technologies/logo-gulp.svg',
      alt: 'Gulp Logo',
    },
  },
  {
    name: 'Bootstrap',
    href: `https://getbootstrap.com/docs/${getVersion('bootstrap', 'Mm')}`,
    img: {
      src: '/assets/images/technologies/logo-bootstrap.svg',
      alt: 'Bootstrap Logo',
    },
  },
  {
    name: 'Typescript',
    href: 'https://www.typescriptlang.org/',
    img: {
      src: '/assets/images/technologies/logo-typescript.svg',
      alt: 'Typescript Logo',
    },
  },
  {
    name: 'Sass',
    href: 'https://sass-lang.com/',
    img: {
      src: '/assets/images/technologies/logo-sass.svg',
      alt: 'Sass Logo',
    },
  },
  {
    name: 'Stencil JS',
    href: 'https://stenciljs.com/',
    img: {
      src: '/assets/images/technologies/logo-stencil.png',
      alt: 'Stencil JS Logo',
    },
  },
  {
    name: 'Angular',
    href: 'https://angular.io/',
    img: {
      src: '/assets/images/technologies/logo-angular.svg',
      alt: 'Angular Logo',
    },
  },
  {
    name: 'React JS',
    href: 'https://reactjs.org/',
    img: {
      src: '/assets/images/technologies/logo-react.svg',
      alt: 'React JS Logo',
    },
  },
  {
    name: 'SVGO',
    href: 'https://github.com/svg/svgo',
    img: {
      src: '/assets/images/technologies/logo-svgo.svg',
      alt: 'SVGO Logo',
    },
  },
  {
    name: 'Jest',
    href: 'https://jestjs.io/',
    img: {
      src: '/assets/images/technologies/logo-jest.svg',
      alt: 'Jest Logo',
    },
  },
  {
    name: 'Cypress',
    href: 'https://www.cypress.io/',
    img: {
      src: '/assets/images/technologies/logo-cypress.svg',
      alt: 'Cypress Logo',
    },
  },
  {
    name: 'Percy',
    href: 'https://percy.io/',
    img: {
      src: '/assets/images/technologies/logo-percy.svg',
      alt: 'Percy Logo',
    },
  },
  {
    name: 'Storybook',
    href: 'https://storybook.js.org/',
    img: {
      src: '/assets/images/technologies/logo-storybook.svg',
      alt: 'Storybook Logo',
    },
  },
  {
    name: 'github',
    href: 'https://github.com/',
    img: {
      src: '/assets/images/technologies/logo-github.svg',
      alt: 'github Logo',
    },
  },
].sort((a, b) => {
  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();

  if (aName < bName) return -1;
  else if (aName > bName) return 1;
  else return 0;
});
