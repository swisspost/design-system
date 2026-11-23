import { addA11yTests } from '../shared/a11y';

interface PaletteDefinition {
  name: string;
  scheme: 'even' | 'swapped' | 'light' | 'dark';
}

interface ThemeDefinition {
  name: string;
  palettes: PaletteDefinition[];
}

const THEME_PALETTE_DEFINITIONS: ThemeDefinition[] = [
  {
    name: 'Post',
    palettes: [
      { name: 'Default', scheme: 'even' },
      { name: 'Alternate', scheme: 'even' },
      { name: 'Accent', scheme: 'swapped' },
      { name: 'Brand', scheme: 'light' },
    ],
  },
  {
    name: 'Cargo',
    palettes: [
      { name: 'Default', scheme: 'even' },
      { name: 'Aternate', scheme: 'even' },
      { name: 'Accent', scheme: 'light' },
      { name: 'Brand', scheme: 'dark' },
    ],
  },
];

const SCHEMES = ['light', 'dark'];

function testGenerator(
  callback: (theme: string, scheme: string, palette: PaletteDefinition) => void,
) {
  THEME_PALETTE_DEFINITIONS.forEach(theme => {
    SCHEMES.forEach(scheme => {
      theme.palettes.forEach(palette => {
        callback(theme.name, scheme, palette);
      });
    });
  });
}

function isDark(color: string) {
  const rgb = color.match(/\d+/g);

  if (rgb) {
    const [r, g, b] = rgb.map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }

  return false;
}

describe('Palette', () => {
  testGenerator((theme, scheme, palette) => {
    const THEME_STYLES_URL = `/styles/${theme.toLowerCase()}-default.css`;

    describe(`${theme}: ${scheme} - Palette ${palette.name}`, () => {
      beforeEach(() => {
        cy.visit('/iframe.html?id=43481535-5b39-40b5-a273-478b07dc3b31--default');

        cy.get('[data-color-scheme]', { timeout: 30000 })
          .as('schemecontainer')
          .should('be.visible');
        cy.get('link[href="/styles/post-default.css"]').as('theme-css');
        cy.get('.palette').as('palette');

        // update theme stylesheet (if needed)
        cy.get('@theme-css')
          .invoke('attr', 'href')
          .then(href => {
            if (href !== THEME_STYLES_URL) {
              cy.intercept('GET', THEME_STYLES_URL).as('load-theme-styles');
              cy.get('@theme-css').invoke('attr', 'href', THEME_STYLES_URL);
              cy.wait('@load-theme-styles');
            }
          });

        // update page color-scheme
        cy.get('@schemecontainer').invoke('attr', 'data-color-scheme', scheme);

        // update palette variant
        cy.get('@palette')
          .invoke('removeClass', 'palette-default')
          .invoke('addClass', `palette-${palette.name.toLowerCase()}`);
      });

      it(`should have a color-scheme "${palette.scheme}"`, () => {
        cy.get('@schemecontainer').then($container => {
          const containerStyles = window.getComputedStyle($container.get(0));
          const containerScheme = containerStyles.getPropertyValue('color-scheme');

          cy.get('@palette').then($palette => {
            const paletteStyles = window.getComputedStyle($palette.get(0));
            const paletteScheme = paletteStyles.getPropertyValue('color-scheme');

            // check if palette color-scheme is set correctly, according to the page color-scheme
            switch (palette.scheme) {
              case 'even':
                // light on light | dark on dark
                expect(paletteScheme).to.equal(containerScheme);
                break;
              case 'swapped':
                // dark on light | light on dark
                expect(paletteScheme).to.not.equal(containerScheme);
                break;
              case 'light':
                // light on light | light on dark
                expect(paletteScheme).to.equal('light');
                break;
              case 'dark':
                // dark on light | dark on dark
                expect(paletteScheme).to.equal('dark');
                break;
            }
          });
        });
      });

      it(`should have a background- and foreground-color matching its color-scheme`, () => {
        cy.get('@palette').then($palette => {
          const paletteStyles = window.getComputedStyle($palette.get(0));
          const paletteScheme = paletteStyles.getPropertyValue('color-scheme');
          const paletteBg = paletteStyles.getPropertyValue('background-color');
          const paletteFg = paletteStyles.getPropertyValue('color');

          // check if palette background- and foreground-color are set correctly, according to the palette color-scheme
          switch (paletteScheme) {
            case 'light':
              expect(isDark(paletteBg)).to.equal(false);
              expect(isDark(paletteFg)).to.equal(true);
              break;
            case 'dark':
              expect(isDark(paletteBg)).to.equal(true);
              expect(isDark(paletteFg)).to.equal(false);
              break;
          }
        });
      });
    });
  });
});

addA11yTests({
  storyName: 'palette',
  storySelector: '.palette-default',
});
