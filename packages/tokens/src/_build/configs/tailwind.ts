import { fileHeader } from 'style-dictionary/utils';
import { TOKENSET_LAYERS, TOKENSET_NAMES, TOKENSET_PREFIX } from '../constants.js';
import StyleDictionary from '../style-dictionary.js';
import { registerConfigMethod, getTokenValue } from '../methods.js';
import { TokenProperty } from '_build/types.js';

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
                destination: `${name}.tailwind.css`,
                filter: 'swisspost/source-tokens-filter',
                format: 'swisspost/tailwind-v4-format',
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
 * swisspost/tailwind-v4-format:
 * Used to declare the format of the tailwind output files.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/tailwind-v4-format',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file, commentStyle: 'long' }); // CSS comments
    
    const themeVariables = dictionary.allTokens.reduce<Record<string, TokenProperty>>(
      (allTokens, token) => {
        const tokenPath = token.path.slice(token.path.indexOf(TOKENSET_PREFIX) + 1);
        
        const cssVarName = `--${tokenPath.join('-')}`;
        
        const tokenValue = getTokenValue(options, token);
        
        allTokens[cssVarName] = tokenValue;
        return allTokens;
      },
      {},
    );

    const themeCSS = Object.entries(themeVariables)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');

    return `${header}
@import "tailwindcss";

@theme {
${themeCSS}
}
`;
  },
});
