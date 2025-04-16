const fs = require('fs');
const path = require('path');

function formatList(list, delimiter, lastDelimiter = delimiter) {
  const items = Array.from(list).sort();
  const lastItem = items.pop();
  return `${items.join(delimiter)}${lastDelimiter}${lastItem}`;
}

// Helper function to parse icon details from a file path
function parseIconDetails(fileName) {
  const chunks = fileName.split('_');
  return {
    icon: chunks[0],
    size: chunks[chunks.length - 1],
    variant: chunks.includes('Solid') ? 'solid' : 'line',
  };
}

// Helper function to process file sets into a Map of icon details
function processFiles(files) {
  return files
    .flatMap(file => file.split(' '))
    .reduce(
      (icons, filePath) => {
        const { postIconFiles, uiIconFiles } = icons;
        const parseFilPath = path.parse(filePath);

        if (parseFilPath.dir.match(/\/post$/)) postIconFiles.push(parseFilPath);
        if (parseFilPath.dir.match(/\/ui$/)) uiIconFiles.push(parseFilPath);

        return icons;
      },
      { postIconFiles: [], uiIconFiles: [] },
    );
}

// Helper function to process file sets into a Map of icon details
function processUiIconFiles(parsedFilePaths) {
  return parsedFilePaths.reduce((icons, parsedFilePath) => {
    const { icon, size, variant } = parseIconDetails(parsedFilePath.name);

    const details = icons.get(icon) || { sizes: new Set(), variants: new Set() };
    details.sizes.add(size);
    details.variants.add(variant);

    return icons.set(icon, details);
  }, new Map());
}

// Helper function to format the icon details into a readable string
function formatPostIcons(iconFiles) {
  const iconNames = iconFiles.map(({ name }) => name);
  return formatList(iconNames, ', ', ', and ');
}

// Helper function to format the icon details into a readable string
function formatUiIcons(iconFiles) {
  const icons = processUiIconFiles(iconFiles);

  return Array.from(icons.entries())
    .map(([icon, { sizes, variants }]) => {
      const allVariants = formatList(variants, ' & ');
      const allSizes = formatList(sizes, ', ', ', and ');
      return `- \`${icon}\` (${allVariants}): ${allSizes}px`;
    })
    .join('\n');
}

// Function to get icon changes
function getIconChanges({
  ADDED_FILES,
  MODIFIED_FILES,
  RENAMED_FILES,
  COPIED_FILES,
  DELETED_FILES,
}) {
  const getIcons = (...fileSets) => {
    const { postIconFiles, uiIconFiles } = processFiles(fileSets);
    return {
      post: {
        title: 'Post icons',
        icons: formatPostIcons(postIconFiles),
      },
      ui: {
        title: 'UI icons',
        icons: formatUiIcons(uiIconFiles),
      },
    };
  };

  return {
    major: {
      title: 'Deleted icons',
      sections: getIcons(DELETED_FILES),
    },
    minor: {
      title: 'Added icons',
      sections: getIcons(ADDED_FILES),
    },
    patch: {
      title: 'Updated icons',
      sections: getIcons(MODIFIED_FILES, RENAMED_FILES, COPIED_FILES),
    },
  };
}

// Function to write changesets based on icon changes
function writeChangesets({ DATE, ICON_CHANGES }) {
  const iconChanges = JSON.parse(ICON_CHANGES);

  Object.entries(iconChanges).forEach(([bump, changes]) => {
    Object.values(changes.sections).forEach(([set, { icons }]) => {
      if (icons) {
        const filePath = `./.changeset/${DATE}-${bump}-${set}-icon-update.md`;
        const content = `---\n'@swisspost/design-system-icons': ${bump}\n---\n\n${changes.title}:\n\n${icons}`;

        try {
          fs.writeFileSync(filePath, content);
        } catch (err) {
          console.error(`Error writing changeset for ${bump}:`, err);
        }
      }
    });
  });
}

// Function to write the PR body with icon changes
function writePrBody({ ICON_CHANGES }) {
  const iconChanges = JSON.parse(ICON_CHANGES);

  let content = '# Design System Icons: Now Up to Date!';

  Object.values(iconChanges).forEach(changes => {
    let changeDetails = '';
    Object.values(changes.sections).forEach(section => {
      if (section.icons) {
        changeDetails += `\n\n## ${section.title}\n\n${section.icons}`;
      }
    });

    if (changeDetails) {
      content += `\n\n## ${changes.title}${changeDetails}`;
    }
  });

  try {
    fs.writeFileSync('./pr-body.md', content);
  } catch (err) {
    console.error('Error writing PR body:', err);
  }
}

module.exports = {
  getIconChanges,
  writeChangesets,
  writePrBody,
};
