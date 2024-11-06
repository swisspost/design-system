import { registerConfigMethod } from '../methods.js';
import { expandTypesMap } from '@tokens-studio/sd-transforms';

registerConfigMethod((tokenSets, { sourcePath, buildPath }) => {
  return Object.entries(tokenSets.output).map(([name, { type, layer, filePath, sets }]) => {
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
        scss: {
          transformGroup: 'tokens-studio',
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
              filter: 'swisspost/tokenset-filter',
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
