import type {
  SourceIcon,
  OutputIcon,
  MinimalIcon,
  IconSetGroupsItem,
  IconSetGroups,
  JsonReport,
  MinimalJsonReport,
} from '../../models/icon.model';
import fs from 'fs';
import path from 'path';
import { version } from '../../../package.json';
import { getBaseReport, sortIcons } from '../shared';

export function writeReport(
  reportOutputDirectory: string,
  iconSetGroups: IconSetGroups[],
): JsonReport {
  const outputReport = iconSetGroups.reduce((report: JsonReport, iconSet: IconSetGroups) => {
    const iconSetReport = JSON.parse(
      fs.readFileSync(path.join(iconSet.sourceDirectory, 'report.json'), 'utf-8'),
    ) as JsonReport;

    const outputIcons = Object.entries(iconSet.groups).map(([name, items]) => {
      return {
        uuid: crypto.randomUUID(),
        id: parseInt(crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(0, 6)),
        meta: {
          businessfield: getBusinessfield(items),
          keywords: getKeywords(items),
        },
        file: {
          mime: 'image/svg+xml',
          name: `${name}.svg`,
          basename: name,
          ext: '.svg',
        },
        createdAt: getCreatedAt(items),
        modifiedAt: getModifiedAt(items),
        sources: items.map((item: IconSetGroupsItem) => item.report.id),
      } as OutputIcon;
    });

    return {
      ...report,
      sources: [...(report.sources ?? []), ...iconSetReport.sources],
      icons: [...report.icons, ...outputIcons],
      wrongViewBox: [...report.wrongViewBox, ...iconSetReport.wrongViewBox],
      noKeywords: [...report.noKeywords, ...iconSetReport.noKeywords],
      noSVG: [...report.noSVG, ...iconSetReport.noSVG],
      errored: [...report.errored, ...iconSetReport.errored],
      stats: {
        errors: report.stats.errors + iconSetReport.stats.errors,
        notFound: report.stats.notFound + iconSetReport.stats.notFound,
        success: report.stats.success + iconSetReport.stats.success,
        output: [...report.icons, ...outputIcons].length,
      },
    } as JsonReport;
  }, getBaseReport());

  outputReport.sources.sort(sortIcons);
  outputReport.icons.sort(sortIcons);
  outputReport.wrongViewBox.sort(sortIcons);
  outputReport.noKeywords.sort(sortIcons);
  outputReport.noSVG.sort(sortIcons);
  outputReport.errored.sort(sortIcons);
  outputReport.created = new Date();
  outputReport.version = version;

  fs.writeFileSync(
    path.join(reportOutputDirectory, 'report.json'),
    JSON.stringify(outputReport, null, 2),
  );
  writeMinimalReport(reportOutputDirectory, outputReport);

  return outputReport;

  // get first businessfield
  function getBusinessfield(items: IconSetGroupsItem[]): string {
    return items[0].report.meta.businessfield ?? '';
  }

  // get merged, unic keywords
  function getKeywords(items: IconSetGroupsItem[]): string[] {
    return items.reduce<string[]>(
      (keywords, item: IconSetGroupsItem) =>
        Array.from(new Set([...keywords, ...item.report.meta.keywords])),
      [],
    );
  }

  // get oldest createdAt date
  function getCreatedAt(items: IconSetGroupsItem[]): Date {
    return items.map(item => item.report.createdAt).sort((a: Date, b: Date) => (a > b ? 1 : -1))[0];
  }

  // get newest modifiedAt date
  function getModifiedAt(items: IconSetGroupsItem[]): Date {
    return items
      .map(item => item.report.modifiedAt)
      .sort((a: Date, b: Date) => (a > b ? -1 : 1))[0];
  }
}

function writeMinimalReport(reportOutputDirectory: string, report: JsonReport) {
  const minimalReport: MinimalJsonReport = {
    sources: mapMinimalIcons(report.sources),
    icons: mapMinimalIcons(report.icons),
    created: report.created,
    version: report.version,
  };

  fs.writeFileSync(
    path.join(reportOutputDirectory, 'report.min.json'),
    JSON.stringify(minimalReport),
  );

  function mapMinimalIcons(icons: (SourceIcon | OutputIcon)[]): MinimalIcon[] {
    return icons.map(i => ({
      id: i.id,
      name: i.file.basename,
      keys: i.meta.keywords,
      sources: 'sources' in i ? i.sources : [],
    }));
  }
}
