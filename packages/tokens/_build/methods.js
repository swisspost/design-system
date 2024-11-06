import { promises } from 'fs';
import StyleDictionary from './style-dictionary.js';
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
import { deepmerge } from './utils/index.js';

let CLI_OPTIONS;
let tokenSets;
let registeredConfigMethods = [];

export async function setup() {
  CLI_OPTIONS = createCliOptions();

  const tokensFile = JSON.parse(await promises.readFile(`${SOURCE_PATH}/tokens.json`, 'utf-8'));
  tokenSets = createTokenSets(tokensFile);
}

/**
 * @function createCliOptions()
 * Defines base options and merges them with incoming CLI options for the StyleDictionary Config.
 *
 * @returns object {
 *   verbosity: 'silent' | 'default' | 'verbose'
 * }
 */
function createCliOptions() {
  const options = {
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
function createTokenSets(tokensFile) {
  // remove $themes and $metadata objects
  // lowercase set names
  const normalized = Object.entries(tokensFile)
    .filter(([name]) => !/^\$/.test(name))
    .reduce((sets, [name, set]) => ({ ...sets, [name.toLowerCase()]: set }), {});

  // only add non component layer sets to source files
  // component layer sets can not be resolved in the browser, and therefore are not usable as sources
  const source = Object.entries(normalized).reduce((sets, [name, set]) => {
    const { baseDefinition } = getConfig(name);

    if (baseDefinition.layer !== TOKENSET_LAYERS.component) {
      return { ...sets, [name]: set };
    } else {
      return sets;
    }
  }, {});

  // combine tokensets by group so they can be outputted in a single file
  const output = Object.entries(normalized).reduce((definition, [name, set]) => {
    const { groupSlug, groupName, setName, baseDefinition } = getConfig(name);
    const existingGroup = definition[groupSlug];

    if (
      EXPLICIT_FIGMAONLY_GROUPNAMES.includes(groupName) ||
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
  }, {});

  return {
    source,
    output,
  };

  function getConfig(name) {
    const [groupSlug, setSlug] = name.split('/');
    const groupName = setSlug ? groupSlug : null;
    const setName = setSlug ?? groupSlug;
    const type = !groupName ? 'singleton' : 'collection';
    const isCore = type === 'singleton' && setName === 'core';
    const isComponent =
      !isCore && (type === 'singleton' || EXPLICIT_COMPONENT_LAYER_GROUPNAMES.includes(groupName));

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
export async function createTokenSetFiles() {
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
 * Registers a config getter method, which is used to create the StyleDictionary Config objects.
 *
 * @callback configGetterMethod a function which will be called during build time with the following parameters:
 * @param {tokenSets} group-nested tokensets object
 * @param {options} object { sourcePath: string, buildPath: string }
 */
export function registerConfigMethod(method) {
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
export async function createOutputFiles() {
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
  function getConfigs() {
    return registeredConfigMethods
      .map(method =>
        method(tokenSets, { sourcePath: `${SOURCE_PATH}/`, buildPath: `${OUTPUT_PATH}/` }).map(
          config => {
            // add log level to config
            config = deepmerge(config, {
              log: {
                verbosity: CLI_OPTIONS.verbosity,
              },
            });

            // add file header to all platforms (can still be overridden on the file level)
            Object.entries(config.platforms).forEach(([name, platform]) => {
              config.platforms[name] = deepmerge(platform, {
                options: {
                  fileHeader: 'swisspost/file-header',
                },
              });
            });

            return config;
          },
        ),
      )
      .flat();
  }

  /**
   * @function build()
   * Builds the output files in the "OUTPUT_PATH" directory.
   *
   * @param config
   * StyleDictionary Config object
   */
  async function build(config) {
    const sd = new StyleDictionary(config);
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
  }

  /**
   * @function createIndexFile()
   * Creates the index.scss file (which uses/forwards the other output files) in the "OUTPUT_PATH" directory.
   */
  async function createIndexFile() {
    const imports = Object.entries(tokenSets.output)
      .map(([name, { layer }]) => `@${layer === 'core' ? 'use' : 'forward'} './${name}';`)
      .join('\n');

    await promises.writeFile(
      `${OUTPUT_PATH}/_index.scss`,
      `${FILE_HEADER.map(h => `// ${h}`).join('\n')}\n\n${imports}\n`,
    );
  }

  /**
   * @function copySrcFiles()
   * Copies the tokens.json file from the "SOURCE_PATH" to the "OUTPUT_PATH" directory,
   * to make it availble in the package distribution.
   */
  async function copySrcFiles() {
    await promises.copyFile(`${SOURCE_PATH}/tokens.json`, `${OUTPUT_PATH}/tokens.json`);
  }
}

/**
 * @function removeTokenSetFiles()
 * Removes the temporary token set files from the "SOURCE_PATH/_temp" directory.
 */
export async function removeTokenSetFiles() {
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
export function getSetName(_options, setName) {
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
export function getSet(options, dictionary, currentSetName) {
  const { meta } = options;
  let tokenSet = [];

  if (meta.layer === 'semantic') {
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

  function normalizeToken(token) {
    const usesDtcg = token.$type && token.$value;
    const name = token.path.slice(1).join('-');
    const path = name.split('-');
    const original = token.original;
    // Can be removed, as soon as box-shadow tokens can be outputted with references
    const boxShadowKeepRefsWorkaroundValue = token?.original?.$extensions?.[
      'studio.tokens'
    ]?.boxShadowKeepRefsWorkaroundValue?.replace(/(\[\[|\]\])/g, match =>
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
export function getTokenValue(options, token) {
  const { outputReferences } = options;

  const usesDtcg = token.$type && token.$value;
  const originalTokenValue = usesDtcg ? token.original.$value : token.original.value;
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
  }

  function replaceReferences(value) {
    return value.replace(
      /{[0-9a-zA-Z-._]+}/g,
      match => `var(--${match.replace(/[{}]/g, '').replace(/\./g, '-')})`,
    );
  }

  return tokenValue;
}
