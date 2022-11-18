export const parameters = {
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': {
      title: 'Documentation',
      index: -1,
    },
    canvas: {
      title: 'Playground'
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
