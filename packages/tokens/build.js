import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { promises } from 'fs';

const builtTime = performance.now();

const SOURCE_PATH = './tokensstudio-generated/';
const BUILD_PATH = './dist/';
const FILENAME_PREFIX = '_tokens.';

const themesFile = JSON.parse(
  await promises.readFile(`${SOURCE_PATH}$themes.json`, 'utf-8'),
).filter(t => t.group);
const themes = permutateThemes(themesFile, { separator: '-' });

registerTransforms(StyleDictionary);

getConfigs(themes).forEach(config => {
  const sd = new StyleDictionary();
  sd.extend(config).then(sd => {
    sd.cleanAllPlatforms();
    sd.buildAllPlatforms().then(() => {
      console.log(`\x1b[0;32m✓ Tokens built in ${Math.round(performance.now() - builtTime)}ms\n`);
    });
  });
});

function getConfigs(t) {
  return Object.entries(t).map(([name, tokensets]) => ({
    source: tokensets.map(set => `${SOURCE_PATH}${set}.json`),
    preprocessors: ['tokens-studio'],
    platforms: {
      scss: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: BUILD_PATH,
        files: [
          {
            destination: `${FILENAME_PREFIX}${name}.scss`.toLowerCase(),
            format: 'scss/map-deep',
          },
        ],
      },
    },
  }));
}
