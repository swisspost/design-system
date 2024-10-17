import StyleDictionary from 'style-dictionary';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import { register } from '@tokens-studio/sd-transforms';
register(StyleDictionary);

const config = {
  ...makeSdTailwindConfig({ type: 'all', isVariables: true }),
  source: ['./tokens/components.json'],
  include: ['./tokens/source/**/*.json'],
  preprocessors: ['tokens-studio'],
  //log: { verbosity: 'verbose' },
};
config.platforms.tailwind.transformGroup = 'tokens-studio';
config.platforms.tailwind.files.format = config;
console.log(JSON.stringify(config, null, '  '));
const styleDictionaryTailwind = new StyleDictionary(config);
await styleDictionaryTailwind.hasInitialized;
await styleDictionaryTailwind.buildAllPlatforms();
