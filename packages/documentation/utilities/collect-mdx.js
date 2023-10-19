const fs = require('fs');
const path = require('path');

const repoPath = path.resolve(__dirname, '../src/stories');
const mdxPaths = {};

console.log(repoPath);

function findMDXFiles(directory) {
  const mdxFiles = [];
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively search subdirectories
      const subdirectoryFiles = findMDXFiles(filePath);
      mdxFiles.push(...subdirectoryFiles);
    } else if (stats.isFile() && file.endsWith('.mdx')) {
      mdxFiles.push(filePath);
    }
  }

  return mdxFiles;
}

async function extractMetaTitle(mdxFilePath) {
  const tsFilePath = mdxFilePath.replace('docs.mdx', 'stories.ts');
  try {
    const tsFileContent = fs.readFileSync(tsFilePath, 'utf-8');

    // Use a regular expression to capture the title property
    const titleMatch = tsFileContent.match(/title:\s*'([^']+)'/);

    if (titleMatch && titleMatch[1]) {
      // Extract the title value
      return titleMatch[1];
    }
  } catch (error) {
    console.error(`Error extracting meta.title from ${tsFilePath}: ${error.message}`);
  }
  return null;
}

async function processMDXFiles() {
  const mdxFiles = await findMDXFiles(repoPath);

  for (const mdxFile of mdxFiles) {
    const metaTitle = await extractMetaTitle(mdxFile);
    console.log(`MDX File: ${mdxFile}`);
    console.log(`meta.title: ${metaTitle}`);
    if (metaTitle) {
      // Store the meta.title value with the MDX file path as the key
      mdxPaths[mdxFile] = metaTitle;
    }
  }
}

processMDXFiles();

module.exports = mdxPaths;
