const fs = require('fs');
const path = require('path');

// Helper function to parse icon details from a file path
function parseIconDetails(filePath) {
  console.log(filePath);
  const chunks = path.parse(filePath).name.split('_');
  return {
    icon: chunks[0],
    size: chunks[chunks.length - 1],
    variant: chunks.includes('Solid') ? 'solid' : 'line',
  };
}

// Helper function to process file sets into a Map of icon details
function processFiles(files) {
  const strings = files.flatMap(file => file.split(' ')).filter(str => str !== '');
  console.log(files, strings);
  return strings.map(parseIconDetails).reduce((icons, filePath) => {
    const { icon, size, variant } = parseIconDetails(filePath);

    const details = icons.get(icon) || { sizes: new Set(), variants: new Set() };
    details.sizes.add(size);
    details.variants.add(variant);

    return icons.set(icon, details);
  }, new Map());
}

// Helper function to format the icon details into a readable string
function formatIconDetails(icons) {
  return Array.from(icons.entries())
    .map(([icon, { sizes, variants }]) => {
      const allVariants = Array.from(variants).sort().join(' & ');
      const allSizes = Array.from(sizes)
        .sort()
        .join(', ')
        .replace(/, ([^,]*)$/, ', and $1');
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
    const icons = processFiles(fileSets);
    return formatIconDetails(icons);
  };

  return {
    major: {
      title: 'Deleted icons',
      icons: getIcons(DELETED_FILES),
    },
    minor: {
      title: 'Added icons',
      icons: getIcons(ADDED_FILES),
    },
    patch: {
      title: 'Updated icons',
      icons: getIcons(MODIFIED_FILES, RENAMED_FILES, COPIED_FILES),
    },
  };
}

// Helper function to write the changeset file
function writeChangesetToFile(changes, bump, date) {
  const filePath = `./.changeset/${date}-${bump}-ui-icon-update.md`;
  const content = `---\n'@swisspost/design-system-icons': ${bump}\n---\n\n${changes.title}:\n\n${changes.icons}`;

  try {
    fs.writeFileSync(filePath, content);
  } catch (err) {
    console.error(`Error writing changeset for ${bump}:`, err);
  }
}

// Function to write changesets based on icon changes
function writeChangesets({ DATE, ICON_CHANGES }) {
  const iconChanges = JSON.parse(ICON_CHANGES);

  Object.entries(iconChanges).forEach(([bump, changes]) => {
    if (changes.icons.length) {
      writeChangesetToFile(changes, bump, DATE);
    }
  });
}

// Function to write the PR body with icon changes
function writePrBody({ ICON_CHANGES }) {
  const iconChanges = JSON.parse(ICON_CHANGES);

  let content = '# Design system icons are now up to date!';
  Object.values(iconChanges).forEach(changes => {
    if (changes.icons.length) {
      content += `\n\n## ${changes.title}\n\n${changes.icons}`;
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
