import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { getFileHeader, getSetName, getSet, getTokenValue } from './methods.js';

register(StyleDictionary);

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
  format: ({ dictionary, options }) => {
    const { meta } = options;

    return (
      getFileHeader() +
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

export default StyleDictionary;
