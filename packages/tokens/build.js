import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { usesReferences } from 'style-dictionary/utils';
import { promises } from 'fs';

const SOURCE_PATH = './tokensstudio-generated/';
const BUILD_PATH = './dist/';
const FILE_HEADER = '// Do not edit manually!\n// This file was generated on:\n// {date}\n\n';
const GLOBAL_TOKEN_NAMESPACES = ['post'];

registerTransforms(StyleDictionary);

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

StyleDictionary.registerFormat({
  name: 'swisspost/scss-format',
  format: ({ dictionary, file }) => {
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
                tokenValue = token.original.value.replace(
                  /{[^}]+}/g,
                  match => `var(--${match.replace(/[{}]/g, '').replace(/\./g, '-')})`,
                );
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
  },
});

const builtTime = performance.now();
const CLI_OPTIONS = createCliOptions();
const raw = JSON.parse(await promises.readFile(`${SOURCE_PATH}tokens.json`, 'utf-8'));
const rawSets = createRawTokenSets(raw);
const tokenSets = createTokenSets(rawSets);

await createTokenSetFiles(rawSets);
await createOutputFiles(tokenSets);
await removeTokenSetFiles();

console.log(`\x1b[32m✓ Tokens built in ${Math.round(performance.now() - builtTime)}ms\x1b[0m`);

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

function createRawTokenSets(raw) {
  return Object.entries(raw)
    .filter(([name]) => !/^\$/.test(name))
    .reduce((sets, [name, set]) => ({ ...sets, [name.toLowerCase()]: set }), {});
}

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

async function createOutputFiles(tokenSets) {
  console.log(`\x1b[90mWriting files...`);
  await Promise.all(getConfigs().map(build));
  await createIndexFile();
  console.log(`\x1b[33m✓ Complete!`);

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

  async function build(config) {
    const sd = new StyleDictionary(config);
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
  }

  async function createIndexFile() {
    const imports = Object.keys(tokenSets)
      .map(name => `@${name === 'core' ? 'use' : 'forward'} './${name.toLowerCase()}';`)
      .join('\n');

    await promises.writeFile(`${BUILD_PATH}index.scss`, `${getFileHeader()}${imports}\n`);
  }
}

async function removeTokenSetFiles() {
  console.log(`\x1b[90mCleanup...`);
  await promises.rm(`${SOURCE_PATH}_temp/`, { recursive: true });
  console.log(`\x1b[33m✓ Complete!`);
}

function getFileHeader() {
  return FILE_HEADER.replace('{date}', new Date().toUTCString());
}
