import { promises as fs } from 'fs';
import path from 'path';
import { HTMLElement, parse } from 'node-html-parser';
import { optimize } from 'svgo';
import { version } from '../../package.json';
import svgoOptions from '../../svgo.config.v2';

import {
  SOURCE_PATH,
  OUTPUT_PATH,
  ICON_V2_SIZES,
  ID_PREFIX,
  ID_SEPERATOR,
  ID_SYMBOL_PREFIX,
  ID_SYMBOL_SEPERATOR,
  ICON_SIZE_VAR_NAME,
  ICON_V1_TEMPLATE,
  ICON_V2_TEMPLATE,
} from '../constants';

const iconOutputPath = path.join(OUTPUT_PATH, 'post-icons/ui');
const reportOutputPath = path.join(OUTPUT_PATH, 'report.v2.json');

type File = {
  size: number | null;
  filePath: string;
};

type ReportIcon = {
  id: string;
  sizes: (number | null)[];
};

export default async function main() {
  console.log('\nCreating UI icons...');

  await setup();
  const report = await createFiles(await getFileGroups());
  await fs.writeFile(
    reportOutputPath,
    JSON.stringify(
      {
        icons: report.toSorted(sortIcons),
        created: new Date(),
        version,
      },
      null,
      2,
    ),
  );

  console.log(
    `\x1b[32mUI icons created.\x1b[0m Saved \x1b[32m${report.length}\x1b[0m icons to use with the <post-icon> component.`,
  );
}

async function setup() {
  // remove generated files & folders
  if (await fs.readFile(reportOutputPath).catch(() => false)) await fs.unlink(reportOutputPath);
  if (await fs.readdir(iconOutputPath).catch(() => false))
    await fs.rm(iconOutputPath, { recursive: true });

  // // ensure used folders exist
  if (!(await fs.readdir(iconOutputPath).catch(() => false)))
    await fs.mkdir(iconOutputPath, { recursive: true });
}

function sortIcons(a: ReportIcon, b: ReportIcon): number {
  return a.id < b.id ? -1 : 1;
}

async function getFileGroups(): Promise<Record<string, File[]>> {
  const filePaths = await fs.readdir(SOURCE_PATH, { recursive: true });

  return filePaths
    .filter(p => p.endsWith('.svg'))
    .reduce((groups, filePath) => {
      const nameParts = path
        .basename(filePath, '.svg')
        .split(/([^a-zA-Z0-9])/g)
        .filter(part => !/^[^a-zA-Z0-9]$/.test(part));
      const isMultiPartName = nameParts.length > 1;
      const isSizeIndicator = ICON_V2_SIZES.includes(Number(nameParts[nameParts.length - 1]));

      const id = getGroupId(nameParts, isMultiPartName, isSizeIndicator);
      const group = groups[id as keyof typeof groups] ?? [];
      const size =
        isMultiPartName && isSizeIndicator ? parseInt(nameParts[nameParts.length - 1]) : null;
      const file: File = {
        size,
        filePath,
      };

      return {
        ...groups,
        [id]: [...group, file],
      };
    }, {});

  function getGroupId(nameParts: string[], isMultiPartName: boolean, isSizeIndicator: boolean) {
    if (isMultiPartName && isSizeIndicator) {
      return nameParts
        .slice(0, nameParts.length - 1)
        .join(ID_SEPERATOR)
        .toLowerCase();
    }

    return nameParts.join(ID_SEPERATOR).toLowerCase();
  }
}

async function createFiles(groupedFilePaths: Record<string, File[]>): Promise<ReportIcon[]> {
  const report: ReportIcon[] = [];

  await Promise.all(
    Object.entries(groupedFilePaths).map(async ([id, files]) => {
      const svgs = await Promise.all(
        files.map(async ({ size, filePath }) => {
          const svg = await fs.readFile(path.join(SOURCE_PATH, filePath), 'utf-8');

          return {
            size,
            svg,
          };
        }),
      );

      const symbolId = files.length === 1 ? [ID_PREFIX, id].join(ID_SEPERATOR) : ID_SYMBOL_PREFIX;
      const template = files.length === 1 ? ICON_V1_TEMPLATE : ICON_V2_TEMPLATE;

      const symbols = svgs.map(({ size, svg }) => getSymbol(svg, symbolId, size));
      const uses = svgs.map(({ size }) => getUse(symbolId, size));
      const file = createSvg(id, template, symbols, uses);

      await fs.writeFile(path.join(iconOutputPath, `${id}.svg`), file);

      report.push({
        id,
        sizes: svgs.map(({ size }) => size),
      });
    }),
  );

  return report;

  function getSymbol(svg: string, symbolId: string, size: number | null): string {
    svg = optimize(svg, svgoOptions).data;

    const svgElement = parse(svg).querySelector('svg') as HTMLElement;
    const symbolElement = parse('<symbol/>').querySelector('symbol') as HTMLElement;

    symbolElement.setAttribute('id', getSymbolId(symbolId, size));
    symbolElement.innerHTML = svgElement.innerHTML;

    if (svgElement.attributes.viewBox) {
      symbolElement.setAttribute('viewBox', svgElement.attributes.viewBox);
    }

    return symbolElement.toString();
  }

  function getUse(symbolId: string, size: number | null): string {
    const useElement = parse('<use/>').querySelector('use') as HTMLElement;

    if (size !== null)
      useElement.setAttribute('style', `display: var(--${ICON_SIZE_VAR_NAME}-${size}, none)`);
    useElement.setAttribute('href', `#${getSymbolId(symbolId, size)}`);

    return useElement.toString();
  }

  function getSymbolId(symbolId: string, size: number | null): string {
    return [symbolId, size].filter(p => p).join(ID_SYMBOL_SEPERATOR);
  }

  function createSvg(id: string, template: string, symbols: string[], uses: string[]): string {
    const file = template
      .replace('{id}', `${ID_PREFIX}-${id}`)
      .replace('{symbols}', symbols.join(''))
      .replace('{uses}', uses.join(''));

    return optimize(file, {
      js2svg: {
        pretty: false,
      },
      plugins: [],
    }).data;
  }
}
