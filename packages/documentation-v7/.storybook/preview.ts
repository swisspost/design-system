import type { Preview } from '@storybook/web-components';

import themes from './themes/base';
import './themes/preview.scss';

import DocsLayout from './blocks/docs/layout';
const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Home',
          'Getting Started',
          ['Styles', 'Components'],
          'Foundations',
          ['Typography', 'Color', 'Layout', 'Elevation', 'Accessibility'],
          'Components',
          'Internet Header',
          ['Getting started', 'Migration Guide', 'Components', ['Header', 'Breadcrumbs', 'Footer']],
          'Intranet Header',
          ['Getting started'],
          'Icons',
          ['Getting started', 'Search Icons', 'Components'],
          'Templates',
          'Utilities',
          'Misc',
          ['Migration Guide', 'ChangeLog', 'Versions'],
          'Hidden',
        ],
      },
    },
    darkMode: {
      current: 'light',
      dark: themes.dark,
      light: themes.light,
      darkClass: 'bg-dark',
      lightClass: 'bg-white',
      stylePreview: true,
    },
    docs: {
      container: DocsLayout,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
