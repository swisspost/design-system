import fs from 'fs';
import path from 'path';

/**
 * @typedef {Object} ParsedPath
 * @property {string} root - The root of the path.
 * @property {string} dir - The full directory path excluding the base.
 * @property {string} base - The full file name including extension.
 * @property {string} ext - The file extension, including the dot.
 * @property {string} name - The file name without the extension.
 */


/**
 * @typedef {Object} IconSection
 * @property {string} title - The section title (e.g. 'UI icons').
 * @property {string} icons - Formatted string listing the icons.
 */

/**
 * @typedef {Object} ChangeSetGroup
 * @property {string} title - The title of the change group (e.g. 'Deleted icons').
 * @property {{ post: IconSection, ui: IconSection }} sections - Icons by category.
 */

/**
 * @typedef {Object} IconChangeSummary
 * @property {ChangeSetGroup} major - Deleted icons.
 * @property {ChangeSetGroup} minor - Added icons.
 * @property {ChangeSetGroup} patch - Updated icons.
 */

/**
 * Formats a list into a human-readable string with delimiters.
 *
 * @param {Array<string> | ArrayLike<string>} list - The list of items to format.
 * @param {string} delimiter - The delimiter used between items.
 * @param {string} [lastDelimiter=delimiter] - The delimiter before the last item.
 * @returns {string} Formatted string.
 */
function formatList(list, delimiter, lastDelimiter = delimiter) {
  const items = Array.from(list);

  switch (items.length) {
    case 0:
      return '';
    case 1:
      return items[0];
    default:
      const lastItem = items.sort().pop();
      return `${items.join(delimiter)}${lastDelimiter}${lastItem}`;
  }
}

/**
 * Parses the icon details from a given UI icon file name.
 *
 * @param {string} fileName - The file name to parse.
 * @returns {{ icon: string, size: string, variant: string }} Parsed icon details.
 */
function parseUiIconDetails(fileName) {
  const chunks = fileName.split('_');
  return {
    icon: chunks[0].toLowerCase(),
    size: chunks[chunks.length - 1],
    variant: chunks.includes('Solid') ? 'solid' : 'line',
  };
}

/**
 * Parses file paths and categorizes them into `postIconFiles` and `uiIconFiles`.
 *
 * @param {string[]} files - Array of file paths.
 * @returns {{ postIconFiles: Array<ParsedPath>, uiIconFiles: Array<ParsedPath> }} Separated file groups.
 */
function processFiles(files) {
  return files
    .flatMap(file => file.split(' '))
    .reduce(
      (icons, filePath) => {
        const { postIconFiles, uiIconFiles } = icons;
        const parsedFilePath = path.parse(filePath);

        if (parsedFilePath.dir.match(/\/post$/)) {
          postIconFiles.push(parsedFilePath);
        }
        if (parsedFilePath.dir.match(/\/ui$/)) uiIconFiles.push(parsedFilePath);

        return icons;
      },
      { postIconFiles: [], uiIconFiles: [] },
    );
}

/**
 * Builds a Map of UI icon metadata from parsed file paths.
 *
 * @param {Array<ParsedPath>} parsedFilePaths - Array of parsed file paths.
 * @returns {Map<string, { sizes: Set<string>, variants: Set<string> }>} Icon metadata map.
 */
function processUiIconFiles(parsedFilePaths) {
  return parsedFilePaths.reduce((icons, parsedFilePath) => {
    const { icon, size, variant } = parseUiIconDetails(parsedFilePath.name);

    const details = icons.get(icon) || { sizes: new Set(), variants: new Set() };
    details.sizes.add(size);
    details.variants.add(variant);

    return icons.set(icon, details);
  }, new Map());
}

/**
 * Formats a list of Post icon files into a readable string.
 *
 * @param {Array<ParsedPath>} iconFiles - Array of parsed post icon file paths.
 * @returns {string} Formatted icon list.
 */
function formatPostIcons(iconFiles) {
  const iconNames = iconFiles.map(({ name }) => `\`${name}\``);
  return formatList(iconNames, ', ', ' and ');
}

/**
 * Formats a list of UI icon files into a readable Markdown string.
 *
 * @param {Array<ParsedPath>} iconFiles - Array of parsed UI icon file paths.
 * @returns {string} Formatted UI icons description.
 */
function formatUiIcons(iconFiles) {
  const icons = processUiIconFiles(iconFiles);

  return Array.from(icons.entries())
    .map(([icon, { sizes, variants }]) => {
      const allVariants = formatList(variants, ' & ');
      const allSizes = formatList(sizes, ', ', ' and ');
      return `\n- \`${icon}\` (${allVariants}): ${allSizes}px`;
    })
    .join('');
}

/**
 * Generates a categorized summary of icon changes.
 *
 * @param {Object} param
 * @param {string[]} param.ADDED_FILES
 * @param {string[]} param.MODIFIED_FILES
 * @param {string[]} param.RENAMED_FILES
 * @param {string[]} param.COPIED_FILES
 * @param {string[]} param.DELETED_FILES
 * @returns {IconChangeSummary} Change summary grouped by type.
 */
export function getIconChanges({
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

/**
 * Writes markdown changeset files based on detected icon changes.
 *
 * @param {Object} param
 * @param {string} param.DATE - Date identifier for the changeset.
 * @param {string} param.ICON_CHANGES - JSON string of icon changes.
 */
export function writeChangesets({ DATE, ICON_CHANGES }) {
  /** @type {IconChangeSummary} */
  const iconChanges = JSON.parse(ICON_CHANGES);

  Object.entries(iconChanges).forEach(([bump, changes]) => {
    Object.entries(changes.sections).forEach(([set, { icons }]) => {
      if (icons) {
        const filePath = `./.changeset/${DATE}-${bump}-${set}-icon-update.md`;
        const content = `---\n'@swisspost/design-system-icons': ${bump}\n---\n\n${changes.title}:\n${icons}`;

        try {
          fs.writeFileSync(filePath, content);
        } catch (err) {
          console.error(`Error writing changeset for ${bump}:`, err);
        }
      }
    });
  });
}

/**
 * Writes a pull request body with a summary of icon changes.
 *
 * @param {Object} param
 * @param {string} param.PR_BODY_FILE - The name of the file that stores the PR body.
 * @param {string} param.ICON_CHANGES - JSON string of icon changes.
 */
export function writePrBody({ ICON_CHANGES, PR_BODY_FILE }) {
  /** @type {IconChangeSummary} */
  const iconChanges = JSON.parse(ICON_CHANGES);

  let content = '# Design System Icons: Now Up to Date!';

  Object.values(iconChanges).forEach(changes => {
    let changeDetails = '';

    Object.values(changes.sections).forEach(section => {
      if (section.icons) {
        changeDetails += `\n\n${section.title}:\n${section.icons}`;
      }
    });

    if (changeDetails) {
      content += `\n\n## ${changes.title}${changeDetails}`;
    }
  });

  try {
    fs.writeFileSync(`./${PR_BODY_FILE}`, content);
  } catch (err) {
    console.error('Error writing PR body:', err);
  }

  return PR_BODY_FILE;
}
