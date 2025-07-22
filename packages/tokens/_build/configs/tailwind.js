import { fileHeader } from 'style-dictionary/utils';
import { TOKENSET_LAYERS, TOKENSET_NAMES, TOKENSET_PREFIX } from '../constants.js';
import StyleDictionary from '../style-dictionary.js';
import { registerConfigMethod, getTokenValue } from '../methods.js';

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
                destination: `${name}.tailwind.css`,  // Changed from .js to .css
                filter: 'swisspost/source-tokens-filter',
                format: 'swisspost/tailwind-v4-format',  // New format name
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
 * Defines a custom StyleDictionary format for Tailwind CSS v4.0 @theme directive.
 *
 * @param object {
 *   name: string,
 *   format: (dictionary: Dictionary, file: File, options: Config & LocalOptions, platform: PlatformConfig) => string
 * }
 *
 * swisspost/tailwind-v4-format:
 * Used to declare the format of the tailwind v4.0 CSS theme files.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/tailwind-v4-format',
  format: async ({ dictionary, options, file }) => {
    const header = await fileHeader({ file, commentStyle: 'long' }); // CSS comments
    
    // Process tokens into theme variables
    const themeVariables = dictionary.allTokens.reduce((allTokens, token) => {
      // Get the token path after the prefix
      const tokenPath = token.path.slice(token.path.indexOf(TOKENSET_PREFIX) + 1);
      
      // Create CSS custom property name
      // Convert: ['utility', 'margin', '0'] -> '--utility-margin-0'
      const cssVarName = `--${tokenPath.join('-')}`;
      
      // Get the token value
      const tokenValue = getTokenValue(options, token);
      
      allTokens[cssVarName] = tokenValue;
      return allTokens;
    }, {});

    // Convert theme variables to CSS format
    const themeCSS = Object.entries(themeVariables)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');

    // Return CSS with @theme directive
    return `${header}
@import "tailwindcss";

@theme {
${themeCSS}
}
`;
  },
});
