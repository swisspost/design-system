import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { HTMLElement, parse } from 'node-html-parser';
import { optimize } from 'svgo';
import { version } from '../../package.json';
import svgoOptions from '../../svgo.config.ui';
import type { IJSONReport } from '../models/icon.model';
import { Businessfield, Type, TypeFilter, VariantMIME } from '../models/censhare-result-page.model';

import {
  SOURCE_PATH,
  OUTPUT_PATH,
  ICON_V2_SIZES,
  ID_PREFIX,
  ID_SEPERATOR,
  ID_UNWANTED_PARTS,
  ID_SYMBOL_PREFIX,
  ID_SYMBOL_SEPERATOR,
  ICON_SIZE_VAR_NAME,
  ICON_V1_TEMPLATE,
  ICON_V2_TEMPLATE,
} from '../constants';

type File = {
  size: number | null;
  filePath: string;
};

const iconSourcePath = SOURCE_PATH;
const iconOutputPath = path.join(OUTPUT_PATH, 'post-icons');
const buildReportOutputPath = path.join(OUTPUT_PATH, 'report.json');
const baseReport: IJSONReport = {
  icons: [],
  wrongViewBox: [],
  noKeywords: [],
  noSVG: [],
  errored: [],
  stats: {
    errors: 0,
    notFound: 0,
    success: 0,
  },
  created: new Date(),
  version: version,
};

export default function build() {
  console.log('\nCreating UI icons...');

  setup();

  createFiles(getFileGroups());
  const report = createReport();

  console.log(
    `\x1b[32mUI icons created.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m icons errored and \x1b[31m${report.stats.notFound}\x1b[0m where not found.`,
  );
}

function setup() {
  // remove generated files & folders
  if (fs.existsSync(iconOutputPath)) fs.rmSync(iconOutputPath, { recursive: true });
  if (fs.existsSync(buildReportOutputPath)) fs.unlinkSync(buildReportOutputPath);

  // // ensure used folders exist
  if (!fs.existsSync(iconOutputPath)) fs.mkdirSync(iconOutputPath, { recursive: true });
}

function getFileGroups(): Record<string, File[]> {
  const filePaths = fs.readdirSync(iconSourcePath, { recursive: true });

  return filePaths
    .filter(p => p.toString().endsWith('.svg'))
    .reduce((groups, filePath) => {
      filePath = filePath.toString();
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
      nameParts = nameParts.slice(0, nameParts.length - 1);
    }

    return nameParts
      .map(part => part.toLowerCase())
      .filter(part => !ID_UNWANTED_PARTS.includes(part))
      .join(ID_SEPERATOR);
  }
}

function createFiles(groupedFilePaths: Record<string, File[]>) {
  Object.entries(groupedFilePaths).forEach(([id, files]) => {
    const isSingleFile = files.length === 1;

    const svgs = files.map(({ size, filePath }) => ({
      size,
      svg: fs.readFileSync(path.join(iconSourcePath, filePath), 'utf-8'),
    }));

    const symbolId = isSingleFile ? [ID_PREFIX, id].join(ID_SEPERATOR) : ID_SYMBOL_PREFIX;
    const template = isSingleFile ? ICON_V1_TEMPLATE : ICON_V2_TEMPLATE;

    const symbols = svgs.map(({ size, svg }) => getSymbol(svg, symbolId, size));
    const uses = svgs.map(({ size }) => getUse(symbolId, size));
    const file = createSvg(id, template, symbols, uses);

    fs.writeFileSync(path.join(iconOutputPath, `${id}.svg`), file);
  });

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

function createReport(): IJSONReport {
  // TODO: remove as soon as UI-Icons get fetched from censhare
  createV2Report();

  const filePaths = fs
    .readdirSync(iconSourcePath, { recursive: true })
    .map(p => p.toString())
    .filter(p => path.basename(p) === 'report.json');

  const aggregatedReport = filePaths.reduce(
    (report: IJSONReport, filePath: string): IJSONReport => {
      const file = JSON.parse(fs.readFileSync(path.join(iconSourcePath, filePath), 'utf-8'));

      return {
        icons: [...report.icons, ...(file.icons ?? [])],
        wrongViewBox: [...report.wrongViewBox, ...(file.wrongViewBox ?? [])],
        noKeywords: [...report.noKeywords, ...(file.noKeywords ?? [])],
        noSVG: [...report.noSVG, ...(file.noSVG ?? [])],
        errored: [...report.errored, ...(file.errored ?? [])],
        stats: {
          errors: report.stats.errors + file.stats.errors,
          notFound: report.stats.notFound + file.stats.notFound,
          success: report.stats.success + file.stats.success,
        },
        created: report.created,
        version: report.version,
      };
    },
    baseReport,
  );

  aggregatedReport.created = new Date();
  aggregatedReport.version = version;

  fs.writeFileSync(buildReportOutputPath, JSON.stringify(aggregatedReport, null, 2));

  return aggregatedReport;
}

// TODO: remove as soon as UI-Icons are fetched from censhare
function createV2Report() {
  const filePaths = fs
    .readdirSync(iconOutputPath, { recursive: true })
    .map(p => p.toString())
    .filter(p => {
      const basename = path.basename(p);
      return basename.endsWith('.svg') && !/^(\d){4}\.svg$/.test(basename);
    });

  const report = filePaths.reduce((report: IJSONReport, filePath: string): IJSONReport => {
    const name = path.basename(filePath);
    const ext = path.extname(name);
    const basename = name.replace(ext, '');
    const now = new Date();

    return {
      ...report,
      icons: [
        ...report.icons,
        {
          uuid: crypto.randomUUID(),
          id: crypto.randomInt(100000, 999999),
          type: Type.PicturePictogram,
          typeFilter: TypeFilter.Pictograms,
          meta: {
            downloadLink: '',
            businessfield: Businessfield.Kommunikation,
            keywords: ['UI', name],
            year: '2024',
          },
          file: {
            mime: VariantMIME.ImageSVGXML,
            name,
            basename,
            ext,
            size: {
              width: 0,
              dpi: 72,
              height: 0,
            },
          },
          createdAt: now,
          modifiedAt: now,
        },
      ],
      stats: {
        errors: report.stats.errors,
        notFound: report.stats.notFound,
        success: report.stats.success + 1,
      },
    };
  }, baseReport);

  report.created = new Date();
  report.version = version;

  fs.writeFileSync(path.join(iconSourcePath, 'ui', 'report.json'), JSON.stringify(report, null, 2));

  return report;
}
