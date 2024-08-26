import StyleDictionary from 'style-dictionary';
import { sortByReference, usesReferences } from 'style-dictionary/utils';
import { register } from '@tokens-studio/sd-transforms';
import { SCSS_MAP_PREFIX } from './constants.js';
import { getFileHeader } from './methods.js';

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
            ].boxShadowKeepRefsWorkaroundValue = `${tokenValue.replace(/({|})/g, match =>
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
    const { meta, outputReferences } = options;

    return (
      getFileHeader() +
      meta.setNames
        .map(setName => {
          const tokens = dictionary.allTokens
            .filter(token => token.path[0] === setName)
            .sort(sortByReference(dictionary))
            .map(token => {
              const tokenName = normalizeTokenName(token);
              const tokenValue = normalizeTokenValueReference(token);

              return meta.core
                ? `  --${tokenName}: ${tokenValue};`
                : `  ${tokenName}: ${tokenValue},`;
            })
            .join('\n');

          return meta.core
            ? `:root {\n${tokens}\n}\n`
            : `$${SCSS_MAP_PREFIX ? SCSS_MAP_PREFIX + '-' : ''}${setName}: (\n${tokens}\n);\n`;
        })
        .join('\n')
    );

    function normalizeTokenName(token) {
      return token.path.slice(1).join('-');
    }

    function normalizeTokenValueReference(token) {
      // Can be removed, as soon as box-shadow tokens can be outputted with references
      const boxShadowKeepRefsWorkaroundValue = token?.$extensions?.[
        'studio.tokens'
      ]?.boxShadowKeepRefsWorkaroundValue?.replace(/(\[\[|\]\])/g, match =>
        match === '[[' ? '{' : '}',
      );

      const usesDtcg = token.$type && token.$value;
      const originalTokenValue =
        boxShadowKeepRefsWorkaroundValue ??
        (usesDtcg ? token.original.$value : token.original.value);
      let tokenValue = usesDtcg ? token.$value : token.value;

      if (outputReferences && usesReferences(originalTokenValue)) {
        tokenValue = replaceAllReferences(originalTokenValue);
      }

      function replaceAllReferences(value) {
        if (typeof value === 'string') {
          return replaceReferences(value);
        }

        if (typeof value === 'object') {
          for (const key in value) {
            if (Object.hasOwn(value, key)) {
              if (typeof value[key] === 'string') value[key] = replaceReferences(value[key]);
              if (typeof value[key] === 'object') value[key] = replaceAllReferences(value[key]);
            }
          }

          return Object.values(value).join(' ');
        }

        function replaceReferences(value) {
          return value.replace(
            /({[^}]+})/g,
            match => `var(--${match.replace(/[{}]/g, '').replace(/\./g, '-')})`,
          );
        }
      }

      return tokenValue;
    }
  },
});

export default StyleDictionary;
