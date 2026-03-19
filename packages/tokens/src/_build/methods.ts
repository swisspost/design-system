import { promises } from 'fs';
import StyleDictionary, {
  type Dictionary,
  type Config,
  type TransformedToken,
} from 'style-dictionary';

import { usesReferences } from 'style-dictionary/utils';
import {
  SOURCE_PATH,
  OUTPUT_PATH,
  FILE_HEADER,
  TOKENSET_LAYERS,
  EXPLICIT_COMPONENT_LAYER_GROUPNAMES,
  EXPLICIT_FIGMAONLY_GROUPNAMES,
  EXPLICIT_FIGMAONLY_SETNAMES,
  TOKENSET_PREFIX,
} from './constants.js';

import {
  CliOptions,
  RawTokenJson,
  TokenDefinition,
  TokenSets,
  TokenProperty,
  ConfigWithMeta,
} from './types.js';

import { objectDeepmerge } from './utils/index.js';
import { LocalOptions } from 'style-dictionary/types';

let CLI_OPTIONS: CliOptions;

let tokenSets: TokenSets;

let registeredConfigMethods: Array<
  (tokenSets: TokenSets, options: { sourcePath: string; buildPath: string }) => Config[]
> = [];

export async function setup(): Promise<void> {
  CLI_OPTIONS = createCliOptions();

  const tokensFile = JSON.parse(await promises.readFile(`${SOURCE_PATH}/tokens.json`, 'utf-8'));
  tokenSets = createTokenSets(tokensFile);

  if (await promises.readdir(OUTPUT_PATH).catch(() => false))
    await promises.rm(OUTPUT_PATH, { recursive: true });
}

/**
 * @function createCliOptions()
 * Defines base options and merges them with incoming CLI options for the StyleDictionary Config.
 *
 * @returns object {
 *   verbosity: 'silent' | 'default' | 'verbose'
 * }
 */
function createCliOptions(): CliOptions {
  const options: CliOptions = {
    verbosity: 'default',
  };

  process.argv.slice(2).forEach(arg => {
    const option = arg.split('=');
    const optionKey = option[0].slice(2);
    const isOption =
      /^--[a-zA-Z-_]+=[a-zA-Z-_]+$/.test(arg) && Object.keys(options).includes(optionKey);

    if (isOption) options[optionKey] = option[1];
  });

  return options;
}

/**
 * @function createTokenSets()
 * Restructures the tokensets object into a group-nested object structure (e.g. { device: { mobile: {}, tablet: {}, desktop: {} } }).
 *
 * @param tokensFile definition object
 *
 * @returns group-nested tokensets object
 */
function createTokenSets(tokensFile: RawTokenJson): TokenSets {
  // remove $themes and $metadata objects
  // lowercase set names
  const normalized = Object.entries(tokensFile)
    .filter(([name]) => !/^\$/.test(name))
    .reduce((sets, [name, set]) => ({ ...sets, [name.toLowerCase()]: set }), {} as RawTokenJson);

  // only add non component layer sets to source files
  // component layer sets can not be resolved in the browser, and therefore are not usable as sources
  const source = Object.entries(normalized).reduce(
    (sets, [name, set]) => {
      const { baseDefinition } = getDefinition(name);

      if (baseDefinition.layer !== TOKENSET_LAYERS.component) {
        return { ...sets, [name]: set };
      } else {
        return sets;
      }
    },
    {} as TokenSets['source'],
  );

  // combine tokensets by group so they can be outputted in a single file
  const output = Object.entries(normalized).reduce(
    (definition: TokenSets['output'], [name, set]) => {
      const { groupSlug, groupName, setName, baseDefinition } = getDefinition(name);
      const existingGroup = definition[groupSlug];

      if (
        (typeof groupName === 'string' && EXPLICIT_FIGMAONLY_GROUPNAMES.includes(groupName)) ||
        EXPLICIT_FIGMAONLY_SETNAMES.includes(setName)
      ) {
        return definition;
      } else {
        return {
          ...definition,
          [groupSlug]: {
            ...baseDefinition,
            sets: { ...existingGroup?.sets, [setName]: set },
          },
        };
      }
    },
    {} as TokenSets['output'],
  );

  return {
    source,
    output,
  };

  function getDefinition(name: string): TokenDefinition {
    const [groupSlug, setSlug] = name.split('/');
    const groupName = setSlug ? groupSlug : null;
    const setName = setSlug ?? groupSlug;
    const type = !groupName ? 'singleton' : 'collection';
    const isCore = type === 'singleton' && setName === 'core';
    const isComponent =
      !isCore &&
      (type === 'singleton' ||
        (typeof groupName === 'string' && EXPLICIT_COMPONENT_LAYER_GROUPNAMES.includes(groupName)));

    return {
      groupSlug,
      groupName,
      setName,
      baseDefinition: {
        type,
        layer:
          (isCore && TOKENSET_LAYERS.core) ||
          (isComponent && TOKENSET_LAYERS.component) ||
          TOKENSET_LAYERS.semantic,
        filePath: `${groupName ?? setName}.json`,
        setNames: [],
        sets: {},
      },
    };
  }
}

/**
 * @function createTokenSetFiles()
 * Creates temporary token set files in the "SOURCE_PATH/_temp" directory for the StyleDictionary build process.
 * These files are used to be included in the StyleDictionary Config as sources,
 * so StyleDictionary is able to resolve the currently processed tokens.
 */
export async function createTokenSetFiles(): Promise<void> {
  console.log(`\x1b[90mProcessing data...`);
  const sourceTokenFolders = Object.keys(tokenSets.source)
    .filter(name => name.includes('/'))
    .map(name => `${SOURCE_PATH}/_temp/source/${name.replace(/\/[a-z-_ ]+$/, '')}`);

  await Promise.all([
    promises.mkdir(`${SOURCE_PATH}/_temp/output`, { recursive: true }),
    ...sourceTokenFolders.map(folder => promises.mkdir(folder, { recursive: true })),
  ]);

  await Promise.all([
    ...Object.entries(tokenSets.source).map(([name, set]) =>
      promises.writeFile(`${SOURCE_PATH}/_temp/source/${name}.json`, JSON.stringify(set, null, 2)),
    ),
    ...Object.values(tokenSets.output).map(({ sets, filePath }) =>
      promises.writeFile(`${SOURCE_PATH}/_temp/output/${filePath}`, JSON.stringify(sets, null, 2)),
    ),
  ]);

  console.log(`\x1b[33m✓ Complete!`);
}

/**
 * @function registerConfigMethod(Function)
 * Registers a config getter method, which is used to create StyleDictionary Config objects.
 *
 * @callback configGetterMethod a function which will be called during build time with the following parameters:
 * @param {tokenSets} group-nested tokensets object
 * @param {options} object { sourcePath: string, buildPath: string }
 * @returns {Config[]} StyleDictionary Config objects[]
 */
export function registerConfigMethod(
  method: (tokenSets: TokenSets, options: { sourcePath: string; buildPath: string }) => Config[],
) {
  if (method instanceof Function) {
    registeredConfigMethods.push(method);
  } else {
    throw new Error(`At least one of the given config getter methods is not a function.!`);
  }
}

/**
 * @function createOutputFiles()
 * Creates the output files based on the StyleDictionary Config.
 *
 * @param tokenSets group-nested tokensets object
 */
export async function createOutputFiles(): Promise<void> {
  console.log(`\x1b[90mWriting files...`);
  await Promise.all(getConfigs().map(build));
  await createIndexFile();
  await copySrcFiles();
  console.log(`\x1b[33m✓ Complete!`);

  /**
   * @function getConfigs()
   * Creates all StyleDictionary Config objects, given through the registeredConfigMethods.
   *
   * @returns Config[]
   */
  function getConfigs(): Config[] {
    return registeredConfigMethods
      .map(method =>
        method(tokenSets, { sourcePath: `${SOURCE_PATH}/`, buildPath: `${OUTPUT_PATH}/` }),
      )
      .flat()
      .map(config => {
        config = objectDeepmerge(config, {
          // set log level
          log: {
            verbosity: CLI_OPTIONS.verbosity,
          },
          // extend preprocessors
          preprocessors: [
            'swisspost/box-shadow-keep-refs-workaround',
            'tokens-studio',
            ...(config.preprocessors ?? []),
          ],
        });

        if (!config.platforms) return {};

        config.platforms = Object.entries(config.platforms).reduce(
          (platforms, [name, platform]) => ({
            ...platforms,
            [name]: objectDeepmerge(platform, {
              // set default file header (can still be overridden on the file level)
              options: {
                fileHeader: 'swisspost/file-header',
              },
              // set transformGroup (this will override any given transform group)
              transformGroup: 'tokens-studio',
            }),
          }),
          {},
        );

        return config;
      });
  }

  /**
   * @function build()
   * Builds the output files in the "OUTPUT_PATH" directory.
   *
   * @param config
   * StyleDictionary Config object
   */
  async function build(config: Config): Promise<void> {
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  }

  /**
   * @function createIndexFile()
   * Creates the index.scss file (which uses/forwards the other output files) in the "OUTPUT_PATH" directory.
   */
  async function createIndexFile(): Promise<void> {
    const header = FILE_HEADER.map(h => `// ${h}`).join('\n');
    const imports = Object.entries(tokenSets.output)
      .map(([name, { layer }]) => `@${layer === 'core' ? 'use' : 'forward'} './${name}';`)
      .join('\n');

    await promises.writeFile(`${OUTPUT_PATH}/_index.scss`, `${header}\n\n${imports}\n`);
  }

  /**
   * @function copySrcFiles()
   * Copies the tokens.json file from the "SOURCE_PATH" to the "OUTPUT_PATH" directory,
   * to make it availble in the package distribution.
   */
  async function copySrcFiles(): Promise<void> {
    await promises.copyFile(`${SOURCE_PATH}/tokens.json`, `${OUTPUT_PATH}/tokens.json`);
  }
}

/**
 * @function removeTokenSetFiles()
 * Removes the temporary token set files from the "SOURCE_PATH/_temp" directory.
 */
export async function removeTokenSetFiles(): Promise<void> {
  console.log(`\x1b[90mCleanup...`);
  await promises.rm(`${SOURCE_PATH}/_temp/`, { recursive: true });
  console.log(`\x1b[33m✓ Complete!`);
}

/**
 * @function getSetName(option, setName)
 *
 * @param options Config
 * @param setName String
 *
 * @returns the normalized set name
 */
export function getSetName(_options: Config, setName: string): string {
  return `${TOKENSET_PREFIX ? TOKENSET_PREFIX + '-' : ''}${setName.trim().replace(/\s/g, '-')}`;
}

/**
 * @function getSet(option, dictionary, setName)
 *
 * @param options Config
 * @param dictionary Dictionary
 * @param setName String
 *
 * @returns a normalized set
 *
 * This method uses the first col in a tokenset as the base and overrides only the changes values from further cols.
 * This allows us to define tokenSets like this:
 *
 * | desktop | tablet | mobile |
 * | a       |        |        | desktop/tablet/mobile = a
 * | a       | b      |        | desktop = a, tablet/mobile = b
 * | a       |        | b      | desktop/tablet = a, mobile = b
 * | a       | b      | c      | desttop = a, tablet = b, mobile = c
 */

export function getSet(
  options: ConfigWithMeta & LocalOptions,
  dictionary: Dictionary,
  currentSetName: string,
) {
  const { meta } = options;

  let tokenSet: TransformedToken[] = [];

  if (meta?.layer === 'semantic') {
    const baseSetName = meta.setNames[0];
    const overrideSetNameIndex = meta.setNames.findIndex(setName => setName === currentSetName);
    const overrideSetNames = meta.setNames.slice(1, overrideSetNameIndex + 1);

    tokenSet = dictionary.allTokens
      .filter(token => token.path[0] === baseSetName)
      .map(normalizeToken);

    overrideSetNames.forEach(overrideSetName => {
      const overrideTokenSet = dictionary.allTokens
        .filter(token => token.path[0] === overrideSetName)
        .map(normalizeToken);

      tokenSet = tokenSet.map(
        token => overrideTokenSet.find(overrideToken => overrideToken.name === token.name) ?? token,
      );
    });
  } else {
    tokenSet = dictionary.allTokens
      .filter(token => token.path[0] === currentSetName)
      .map(normalizeToken);
  }

  return tokenSet;

  function normalizeToken(token: TransformedToken) {
    const usesDtcg = token.$type && token.$value;
    const name = token.path.slice(1).join('-');
    const path = name.split('-');
    const original = token.original;
    // Can be removed, as soon as box-shadow tokens can be outputted with references
    const boxShadowKeepRefsWorkaroundValue = token?.original?.$extensions?.[
      'studio.tokens'
    ]?.boxShadowKeepRefsWorkaroundValue?.replace(/(\[\[|\]\])/g, (match: string) =>
      match === '[[' ? '{' : '}',
    );

    if (boxShadowKeepRefsWorkaroundValue) {
      original[usesDtcg ? '$value' : 'value'] = boxShadowKeepRefsWorkaroundValue;
    }

    return {
      ...token,
      name,
      path,
      original: {
        ...token.original,
        ...original,
      },
    };
  }
}

/**
 * @function getTokenValue(token)
 *
 * @param options Config
 * @param token DesignToken object
 *
 * @returns the tokens value, with referenced css custom-properties (if original value uses references)
 */
export function getTokenValue(
  options: Config & LocalOptions,
  token: TransformedToken,
): TokenProperty {
  const { outputReferences } = options;

  const usesDtcg = token.$type && token.$value;
  const originalTokenValue = usesDtcg ? token.original.$value : token.original.value;
  let tokenValue = usesDtcg ? token.$value : token.value;

  if (outputReferences && usesReferences(originalTokenValue)) {
    tokenValue = replaceAllReferences(originalTokenValue);
  }

  function replaceAllReferences(value: string | { [key: string]: TokenProperty }) {
    if (typeof value === 'string') {
      return replaceReferences(value);
    }

    if (typeof value === 'object') {
      for (const key in value) {
        if (Object.hasOwn(value, key)) {
          if (typeof value[key] === 'string') value[key] = replaceReferences(value[key]);
          if (typeof value[key] === 'object') {
            value[key] = replaceAllReferences(
              value[key] as { [key: string]: TokenProperty },
            ) as TokenProperty;
          }
        }
      }

      return Object.values(value).join(' ');
    }
  }

  function replaceReferences(value: string) {
    return value.replace(
      /{[0-9a-zA-Z-._]+}/g,
      match => `var(--${match.replace(/[{}]/g, '').replace(/\./g, '-')})`,
    );
  }

  return tokenValue;
}
