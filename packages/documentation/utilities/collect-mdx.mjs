import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';
import path from 'path';

const currentFileURL = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileURL));
const repoPath = path.resolve(currentDir, '../src/stories');
const mdxPaths = {};

async function findMDXFiles(directory) {
  const mdxFiles = [];
  const files = await fs.readdir(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      // Recursively search subdirectories
      const subdirectoryFiles = await findMDXFiles(filePath);
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
    const tsFileContent = await fs.readFile(tsFilePath, 'utf-8');

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

// Process the MDX files
await processMDXFiles();

// Save the data to a JSON file
const jsonData = JSON.stringify(mdxPaths, null, 2);
const jsonFilePath = path.join(currentDir, 'mdxPaths.json');
await fs.writeFile(jsonFilePath, jsonData);
