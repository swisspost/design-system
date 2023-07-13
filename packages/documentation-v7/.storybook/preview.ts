import type { Preview } from '@storybook/react';
import CustomDocsContainer from './blocks/docs/layout';
import { BADGE } from './constants';
import postThemes from './post-themes';
import './preview.scss';
import './register-web-components';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Home',
          'Getting Started',
          [ 'Styles', 'Components' ],
          'Foundations',
          [ 'Typography', 'Color', 'Layout', 'Elevation', 'Accessibility' ],
          'Components',
          'Internet Header',
          [ 'Getting started', 'Migration Guide', 'Components', [ 'Header', 'Breadcrumbs', 'Footer' ] ],
          'Icons',
          [ 'Getting started', 'Search Icons', 'Components' ],
          'Templates',
          'Utilities',
          'Misc',
          [ 'Migration Guide', 'ChangeLog', 'Versions' ],
          'Hidden',
        ],
      },
    },
    docs: {
      container: CustomDocsContainer,
      source: {
        excludeDecorators: true,
      },
    },
    darkMode: {
      current: 'light',
      dark: postThemes.dark,
      light: postThemes.light,
      darkClass: 'bg-dark',
      lightClass: 'bg-white',
      stylePreview: true,
    },
    badgesConfig: {
      [BADGE.BETA]: {
        styles: {
          backgroundColor: 'var(--post-yellow)',
          color: '#000',
          borderColor: 'transparent',
        },
        title: 'Beta',
        tooltip: {
          desc: 'This documentation page is still in beta mode and might not be complete yet.',
        },
      },
      [BADGE.NEEDS_REVISION]: {
        styles: {
          backgroundColor: 'var(--post-gray-10)',
          color: '#000',
          borderColor: 'transparent',
        },
        title: 'Needs revision',
        tooltip: {
          desc: 'This page is pending revision from a UX Designer.',
        },
      },
      [BADGE.STABLE]: {
        styles: {
          backgroundColor: 'var(--post-success)',
          color: '#fff',
          borderColor: 'transparent',
        },
        title: 'Stable',
        tooltip: {
          desc: 'The content of this page is ready to be used in production.',
        },
      },
      [BADGE.TODO]: {
        styles: {
          backgroundColor: 'var(--post-danger)',
          color: '#fff',
          borderColor: 'transparent',
        },
        title: 'TODO',
        tooltip: {
          desc: 'This page needs to be filled with content and serves as a placeholder in the meantime.',
        },
      },
    },
  },
};

export default preview;
