import type {
  SourceIcon,
  MergedIcon,
  ReportIcon,
  IconSetGroupsItem,
  IconSetGroups,
  SourceReport,
  MergedReport,
  Report,
  IconSetStats,
} from '../../models/icon.model';
import fs from 'fs';
import path from 'path';
import { version } from '../../../package.json';
import { getBaseMergedReport, sortIcons } from '../shared';

export function writeReport(
  reportOutputDirectory: string,
  iconSetGroups: IconSetGroups[],
): MergedReport {
  const mergedReport = iconSetGroups.reduce((report: MergedReport, iconSet: IconSetGroups) => {
    const iconSetSourceReport = JSON.parse(
      fs.readFileSync(path.join(iconSet.options.sourceDirectory, 'report.json'), 'utf-8'),
    ) as SourceReport;

    const erroredIds = iconSetSourceReport.errored.map((icon: SourceIcon) => icon.id);
    const noSVGIds = iconSetSourceReport.noSVG.map((icon: SourceIcon) => icon.id);
    const wrongViewBoxIds = iconSetSourceReport.wrongViewBox.map((icon: SourceIcon) => icon.id);
    const duplicateIds = iconSetSourceReport.duplicates.map((icon: SourceIcon) => icon.id);

    const mergedIcons = Object.entries(iconSet.groups).map(([name, items]) => {
      const sources = items.map((icon: IconSetGroupsItem) => icon.sourceIcon);
      const sourcesIds = sources.map((icon: SourceIcon) => icon.id);
      const keywords = getIconKeywords(items);

      const errored = sourcesIds.filter((id: number) => erroredIds.includes(id));
      const noSVG = sourcesIds.filter((id: number) => noSVGIds.includes(id));
      const wrongViewBox = sourcesIds.filter((id: number) => wrongViewBoxIds.includes(id));
      const duplicates = sourcesIds.filter((id: number) => duplicateIds.includes(id));
      const hasAllSources = items.length === iconSet.options.expectedSourcesPerIcon;
      const hasKeywords = keywords.length > 0;

      return {
        uuid: crypto.randomUUID(),
        id: parseInt(crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(0, 6)),
        meta: {
          businessfield: getIconBusinessfield(items),
          keywords,
        },
        file: {
          mime: 'image/svg+xml',
          name: `${name}.svg`,
          basename: name,
          ext: '.svg',
        },
        stats: {
          set: iconSet.name,
          sources,
          errored,
          noSVG,
          wrongViewBox,
          duplicates,
          hasAllSources,
          hasKeywords,
          success:
            [...errored, ...noSVG, ...wrongViewBox, ...duplicates].length === 0 &&
            hasAllSources &&
            hasKeywords,
        },
        createdAt: getIconCreatedAt(items),
        modifiedAt: getIconModifiedAt(items),
      } as MergedIcon;
    });

    return {
      ...report,
      icons: [...report.icons, ...mergedIcons],
    } as MergedReport;
  }, getBaseMergedReport());

  mergedReport.icons.sort(sortIcons);
  mergedReport.stats.set = getReportSetStats();
  mergedReport.stats.sources = getReportStats('sources');
  mergedReport.stats.errored = getReportStats('errored');
  mergedReport.stats.noSVG = getReportStats('noSVG');
  mergedReport.stats.wrongViewBox = getReportStats('wrongViewBox');
  mergedReport.stats.duplicates = getReportStats('duplicates');
  mergedReport.stats.hasAllSources = mergedReport.icons.filter(i => !i.stats.hasAllSources).length;
  mergedReport.stats.noKeywords = mergedReport.icons.filter(i => !i.stats.hasKeywords).length;
  mergedReport.stats.success = mergedReport.icons.filter(i => i.stats.success).length;
  mergedReport.created = new Date();
  mergedReport.version = version;

  fs.writeFileSync(
    path.join(reportOutputDirectory, 'report.json'),
    JSON.stringify(mergedReport, null, 2),
  );
  writeMinReport(reportOutputDirectory, mergedReport);

  return mergedReport;

  // get first businessfield
  function getIconBusinessfield(items: IconSetGroupsItem[]): string {
    return items[0].sourceIcon.meta.businessfield ?? '';
  }

  // get merged, unic keywords
  function getIconKeywords(items: IconSetGroupsItem[]): string[] {
    return items.reduce<string[]>(
      (keywords, item: IconSetGroupsItem) =>
        Array.from(new Set([...keywords, ...item.sourceIcon.meta.keywords])),
      [],
    );
  }

  // get oldest createdAt date
  function getIconCreatedAt(items: IconSetGroupsItem[]): Date {
    return items
      .map(item => item.sourceIcon.createdAt)
      .sort((a: Date, b: Date) => (a > b ? 1 : -1))[0];
  }

  // get newest modifiedAt date
  function getIconModifiedAt(items: IconSetGroupsItem[]): Date {
    return items
      .map(item => item.sourceIcon.modifiedAt)
      .sort((a: Date, b: Date) => (a > b ? -1 : 1))[0];
  }

  function getReportSetStats() {
    return mergedReport.icons.reduce((acc: { [key: string]: IconSetStats }, icon: MergedIcon) => {
      acc[icon.stats.set] = acc[icon.stats.set] ?? ({ sources: 0, outputs: 0 } as IconSetStats);
      acc[icon.stats.set].sources += icon.stats.sources.length;
      acc[icon.stats.set].outputs++;
      return acc;
    }, {});
  }

  function getReportStats(
    key: 'sources' | 'errored' | 'noSVG' | 'wrongViewBox' | 'duplicates',
  ): number {
    return mergedReport.icons.reduce((sum, icon: MergedIcon) => sum + icon.stats[key].length, 0);
  }
}

function writeMinReport(reportOutputDirectory: string, report: MergedReport) {
  const minimalReport: Report = {
    icons: mapReportIcons(report.icons),
    stats: report.stats,
    created: report.created,
    version: report.version,
  };

  fs.writeFileSync(
    path.join(reportOutputDirectory, 'report.min.json'),
    JSON.stringify(minimalReport),
  );

  function mapReportIcons(icons: MergedIcon[]): ReportIcon[] {
    return icons.map((icon: MergedIcon) => ({
      id: icon.id,
      name: icon.file.basename,
      keys: icon.meta.keywords,
      stats: {
        ...icon.stats,
        sources: icon.stats.sources.map((source: SourceIcon) => ({
          id: source.id,
          name: source.file.name,
        })),
      },
    }));
  }
}
