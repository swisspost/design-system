const fs = require('fs').promises;
const path = require('path');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const maps = [];
  let i = 0;
  while (i < args.length) {
    if (args[i] === '--maps' || args[i] === '-m') {
      i++;
      while (i < args.length && !args[i].startsWith('-')) {
        maps.push(args[i]);
        i++;
      }
    } else {
      i++;
    }
  }
  return { maps };
}

const argv = parseArgs();

const inputFiles = [
  './packages/tokens/dist/components.scss',
  './packages/tokens/dist/elements.scss',
  './packages/tokens/dist/utilities.scss',
];
const styleDirs = ['./packages/styles/src', './packages/components/src'];

async function getTokens(inputFile, includedMaps) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    const mapRegex = /\$(post-[^:]+):\s*\(([\s\S]*?)\);/g;
    const allTokens = [];

    let match;
    while ((match = mapRegex.exec(data)) !== null) {
      const mapName = match[1];
      if (includedMaps.length === 0 || includedMaps.includes(mapName)) {
        const mapContent = match[2];
        const keys = mapContent
          .split(',')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.split(':')[0].trim());

        allTokens.push(...keys.map(key => ({ mapName, key })));
      }
    }

    return allTokens;
  } catch (err) {
    console.error(`Error reading file ${inputFile}:`, err);
    return [];
  }
}

async function searchDirectoryForToken(dir, patterns) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // If it's a directory, search it recursively
        const found = await searchDirectoryForToken(fullPath, patterns);
        if (found.found) return found;
      } else if (entry.isFile() && path.extname(entry.name) === '.scss') {
        // If it's a .scss file, check its content
        const content = await fs.readFile(fullPath, 'utf8');
        for (const pattern of patterns) {
          if (content.includes(pattern)) {
            return { found: true, file: fullPath, pattern };
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error searching directory ${dir}:`, err);
  }
  return { found: false };
}

async function searchDirectoriesForToken(dirs, patterns) {
  for (const dir of dirs) {
    try {
      const result = await searchDirectoryForToken(dir, patterns);
      if (result.found) {
        return result;
      }
    } catch (err) {
      console.error(`Error searching directory ${dir}:`, err);
    }
  }
  return { found: false };
}

async function checkTokenUsage(mapName, tokenKey) {
  const patterns = [
    `tokens.get('${tokenKey}')`,
    `tokens.get('${tokenKey.replace('post-', '')}')`,
    `tokens.get('${tokenKey}', components.$${mapName})`,
    `tokens.get('${tokenKey.replace('post-', '')}', components.$${mapName})`,
  ];

  try {
    const result = await searchDirectoriesForToken(styleDirs, patterns);
    if (result.found) {
      return true;
    } else {
      console.log(`Token: \x1b[36m"${tokenKey}"\x1b[0m not found in any style file`);
      return false;
    }
  } catch (err) {
    console.error(`Error searching for token "${mapName}.${tokenKey}":`, err);
    return false;
  }
}

async function processInputFile(inputFile, includedMaps) {
  const tokens = await getTokens(inputFile, includedMaps);

  let missingTokens = 0;
  for (const token of tokens) {
    const found = await checkTokenUsage(token.mapName, token.key);
    if (!found) {
      missingTokens++;
    }
  }

  return { total: tokens.length, missing: missingTokens };
}

async function main() {
  const includedMaps = argv.maps || [];

  if (includedMaps.length === 0) {
    console.log('No specific maps provided. Proceeding to check all tokens.');
  } else {
    console.log(`Checking tokens for maps: ${includedMaps.join(', ')}`);
  }

  try {
    let totalTokens = 0;
    let totalMissingTokens = 0;

    for (const inputFile of inputFiles) {
      const result = await processInputFile(inputFile, includedMaps);
      totalTokens += result.total;
      totalMissingTokens += result.missing;
    }

    console.log('\nOverall Summary:\n------------------------------------');
    console.log(`Total tokens checked: ${totalTokens}`);
    console.log(`Missing tokens: ${totalMissingTokens}`);
    console.log(
      `Overall usage coverage: ${(((totalTokens - totalMissingTokens) / totalTokens) * 100).toFixed(
        2,
      )}%`,
    );
    if (includedMaps.length > 0) {
      console.log(`Included maps: ${includedMaps.join(', ')}`);
    }
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

main();
