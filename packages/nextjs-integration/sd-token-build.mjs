import StyleDictionary from 'style-dictionary';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import { register } from '@tokens-studio/sd-transforms';
register(StyleDictionary);

const config = {
  ...makeSdTailwindConfig({ type: 'all' }),
  preprocessors: ['tokens-studio'],
  log: { verbosity: 'verbose' },
};
config.platforms.tailwind.transformGroup = 'token-studio';
console.log(JSON.stringify(config, null, '  '));
const styleDictionaryTailwind = new StyleDictionary(config);
await styleDictionaryTailwind.hasInitialized;
await styleDictionaryTailwind.buildAllPlatforms();
