import { DEPENDENCIES, getVersion } from '@/utils/version';

interface ITechnology {
  name: string;
  href: string;
  img: {
    src: string;
    alt: string;
  };
}

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
    href: `https://getbootstrap.com/docs/${getVersion(DEPENDENCIES['bootstrap'], 'Mm')}`,
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

interface IBrowser {
  name: string;
  version: string;
  img: {
    src: string;
    alt: string;
  };
}

export const browsers: IBrowser[] = [
  {
    name: 'Chrome & Android',
    version: 'Last 2 versions',
    img: {
      src: '/assets/images/browsers/chrome.svg',
      alt: 'Chrome Logo',
    },
  },
  {
    name: 'Firefox',
    version: 'Last 2 versions',
    img: {
      src: '/assets/images/browsers/firefox.svg',
      alt: 'Firefox Logo',
    },
  },
  {
    name: 'Edge',
    version: 'Last 2 versions',
    img: {
      src: '/assets/images/browsers/edge.svg',
      alt: 'Edge Logo',
    },
  },
  {
    name: 'Safari & iOS Safari',
    version: 'Last 2 versions',
    img: {
      src: '/assets/images/browsers/safari.svg',
      alt: 'Safari Logo',
    },
  },
  {
    name: 'Samsung Internet',
    version: 'Last 2 versions',
    img: {
      src: '/assets/images/browsers/samsung.svg',
      alt: 'Samsung Internet Logo',
    },
  },
];
