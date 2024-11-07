import { fileHeader } from 'style-dictionary/utils';
import { expandTypesMap } from '@tokens-studio/sd-transforms';
import StyleDictionary from '../style-dictionary.js';
import { getSetName, getSet, getTokenValue, registerConfigMethod } from '../methods.js';

/**
 * Registers a config getter method to generate output files for all code relevant tokens in the tokens.json.
 */
registerConfigMethod((tokenSets, { sourcePath, buildPath }) => {
  return Object.entries(tokenSets.output).map(([name, { type, layer, filePath, sets }]) => {
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
        scss: {
          transforms: ['name/kebab'],
          buildPath,
          expand: {
            include: ['typography'],
            typesMap: expandTypesMap,
          },
          files: [
            {
              destination: `_${name}.scss`.toLowerCase(),
              format: 'swisspost/scss-format',
              filter: 'swisspost/scss-filter',
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
 * @function StyleDictionary.registerFilter()
 * Defines a custom StyleDictionary filter.
 *
 * @param object {
 *   name: string,
 *   filter: (token: TransformedToken, options: Config) => boolean
 * }
 *
 * swisspost/tokenset-filter:
 * Used to filter only the tokens of the current tokenset (e.g. core, device-desktop, ...).
 */
StyleDictionary.registerFilter({
  name: 'swisspost/scss-filter',
  filter: (token, { meta }) => {
    return token.filePath.includes(`/output/${meta.filePath}`);
  },
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
 * swisspost/scss-format:
 * Used to declare the format of the *.scss output files.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/scss-format',
  format: async ({ dictionary, options, file }) => {
    const { meta } = options;
    const header = await fileHeader({ file, commentStyle: 'short' });

    return (
      header +
      meta.setNames
        .map(setName => {
          const tokenSetName = getSetName(options, setName);
          const tokenSet = getSet(options, dictionary, setName)
            .map(token => {
              const tokenValue = getTokenValue(options, token);

              return meta.layer === 'core'
                ? `  --${token.name}: ${tokenValue};`
                : `  ${token.name}: ${tokenValue},`;
            })
            .join('\n');

          return meta.layer === 'core'
            ? `:root {\n${tokenSet}\n}\n`
            : `$${tokenSetName}: (\n${tokenSet}\n);\n`;
        })
        .join('\n')
    );
  },
});
