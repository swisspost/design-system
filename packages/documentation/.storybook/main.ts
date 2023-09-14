import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  logLevel: 'info',
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
        highlight: false,
        outline: false,
        toolbars: false,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-designs',
    '@storybook/addon-a11y',
    '@geometricpanda/storybook-addon-badges',
    '@pxtrn/storybook-addon-docs-stencil',
  ],
  staticDirs: [
    {
      from: '../public/assets',
      to: '/assets',
    },
    '../public',
    '../node_modules/@swisspost/design-system-icons/public',
  ],
  managerHead: head => `
    <!-- Google Tag Manager -->
    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' });
    
        let f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
    
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-WKSKHGJ');
    </script>
    <!-- End Google Tag Manager -->
    ${head}
  `,
  docs: {
    autodocs: 'tag',
  },
};

export default config;
