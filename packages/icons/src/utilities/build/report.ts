import type {
  SourceIcon,
  MergedIcon,
  MinimalIcon,
  IconSetGroupsItem,
  IconSetGroups,
  SourceReport,
  MergedReport,
  MinimalReport,
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

    const mergedIcons = Object.entries(iconSet.groups).map(([name, items]) => {
      const sources = items.map((icon: IconSetGroupsItem) => icon.sourceIcon);
      const sourcesIds = sources.map((icon: SourceIcon) => icon.id);
      const keywords = getIconKeywords(items);

      const sourcesErrored = sourcesIds.filter((id: number) => erroredIds.includes(id));
      const sourcesNoSVG = sourcesIds.filter((id: number) => noSVGIds.includes(id));
      const sourcesWrongViewBox = sourcesIds.filter((id: number) => wrongViewBoxIds.includes(id));

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
          sources,
          sourcesErrored,
          sourcesNoSVG,
          sourcesWrongViewBox,
          hasRightAmountOfSources: items.length === iconSet.options.expectedSourcesPerIcon,
          hasKeywords: keywords.length > 0,
          success: [...sourcesErrored, ...sourcesNoSVG, ...sourcesWrongViewBox].length === 0,
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
  mergedReport.stats.sources = getReportStats('sources');
  mergedReport.stats.errored = getReportStats('sourcesErrored');
  mergedReport.stats.noSVG = getReportStats('sourcesNoSVG');
  mergedReport.stats.wrongViewBox = getReportStats('sourcesWrongViewBox');
  mergedReport.stats.noKeywords = mergedReport.icons.filter(i => !i.stats.hasKeywords).length;
  mergedReport.stats.success = mergedReport.icons.filter(i => i.stats.success).length;
  mergedReport.created = new Date();
  mergedReport.version = version;

  fs.writeFileSync(
    path.join(reportOutputDirectory, 'report.json'),
    JSON.stringify(mergedReport, null, 2),
  );
  writeMinimalReport(reportOutputDirectory, mergedReport);

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

  function getReportStats(
    key: 'sources' | 'sourcesErrored' | 'sourcesNoSVG' | 'sourcesWrongViewBox',
  ): number {
    return mergedReport.icons.reduce((sum, icon: MergedIcon) => sum + icon.stats[key].length, 0);
  }
}

function writeMinimalReport(reportOutputDirectory: string, report: MergedReport) {
  const minimalReport: MinimalReport = {
    icons: mapMinimalIcons(report.icons),
    stats: report.stats,
    created: report.created,
    version: report.version,
  };

  fs.writeFileSync(
    path.join(reportOutputDirectory, 'report.min.json'),
    JSON.stringify(minimalReport),
  );

  function mapMinimalIcons(icons: MergedIcon[]): MinimalIcon[] {
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
