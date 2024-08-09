import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { usesReferences } from 'style-dictionary/utils';
import { promises } from 'fs';

const SOURCE_PATH = './tokensstudio-generated/';
const BUILD_PATH = './dist/';
const FILE_HEADER =
  '// Do not edit manually!\n// This file was generated on:\n// {date} by the @swisspost/design-system-tokens package build command\n\n';
const GLOBAL_TOKEN_NAMESPACES = ['post'];

register(StyleDictionary);

/**
 * @function StyleDictionary.registerFilter()
 * Defines a custom StyleDictionary filter to be used at specific places in the build process.
 *
 * @param object {
 *   name: string,
 *   filter: (token: TransformedToken, dictionary: Config) => boolean
 * }
 *
 * swisspost/tokenset-filter:
 * Used to filter only the tokens of the current tokenset
 * and output them in the corresponding tokens file (e.g. core, mode/light, etc.).
 */
StyleDictionary.registerFilter({
  name: 'swisspost/tokenset-filter',
  filter: (token, dictionary) => {
    let current = dictionary.tokens;
    return token.path.every(slug => {
      const isDefined = current[slug] !== undefined;
      current = current[slug];
      return isDefined;
    });
  },
});

/**
 * @function StyleDictionary.registerFormat()
 * Defines a custom StyleDictionary format to be used at specific places in the build process.
 *
 * @param object {
 *   name: string,
 *   format: (dictionary: Config, file: File) => string
 * }
 *
 * swisspost/scss-format:
 * Used to declare the format of the *.scss output files.
 */
StyleDictionary.registerFormat({
  name: 'swisspost/scss-format',
  format: ({ dictionary, file }) => {
    const MULTIVALUE_SEPARATOR_RULES = [
      { previousKey: 'fontSize', currentKey: 'lineHeight', separator: '/' },
    ];

    const fileName = file.destination.replace(/\.scss$/, '');
    const isCore = fileName === 'core';

    let dataSetNames = Object.keys(dictionary.tokens).filter(
      name => !GLOBAL_TOKEN_NAMESPACES.includes(name),
    );
    const hasSubDataSets = dataSetNames.length >= 1;
    dataSetNames = hasSubDataSets ? dataSetNames : [fileName];

    return (
      getFileHeader() +
      dataSetNames
        .map(dataSetName => {
          const dataSetTokens = (
            hasSubDataSets
              ? dictionary.allTokens.filter(token => token.name.startsWith(dataSetName))
              : dictionary.allTokens
          )
            .map(token => {
              const tokenName = hasSubDataSets
                ? token.name.slice(dataSetName.length + 1)
                : token.name;
              let tokenValue = token.value;

              if (usesReferences(token.original.value)) {
                try {
                  if (token.type === 'typography') {
                    tokenValue = Object.entries(token.original.value).reduce(
                      (values, [key, value], i) =>
                        `${values}${getSeparator(
                          Object.keys(token.original.value)[i - 1],
                          key,
                        )}${getReference(value)}`,
                      '',
                    );
                  } else {
                    tokenValue = getReference(token.original.value);
                  }
                } catch (error) {
                  console.error(
                    `\x1b[31mError: While processing the token \x1b[33m"${tokenName}"\x1b[31m within the tokenset \x1b[33m"${dataSetName}"\x1b[31m, the following error occurred:\n"${
                      error.message
                    }".\nInput:\n\x1b[90m${JSON.stringify(token, null, 2)}\x1b[0m`,
                  );
                }
              }

              return isCore ? `--${tokenName}: ${tokenValue};` : `'${tokenName}': ${tokenValue},`;
            })
            .join('\n  ');

          return isCore
            ? `:root {\n  ${dataSetTokens}\n}\n`
            : `$post-${dataSetName}: (\n  ${dataSetTokens}\n);\n`;
        })
        .join('\n')
    );

    function getReference(value = '') {
      return value.replace(
        /{[^}]+}/g,
        match => `var(--${match.replace(/[{}]/g, '').replace(/\./g, '-')})`,
      );
    }

    function getSeparator(pKey = '', cKey = '') {
      if (pKey === '') return '';

      return (
        MULTIVALUE_SEPARATOR_RULES.find(
          rule => rule.previousKey === pKey && rule.currentKey === cKey,
        )?.separator ?? ' '
      );
    }
  },
});

/**
 * Build process
 */
const builtTime = performance.now();
const CLI_OPTIONS = createCliOptions();
const raw = JSON.parse(await promises.readFile(`${SOURCE_PATH}tokens.json`, 'utf-8'));
const rawSets = createRawTokenSets(raw);
const tokenSets = createTokenSets(rawSets);

await createTokenSetFiles(rawSets);
await createOutputFiles(tokenSets);
await removeTokenSetFiles();

console.log(`\x1b[32m✓ Tokens built in ${Math.round(performance.now() - builtTime)}ms\x1b[0m`);

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
 * @function createRawTokenSets()
 * Extracts the tokensets from the raw tokens.json content and filters out the $-prefixed keys (e.g. $themes, $metadata).
 *
 * @param raw
 * Content of the tokens.json file (parsed JSON object)
 *
 * @returns tokensets object
 */
function createRawTokenSets(raw) {
  return Object.entries(raw)
    .filter(([name]) => !/^\$/.test(name))
    .reduce((sets, [name, set]) => ({ ...sets, [name.toLowerCase()]: set }), {});
}

/**
 * @function createTokenSets()
 * Restructures the tokensets object into a group-nested object structure (e.g. { device: { mobile: {}, tablet: {}, desktop: {} } }).
 *
 * @param rawSets
 * tokensets object
 *
 * @returns group-nested tokensets object
 */
function createTokenSets(rawSets) {
  return Object.entries(rawSets).reduce((sets, [name, set]) => {
    let current = sets;

    name.split('/').forEach((slug, index, slugs) => {
      current[slug] = index === slugs.length - 1 ? set : current[slug] ?? {};
      current = current[slug];
    });

    return sets;
  }, {});
}

/**
 * @function createTokenSetFiles()
 * Creates temporary token set files in the "SOURCE_PATH" directory for the StyleDictionary build process.
 * These files are used to be included in the StyleDictionary Config as sources,
 * so StyleDictionary is able to resolve the currently processed tokens.
 *
 * @param rawSets
 * tokensets object
 */
async function createTokenSetFiles(rawSets) {
  console.log(`\x1b[90mProcessing data...`);
  await Promise.all(
    Object.keys(rawSets)
      .filter(name => name.indexOf('/') > 0)
      .map(async name =>
        promises.mkdir(`${SOURCE_PATH}_temp/${name.replace(/^[^/]\/.*$/, '')}`, {
          recursive: true,
        }),
      ),
  );
  await Promise.all(
    Object.entries(rawSets).map(async ([name, set]) =>
      promises.writeFile(`${SOURCE_PATH}_temp/${name}.json`, JSON.stringify(set, null, 2)),
    ),
  );
  console.log(`\x1b[33m✓ Complete!`);
}

/**
 * @function createOutputFiles()
 * Creates the output files based on the StyleDictionary Config.
 *
 * @param tokenSets group-nested tokensets object
 */
async function createOutputFiles(tokenSets) {
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
    return Object.entries(tokenSets).map(([name, set]) => ({
      log: {
        verbosity: CLI_OPTIONS.verbosity,
      },
      include: [`${SOURCE_PATH}_temp/**/*.json`],
      tokens: set,
      preprocessors: ['tokens-studio'],
      platforms: {
        scss: {
          transformGroup: 'tokens-studio',
          transforms: ['name/kebab'],
          buildPath: BUILD_PATH,
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
    }));
  }

  /**
   * @function build()
   * Builds the output files in the "BUILD_PATH" directory.
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
   * Creates the index.scss file (which uses/forwards the other output files) in the "BUILD_PATH" directory.
   */
  async function createIndexFile() {
    const imports = Object.keys(tokenSets)
      .map(name => `@${name === 'core' ? 'use' : 'forward'} './${name.toLowerCase()}';`)
      .join('\n');

    await promises.writeFile(`${BUILD_PATH}index.scss`, `${getFileHeader()}${imports}\n`);
  }

  /**
   * @function copySrcFiles()
   * Copies the tokens.json file from the "SOURCE_PATH" to the "BUILD_PATH" directory,
   * to make it availble in the package distribution.
   */
  async function copySrcFiles() {
    await promises.copyFile(`${SOURCE_PATH}tokens.json`, `${BUILD_PATH}tokens.json`);
  }
}

/**
 * @function removeTokenSetFiles()
 * Removes the temporary token set files from the "SOURCE_PATH" directory.
 */
async function removeTokenSetFiles() {
  console.log(`\x1b[90mCleanup...`);
  await promises.rm(`${SOURCE_PATH}_temp/`, { recursive: true });
  console.log(`\x1b[33m✓ Complete!`);
}

/**
 * @function getFileHeader()
 * Returns the file header comment with the current date.
 * Which is used at the beginning of each output file.
 *
 * @returns string
 */
function getFileHeader() {
  return FILE_HEADER.replace('{date}', new Date().toUTCString());
}
