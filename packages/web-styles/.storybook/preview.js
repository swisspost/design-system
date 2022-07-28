import '../src/post-basics.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    classTarget: 'html',
    lightClass: 'bg-white',
    darkClass: 'bg-primary',
    stylePreview: true
  }
}
