import type { Preview } from '@storybook/web-components';
import { format } from 'prettier';

import DocsLayout from './blocks/layout';
import { badgesConfig, prettierOptions, resetComponents } from './helpers';
import './helpers/register-web-components';

import './styles/preview.scss';
import themes from './styles/themes';

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
        ]
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
      source: {
        excludeDecorators: true,
        transform: (snippet: string) => format(snippet, prettierOptions),
      },
      components: resetComponents,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    badgesConfig,
  },
};

export default preview;
