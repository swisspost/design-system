import { TOKENSET_LAYERS } from '../constants.js';
import { registerConfigMethod } from '../methods.js';

const TAILWIND_TOKENSET_NAMES = ['utilities', 'helpers'];

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
        preprocessors: ['tokens-studio'],
        source: [`${sourcePath}_temp/output/${filePath}`],
        include: [`${sourcePath}_temp/source/**/*.json`],
        platforms: {
          tailwind: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: `${buildPath}tailwind/`,
            files: [
              {
                destination: `${name}.tailwind.js`,
                format: 'swisspost/tailwind-format',
                filter: 'swisspost/tailwind-filter',
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
