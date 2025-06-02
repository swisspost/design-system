import { fileHeader } from 'style-dictionary/utils';
import { TOKENSET_NAMES } from '../constants.js';
import StyleDictionary from '../style-dictionary.js';
import { registerConfigMethod, getTokenValue } from '../methods.js';

/**
 * Registers a config method to generate output files for utility tokens.
 */
registerConfigMethod((tokenSets, { sourcePath, buildPath }) => {
  const { type, layer, filePath, sets } = tokenSets.output[TOKENSET_NAMES.Utilities];

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
            filter: 'swisspost/source-tokens-filter',
            format: 'swisspost/utility-format',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  };
});

/**
 * Registers the format of the utility output file.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/utility-format',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file, commentStyle: 'short' });

    const utilityTokens = new Map();

    dictionary.allTokens.forEach(token => {
      const { subitem, state } = token.attributes;

      const previousStates = utilityTokens.get(subitem) ?? [];
      const newState = `\n  ${state}: ${getTokenValue(options, token)},`;

      utilityTokens.set(subitem, [...previousStates, newState]);
    });

    const utilityMaps = Array.from(utilityTokens.entries()).map(([subitem, values]) => {
      return `$${subitem}: (${values.join('')}\n);\n`;
    });

    return header + utilityMaps.join('\n');
  },
});
