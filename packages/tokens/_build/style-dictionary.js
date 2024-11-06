import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';
import { register } from '@tokens-studio/sd-transforms';
import { FILE_HEADER, TOKENSET_PREFIX } from './constants.js';
import { getSetName, getSet, getTokenValue } from './methods.js';
import { deepmerge, textoutput } from './utils/index.js';

register(StyleDictionary);

StyleDictionary.registerFileHeader({
  name: 'swisspost/file-header',
  fileHeader: () => {
    return FILE_HEADER;
  },
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
 * Used to filter only the tokens of the current tokenset
 * and output them in the corresponding tokens file (e.g. core, mode/light, etc.).
 */
StyleDictionary.registerFilter({
  name: 'swisspost/tokenset-filter',
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

StyleDictionary.registerFilter({
  name: 'swisspost/tailwind-filter',
  filter: token => {
    return token.filePath.includes('/output/');
  },
});

StyleDictionary.registerFormat({
  name: 'swisspost/tailwind-format',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file, commentStyle: 'short' });
    const tailwindTokensObject = dictionary.allTokens.reduce((allTokens, token) => {
      const tokenObj = token.path
        .slice(token.path.indexOf(TOKENSET_PREFIX) + 1)
        .reverse()
        .reduce((res, p) => ({ [p]: res }), getTokenValue(options, token));

      return deepmerge(allTokens, tokenObj);
    }, {});

    return header + `export default {${textoutput(tailwindTokensObject)}\n};\n`;
  },
});

export default StyleDictionary;
