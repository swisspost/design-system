import { fileHeader } from 'style-dictionary/utils';
import { TOKENSET_LAYERS, TOKENSET_NAMES, TOKENSET_PREFIX } from '../constants.js';
import StyleDictionary from '../style-dictionary.js';
import { registerConfigMethod, getTokenValue } from '../methods.js';

/**
 * Registers a config method to generate output files for utility tokens.
 */
registerConfigMethod((tokenSets, { sourcePath, buildPath }) => {
  return Object.entries(tokenSets.output)
    .filter(
      ([name, { layer }]) =>
        layer === TOKENSET_LAYERS.component && name === TOKENSET_NAMES.Utilities,
    )
    .map(([_name, { type, layer, filePath, sets }]) => {
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
          utilities: {
            transforms: ['name/kebab'],
            buildPath,
            files: [
              {
                destination: `_utilities-formatted.scss`,
                format: 'swisspost/utility-format',
                filter: 'swisspost/utility-filter',
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
 * Filters only the component layer tokens defined in the utility tokensets.
 */
StyleDictionary.registerFilter({
  name: 'swisspost/utility-filter',
  filter: token => {
    return token.filePath.includes('/output/');
  },
});

/**
 * Registers the format of the utility output file.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/utility-format',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file, commentStyle: 'short' });

    const utilityTokensObject = {};

    dictionary.allTokens.forEach(token => {
      const [utilityName, utilityKey] = token.path.slice(token.path.indexOf(TOKENSET_PREFIX) + 2);

      const previousUtilityValues = utilityTokensObject[utilityName] ?? [];
      utilityTokensObject[utilityName] = [
        ...previousUtilityValues,
        `\n  ${utilityKey}: ${getTokenValue(options, token)},`,
      ];
    });

    const textOutputs = Object.entries(utilityTokensObject).map(([utilityName, utilityValues]) => {
      return `$${utilityName}: (${utilityValues.join('')}\n);\n`;
    });

    return header + textOutputs.join('\n');
  },
});
