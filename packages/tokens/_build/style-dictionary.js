import StyleDictionary from 'style-dictionary';
import { sortByReference } from 'style-dictionary/utils';
import { register } from '@tokens-studio/sd-transforms';
import { SCSS_MAP_PREFIX } from './constants.js';
import { getFileHeader, normalizeTokenName, normalizeTokenValueReference } from './methods.js';

register(StyleDictionary);

// Can be removed, as soon as box-shadow tokens can be outputted with references
StyleDictionary.registerPreprocessor({
  name: 'swisspost/box-shadow-keep-refs-workaround',
  preprocessor: dictionary => {
    traverse(dictionary);

    function traverse(context) {
      Object.entries(context).forEach(([key, value]) => {
        const usesDtcg = context[key].$type && context[key].$value;
        const isToken = context[key][usesDtcg ? '$type' : 'type'] !== undefined;

        if (isToken) {
          const tokenType = context[key][usesDtcg ? '$type' : 'type'];
          const tokenValue = context[key][usesDtcg ? '$value' : 'value'];

          if (tokenType === 'shadow' && typeof tokenValue === 'string') {
            context[key].$extensions[
              'studio.tokens'
            ].boxShadowKeepRefsWorkaroundValue = `${tokenValue.replace(/[{}]/g, match =>
              match === '{' ? '[[' : ']]',
            )}`;
          }
        } else if (typeof context[key] === 'object') {
          traverse(value);
        }
      });
    }

    return dictionary;
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
    return token.filePath.includes(`/grouped/${meta.filePath}`);
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
          const scssMapPrefix = SCSS_MAP_PREFIX ? SCSS_MAP_PREFIX + '-' : '';
          const tokens = dictionary.allTokens
            .filter(token => token.path[0] === setName)
            .sort(sortByReference(dictionary))
            .map(token => {
              const tokenName = normalizeTokenName(options, token);
              const tokenValue = normalizeTokenValueReference(options, token);

              return meta.core
                ? `  --${tokenName}: ${tokenValue};`
                : `  ${tokenName}: ${tokenValue},`;
            })
            .join('\n');

          return meta.core
            ? `:root {\n${tokens}\n}\n`
            : `$${scssMapPrefix}${setName}: (\n${tokens}\n);\n`;
        })
        .join('\n')
    );
  },
});

export default StyleDictionary;
