import { registerTransforms, permutateThemes } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { promises } from 'fs';

const SOURCE_PATH = './tokensstudio-generated/';
const BUILD_PATH = './dist/';
const FILENAME_PREFIX = '_tokens.';

registerTransforms(StyleDictionary);
run();

async function run() {
  const builtTime = performance.now();
  const cliOptions = {
    verbosity: null,
  };

  setCliOptions();

  const themesFile = JSON.parse(await promises.readFile(`${SOURCE_PATH}$themes.json`, 'utf-8'));
  const themes = permutateThemes(themesFile, { separator: '-' });
  const configs = getConfigs(themes);

  await Promise.all(configs.map(build));

  console.clear();
  console.log(`\x1b[0;32m✓ Tokens built in ${Math.round(performance.now() - builtTime)}ms\x1b[0m`);

  function setCliOptions() {
    const CLI_OPTION_KEYS = Object.keys(cliOptions);

    process.argv.slice(2).forEach(arg => {
      const option = arg.split('=');
      const optionKey = option[0].slice(2);
      const isOption =
        /^--[a-zA-Z-_]+=[a-zA-Z-_]+$/.test(arg) && CLI_OPTION_KEYS.includes(optionKey);

      if (isOption) cliOptions[optionKey] = option[1];
    });
  }

  async function build(config) {
    const sd = new StyleDictionary(config);
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
  }

  function getConfigs(t) {
    return Object.entries(t).map(([name, tokensets]) => ({
      log: {
        verbosity: cliOptions.verbosity,
      },
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
              options: {
                outputReferences: true,
              },
            },
          ],
        },
      },
    }));
  }
}
