import StyleDictionary from './style-dictionary.js';
import { usesReferences } from 'style-dictionary/utils';
import { expandTypesMap } from '@tokens-studio/sd-transforms';
import { promises } from 'fs';
import { SOURCE_PATH, OUTPUT_PATH, FILE_HEADER } from './constants.js';

let CLI_OPTIONS;
let tokenSets;

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
  const raw = Object.entries(tokensFile)
    .filter(([name]) => !/^\$/.test(name))
    .reduce((sets, [name, set]) => ({ ...sets, [name.toLowerCase()]: set }), {});

  const grouped = Object.entries(raw).reduce((d, [name, set]) => {
    const [groupSlug, setSlug] = name.toLowerCase().split('/');
    const groupName = setSlug ? groupSlug : null;
    const setName = setSlug ?? groupSlug;
    const type = !groupName ? 'singleton' : 'collection';
    const existingGroup = d[groupSlug];

    return {
      ...d,
      [groupSlug]: {
        type,
        core: type === 'singleton' && setName === 'core',
        filePath: `${groupName ?? setName}.json`,
        sets: { ...existingGroup?.sets, [setName]: set },
      },
    };
  }, {});

  return {
    raw,
    grouped,
  };
}

/**
 * @function createTokenSetFiles()
 * Creates temporary token set files in the "SOURCE_PATH/_temp" directory for the StyleDictionary build process.
 * These files are used to be included in the StyleDictionary Config as sources,
 * so StyleDictionary is able to resolve the currently processed tokens.
 */
export async function createTokenSetFiles() {
  console.log(`\x1b[90mProcessing data...`);
  const rawTokenFolders = Object.keys(tokenSets.raw)
    .filter(name => name.includes('/'))
    .map(name => `${SOURCE_PATH}/_temp/raw/${name.replace(/\/[a-z-_ ]$/, '')}`);

  await Promise.all([
    promises.mkdir(`${SOURCE_PATH}/_temp/grouped`, { recursive: true }),
    ...rawTokenFolders.map(folder => promises.mkdir(folder, { recursive: true })),
  ]);

  await Promise.all([
    ...Object.entries(tokenSets.raw).map(([name, set]) =>
      promises.writeFile(`${SOURCE_PATH}/_temp/raw/${name}.json`, JSON.stringify(set, null, 2)),
    ),
    ...Object.values(tokenSets.grouped).map(({ sets, filePath }) =>
      promises.writeFile(`${SOURCE_PATH}/_temp/grouped/${filePath}`, JSON.stringify(sets, null, 2)),
    ),
  ]);

  console.log(`\x1b[33m✓ Complete!`);
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
   * Creates the StyleDictionary Config object for each tokenset.
   *
   * @returns Config[]
   */
  function getConfigs() {
    return Object.entries(tokenSets.grouped).map(([name, { type, core, filePath, sets }]) => {
      return {
        log: {
          verbosity: CLI_OPTIONS.verbosity,
        },
        meta: {
          type,
          core,
          filePath,
          setNames: Object.keys(sets),
        },
        source: [`${SOURCE_PATH}/_temp/grouped/${filePath}`],
        include: [`${SOURCE_PATH}/_temp/raw/**/*.json`],
        preprocessors: ['swisspost/box-shadow-keep-refs-workaround', 'tokens-studio'],
        platforms: {
          scss: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: `${OUTPUT_PATH}/`,
            expand: {
              include: ['typography'],
              typesMap: expandTypesMap,
            },
            files: [
              {
                destination: `${name}.scss`.toLowerCase(),
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
    const imports = Object.entries(tokenSets.grouped)
      .map(([name, { core }]) => `@${core ? 'use' : 'forward'} './${name}';`)
      .join('\n');

    await promises.writeFile(`${OUTPUT_PATH}/index.scss`, `${getFileHeader()}${imports}\n`);
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
 * @function getFileHeader()
 * Returns the file header comment with the current date.
 * Which is used at the beginning of each output file.
 *
 * @returns string
 */
export function getFileHeader() {
  return FILE_HEADER.replace('{date}', new Date().toUTCString());
}

/**
 * @function normalizeTokenName(option, token)
 *
 * @param options Config
 * @param token DesignToken object
 *
 * @returns the tokens name, without the group prefix
 */
export function normalizeTokenName(_options, token) {
  return token.path.slice(1).join('-');
}

/**
 * @function normalizeTokenValueReference(token)
 *
 * @param options Config
 * @param token DesignToken object
 *
 * @returns the tokens value, with referenced css custom-properties
 */
export function normalizeTokenValueReference(options, token) {
  const { outputReferences } = options;

  // Can be removed, as soon as box-shadow tokens can be outputted with references
  const boxShadowKeepRefsWorkaroundValue = token?.$extensions?.[
    'studio.tokens'
  ]?.boxShadowKeepRefsWorkaroundValue?.replace(/(\[\[|\]\])/g, match =>
    match === '[[' ? '{' : '}',
  );

  const usesDtcg = token.$type && token.$value;
  const originalTokenValue =
    boxShadowKeepRefsWorkaroundValue ?? (usesDtcg ? token.original.$value : token.original.value);
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
      /({[^}]+})/g,
      match => `var(--${match.replace(/[{}]/g, '').replace(/\./g, '-')})`,
    );
  }

  return tokenValue;
}
