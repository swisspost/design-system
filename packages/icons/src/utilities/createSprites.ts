import { promises } from 'fs';
import path from 'path';
import { HTMLElement, parse } from 'node-html-parser';
import { Config as svgoConfig, optimize } from 'svgo';

import { SOURCE_PATH, OUTPUT_PATH } from '../constants';

const SVGO_CONFIG: svgoConfig = {};

const FILE_NAME_SIZE_INDICATORS = ['16', '24', '32', '40', '48', '64'];
const ID_SEPERATOR = '-';
const SVG_SPRITE_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    {symbols}
  </defs>
</svg>`;

export default async function createSprites() {
  if (await promises.readdir(`${OUTPUT_PATH}/icons`).catch(() => false)) {
    await promises.rm(`${OUTPUT_PATH}/icons`, { recursive: true });
  }

  const filePaths = await getFilePaths();
  const groupedFilePaths = await getFileGroups(filePaths);

  await promises.mkdir(`${OUTPUT_PATH}/icons`, { recursive: true });
  await promises.writeFile(
    `${OUTPUT_PATH}/icons/_names.txt`,
    Object.keys(groupedFilePaths).join('\n'),
  );

  writeFiles(groupedFilePaths);
}

async function getFilePaths() {
  const filePaths = await promises.readdir(SOURCE_PATH, { recursive: true });
  return filePaths.filter(path => path.endsWith('.svg'));
}

async function getFileGroups(filePaths: string[]): Promise<Record<string, string[]>> {
  return filePaths.reduce((groups, filePath) => {
    const nameParts = path
      .basename(filePath, '.svg')
      .split(/([^a-zA-Z0-9])/g)
      .filter(part => !/^[^a-zA-Z0-9]$/.test(part));
    const isMultiPartName = nameParts.length > 1;
    const isSizeIndicator = FILE_NAME_SIZE_INDICATORS.includes(nameParts[nameParts.length - 1]);

    const groupId = getGroupId(nameParts);
    const group = groups[groupId as keyof typeof groups] ?? [];
    const size =
      isMultiPartName && isSizeIndicator ? parseInt(nameParts[nameParts.length - 1]) : null;

    return {
      ...groups,
      [groupId]: [...group, { size, filePath }],
    };
  }, {});

  function getGroupId(nameParts: string[]) {
    const isMultiPartName = nameParts.length > 1;
    const isSizeIndicator = FILE_NAME_SIZE_INDICATORS.includes(nameParts[nameParts.length - 1]);

    if (isMultiPartName && isSizeIndicator) {
      return nameParts
        .slice(0, nameParts.length - 1)
        .join(ID_SEPERATOR)
        .toLowerCase();
    }

    return nameParts.join(ID_SEPERATOR).toLowerCase();
  }
}

async function writeFiles(groupedFilePaths: Record<string, string[]>) {
  await Promise.all(
    Object.entries(groupedFilePaths).map(async ([groupId, files]) => {
      const symbols = await Promise.all(
        files.map(async ({ size, filePath }) => {
          const svg = await promises.readFile(`${SOURCE_PATH}/${filePath}`, 'utf-8');
          const optimizedSvg = optimize(svg, SVGO_CONFIG).data;

          const svgElement = parse(optimizedSvg).querySelector('svg') as HTMLElement;
          const symbolElement = parse('<symbol/>').querySelector('symbol') as HTMLElement;

          symbolElement.setAttribute('id', [groupId, size].filter(p => p).join(ID_SEPERATOR));
          symbolElement.innerHTML = svgElement.innerHTML;

          if (svgElement.attributes.viewBox) {
            symbolElement.setAttribute('viewBox', svgElement.attributes.viewBox);
          }

          return symbolElement.toString();
        }),
      );

      await promises.mkdir(`${OUTPUT_PATH}/icons`, { recursive: true });
      await promises.writeFile(
        `${OUTPUT_PATH}/icons/${groupId}-sprite.svg`,
        SVG_SPRITE_TEMPLATE.replace('{id}', groupId).replace('{symbols}', symbols.join('\n    ')),
      );
      await promises.writeFile(`${OUTPUT_PATH}/icons/names.txt`, groupId);
    }),
  );
}
