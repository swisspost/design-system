import { expandTypesMap } from '@tokens-studio/sd-transforms';
import { registerConfigMethod } from '../methods.js';

const PALETTE_TOKENSET_NAME = 'palettes';

/**
 * Registers a config getter method to generate output files for all code relevant tokens in the tokens.json.
 */
registerConfigMethod((tokenSets, { sourcePath, buildPath }) => {
  const paletteSet = tokenSets.output[PALETTE_TOKENSET_NAME];

  if (!paletteSet) return;

  const { type, layer, filePath, sets } = paletteSet;

  const themes = Object.keys(tokenSets.source).filter(source => source.startsWith('theme/'));
  const schemes = Object.keys(tokenSets.source).filter(source => source.startsWith('scheme/'));

  const otherSources = Object.keys(tokenSets.source).filter(
    source => !source.startsWith('theme/') && !source.startsWith('scheme/'),
  );

  const themeSchemeCombinations = themes.flatMap(theme => {
    return schemes.map(scheme => [theme, scheme]);
  });

  return themeSchemeCombinations.map(([theme, scheme]) => {
    const sourceFiles = Object.keys(tokenSets.source)
      .filter(source => source === theme || source === scheme)
      .concat(otherSources)
      .map(source => `${sourcePath}_temp/source/${source}.json`);

    const themeName = theme.replace('theme/', '');
    const schemeName = scheme.replace('scheme/', '');

    return {
      meta: {
        type,
        layer,
        filePath,
        setNames: Object.keys(sets),
      },
      source: [`${sourcePath}_temp/output/${filePath}`],
      include: sourceFiles,
      platforms: {
        scss: {
          transforms: ['name/kebab'],
          buildPath: `${buildPath}palettes/`,
          expand: {
            include: ['typography'],
            typesMap: expandTypesMap,
          },
          files: [
            {
              destination: `_${themeName}-${schemeName}.scss`.toLowerCase(),
              format: 'swisspost/scss-format',
              filter: 'swisspost/scss-filter',
              options: {
                outputReferences: false,
              },
            },
          ],
        },
      },
    };
  });
});
