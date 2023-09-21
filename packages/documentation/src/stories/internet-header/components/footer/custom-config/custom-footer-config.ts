const footerBlock = (lang: string) => ({
  footer: {
    block: {
      title: `Eigene Footer-Konfiguration (${lang})`,
      links: [
        { url: 'https://fireship.io', text: 'Fireship.io', target: '_blank' },
        { url: 'https://css-tricks.com', text: 'CSS-Tricks', target: '_blank' },
        { url: 'https://web.dev', text: 'web.dev', target: '_blank' },
        { url: 'https://developer.mozilla.org', text: 'MDN Web Docs', target: '_blank' },
        { url: 'https://getbootstrap.com', text: 'Bootstrap', target: '_blank' },
        { url: 'https://google.com', text: 'Google', target: '_blank' },
        { url: 'https://microsoft.com', text: 'Microsoft', target: '_blank' },
      ],
    },
  },
});

export default {
  de: footerBlock('de'),
  fr: footerBlock('fr'),
  it: footerBlock('it'),
  en: footerBlock('en'),
};
