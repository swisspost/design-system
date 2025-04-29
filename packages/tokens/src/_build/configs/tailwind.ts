import { fileHeader } from 'style-dictionary/utils';
import { TOKENSET_LAYERS, TOKENSET_NAMES, TOKENSET_PREFIX } from '../constants.js';
import StyleDictionary from '../style-dictionary.js';
import { registerConfigMethod, getTokenValue } from '../methods.js';
import { objectDeepmerge, objectTextoutput } from '../utils/index.js';

const TAILWIND_TOKENSET_NAMES = [TOKENSET_NAMES.Utilities, TOKENSET_NAMES.Helpers];

/**
 * Registers a config getter method to generate output files for tailwind relevant tokens in the tokens.json.
 */
registerConfigMethod((tokenSets, { sourcePath, buildPath }) => {
  return Object.entries(tokenSets.output)
    .filter(
      ([name, { layer }]) =>
        layer === TOKENSET_LAYERS.component && TAILWIND_TOKENSET_NAMES.includes(name),
    )
    .map(([name, { type, layer, filePath, sets }]) => {
      return {
        meta: {
          type,
          layer,
          filePath,
          setNames: Object.keys(sets),
        },
        source: [`${sourcePath}_temp/output/${filePath}`],
        include: [`${sourcePath}_temp/source/**/*.json`],
        platforms: {
          tailwind: {
            transforms: ['name/kebab'],
            buildPath: `${buildPath}tailwind/`,
            files: [
              {
                destination: `${name}.tailwind.js`,
                filter: 'swisspost/source-tokens-filter',
                format: 'swisspost/tailwind-format',
                options: {
                  outputReferences: true,
                },
              },
            ],
          },
        },
      };
    });
});

/**
 * @function StyleDictionary.registerFormat()
 * Defines a custom StyleDictionary format to be used at specific places in the build process.
 *
 * @param object {
 *   name: string,
 *   format: (dictionary: Dictionary, file: File, options: Config & LocalOptions, platform: PlatformConfig) => string
 * }
 *
 * swisspost/tailwind-format:
 * Used to declare the format of the tailwind output files.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/tailwind-format',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file, commentStyle: 'short' });
    const tailwindTokensObject = dictionary.allTokens.reduce((allTokens, token) => {
      const tokenObj = token.path
        .slice(token.path.indexOf(TOKENSET_PREFIX) + 1)
        .reverse()
        .reduce((res, p) => ({ [p]: res }), getTokenValue(options, token));

      return objectDeepmerge(allTokens, tokenObj);
    }, {});

    return header + `export default {${objectTextoutput(tailwindTokensObject)}\n};\n`;
  },
});
