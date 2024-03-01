import { DEPENDENCIES, getVersion } from '../utils/version';

interface IPackage {
  name: string;
  href: string;
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
    href: 'https://github.com/swisspost/design-system/tree/main/packages/styles',
    img: {
      src: '/assets/images/packages/styles.svg',
      alt: 'design-system-styles package logo',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-styles'])}`,
  },
  {
    name: 'Components',
    href: 'https://github.com/swisspost/design-system/tree/main/packages/components',
    img: {
      src: '/assets/images/packages/components.svg',
      alt: 'design-system-components package Logo',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-components'])}`,
  },
  {
    name: 'Components Angular',
    href: 'https://github.com/swisspost/design-system/tree/main/packages/components-angular',
    img: {
      src: '/assets/images/packages/components-angular.svg',
      alt: 'design-system-components-angular package Logo',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-components-angular'])}`,
  },
  {
    name: 'Internet-Header',
    href: 'https://github.com/swisspost/design-system/tree/main/packages/internet-header',
    img: {
      src: '/assets/images/packages/internet-header.svg',
      alt: 'internet-header package Logo',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/internet-header'])}`,
  },
  {
    name: 'Intranet-Header',
    href: 'https://github.com/swisspost/design-system/tree/main/packages/intranet-header-workspace/projects/intranet-header',
    img: {
      src: '/assets/images/packages/intranet-header.svg',
      alt: 'design-system-intranet-header package Logo',
    },
    version: `v${getVersion(DEPENDENCIES['@swisspost/design-system-intranet-header'])}`,
  },
  {
    name: 'Icons',
    href: 'https://github.com/swisspost/design-system/tree/main/packages/icons',
    img: {
      src: '/assets/images/packages/icons.svg',
      alt: 'design-system-icons package Logo',
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
