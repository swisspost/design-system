import React, { useEffect, useRef, useState } from 'react';
import { type AgChartOptions, AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';
import { PostIcon } from '@swisspost/design-system-components-react/post-icon';

ModuleRegistry.registerModules([AllCommunityModule]);

// --- Types ---

type DayRecord = { day: string; downloads: number };
type VersionRecord = { version: string; downloads: number };
type Release = { version: string; date: Date };

// --- Constants ---

const DATE_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const NUMBER_FORMAT: Intl.NumberFormatOptions = { notation: 'standard', compactDisplay: 'short' };
const TRANSPARENT_BG = { fill: 'transparent' };
const CHART_COLORS = [
  '#e6194b',
  '#3cb44b',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#42d4f4',
  '#f032e6',
  '#bfef45',
  '#fabed4',
  '#469990',
  '#dcbeff',
  '#9a6324',
  '#800000',
  '#aaffc3',
  '#808000',
  '#000075',
  '#e6beff',
  '#ff4500',
  '#008080',
  '#ffd700',
];

/**
 * Main component that displays package statistics for a given npm package.
 * Fetches registry metadata and version downloads when visible, then renders
 * a versions chart and per-year download sections.
 * @param packageName - The npm package name to display stats for
 * @param startYear - The first year to show download statistics from
 */
export const PackageStatsBlock: React.FC<{ packageName: string; startYear: number }> = ({
  packageName,
  startYear,
}) => {
  const endYear = new Date().getFullYear();
  const [ref, isVisible] = useIsVisible<HTMLDivElement>();
  const [registryTime, setRegistryTime] = useState<Record<string, string>>({});
  const [versions, setVersions] = useState<VersionRecord[]>([]);
  const [locale, setLocale] = useState<string>(navigator.language);

  useEffect(() => {
    if (!ref.current) return;
    const lang = ref.current.closest('[lang]')?.getAttribute('lang');
    if (lang) setLocale(lang);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const pkg = encodeURIComponent(packageName);

    fetch(`https://registry.npmjs.org/${pkg}`)
      .then(res => res.json())
      .then(data => setRegistryTime(data.time ?? {}));

    fetch(`https://api.npmjs.org/versions/${pkg}/last-week`)
      .then(res => res.json())
      .then(data => {
        const grouped = new Map<string, number>();
        for (const [version, count] of Object.entries(data.downloads ?? {})) {
          const major = `${version.split('.')[0]}.x`;
          grouped.set(major, (grouped.get(major) ?? 0) + (count as number));
        }
        setVersions(
          [...grouped.entries()]
            .map(([version, downloads]) => ({ version, downloads }))
            .sort((a, b) => Number.parseInt(b.version) - Number.parseInt(a.version)),
        );
      });
  }, [packageName, isVisible]);

  const releases: Release[] = Object.entries(registryTime)
    .filter(([key]) => key !== 'created' && key !== 'modified')
    .map(([version, date]) => ({ version, date: new Date(date) }));

  return (
    <div ref={ref} className="stats-package lh-1">
      {isVisible ? (
        <>
          <h2 className="text-center">{packageName}</h2>
          <p className="text-center text-muted">
            {registryTime.created && (
              <span>
                Created: <span className="fw-bold">{formatDate(registryTime.created, locale)}</span>
              </span>
            )}
            {registryTime.modified && (
              <span>
                {' '}
                · Last modified:{' '}
                <span className="fw-bold">{formatDate(registryTime.modified, locale)}</span>
              </span>
            )}
          </p>
          <DownloadsPerVersionChart versions={versions} locale={locale} />

          <hr className="my-32" />
          <h3 className="text-center">Download stats</h3>

          {Array.from({ length: endYear - startYear + 1 }, (_, i) => {
            const year = startYear + i;
            const yearReleases = releases.filter(r => r.date.getFullYear() === year);

            return (
              <LazyDownloadStatsSection
                key={year}
                packageName={packageName}
                year={year}
                isFirstYear={year === startYear}
                isLastYear={year === endYear}
                releases={yearReleases}
                locale={locale}
              />
            );
          })}
        </>
      ) : (
        <div className="spinner-bg">
          <div className="spinner-modal">
            <div role="status" aria-live="polite" className="spinner m-auto">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Lazily loaded section for a single year. Fetches daily download data
 * only when scrolled into view, then renders DownloadsSummaryCards and DownloadsPerYearChart.
 * @param packageName - The npm package name to fetch downloads for
 * @param year - The calendar year to display
 * @param isFirstYear - Whether this is the earliest year (affects average calculation)
 * @param isLastYear - Whether this is the current year (affects average calculation)
 * @param releases - Package releases that occurred during this year
 */
const LazyDownloadStatsSection: React.FC<{
  locale: string;
  packageName: string;
  year: number;
  releases: Release[];
  isFirstYear: boolean;
  isLastYear: boolean;
}> = ({ packageName, year, isFirstYear, isLastYear, releases, locale }) => {
  const [ref, isVisible] = useIsVisible<HTMLDivElement>();
  const [days, setDays] = useState<DayRecord[]>([]);

  useEffect(() => {
    if (!isVisible) return;
    fetch(`https://api.npmjs.org/downloads/range/${year}-01-01:${year}-12-31/${packageName}`)
      .then(res => res.json())
      .then(data => setDays(data.downloads ?? []));
  }, [packageName, year, isVisible]);

  return (
    <div ref={ref} className="mt-16">
      <h4 className="palette palette-accent p-4 text-center fw-normal">{year}</h4>
      {isVisible ? (
        <div className="d-flex flex-column flex-sm-row flex-wrap gap-16 justify-content-between align-items-start">
          <DownloadsSummaryCards
            year={year}
            days={days}
            isFirstYear={isFirstYear}
            isLastYear={isLastYear}
            locale={locale}
          />
          <DownloadsPerYearChart
            year={year}
            days={days}
            isFirstYear={isFirstYear}
            isLastYear={isLastYear}
            releases={releases}
            locale={locale}
          />
        </div>
      ) : (
        <div style={{ height: 300 }} />
      )}
    </div>
  );
};

/**
 * Displays summary statistics cards for a given year: days with data,
 * total downloads, average per day, and maximum per day.
 * @param year - The calendar year to display stats for
 * @param days - Array of daily download records
 * @param isFirstYear - Whether this is the earliest year (only counts days with downloads > 0)
 * @param isLastYear - Whether this is the current year (only counts days with downloads > 0)
 */
const DownloadsSummaryCards: React.FC<{
  locale: string;
  year: number;
  days: DayRecord[];
  isFirstYear: boolean;
  isLastYear: boolean;
}> = ({ year, days, isFirstYear, isLastYear, locale }) => {
  const total = daysInYear(year);
  const relevant = filterRelevantDays(days, isFirstYear || isLastYear);
  const count = relevant.length;
  const downloads = relevant.reduce((sum, d) => sum + d.downloads, 0);
  const max = Math.max(0, ...relevant.map(d => d.downloads));

  return (
    <div className="d-flex flex-sm-column flex-wrap gap-16">
      <div className="card card-stats">
        <h5>Days with data</h5>
        <p>{`${count} / ${total}`}</p>
      </div>
      <div className="card card-stats">
        <h5>Maximum downloads per day</h5>
        <p>{formatNumber(max, locale)}</p>
      </div>
      <div className="card card-stats">
        <h5>Average downloads per day</h5>
        <p>{count > 0 ? formatNumber(Math.round(downloads / count), locale) : '…'}</p>
      </div>
      <div className="card card-stats">
        <h5>Total downloads</h5>
        <p>{formatNumber(downloads, locale)}</p>
        {isLastYear && count > 0 && (
          <p className="d-flex gap-4 opacity-50 fs-10 mt-4">
            <PostIcon name="target" />
            <span>{formatNumber(Math.round(downloads / count) * total, locale)}</span>
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Line chart showing daily downloads for a given year with median smoothing,
 * release markers, and crossLines for max/average values.
 * @param year - The calendar year to display
 * @param days - Array of daily download records
 * @param isFirstYear - Whether this is the earliest year (affects average calculation)
 * @param isLastYear - Whether this is the current year (affects average calculation)
 * @param releases - Package releases to render as diamond markers on the chart
 */
const DownloadsPerYearChart: React.FC<{
  locale: string;
  year: number;
  days: DayRecord[];
  releases: Release[];
  isFirstYear: boolean;
  isLastYear: boolean;
}> = ({ year, days, isFirstYear, isLastYear, releases, locale }) => {
  const [chartOptions, setChartOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    if (days.length === 0) return;

    const downloads = days.map(d => ({ ...d, day: new Date(d.day) }));

    const dataWithMedian = downloads.map((d, i) => {
      const start = Math.max(0, i - 3);
      const end = Math.min(downloads.length, i + 4);
      const window = downloads
        .slice(start, end)
        .map(w => w.downloads)
        .sort((a, b) => a - b);
      const mid = Math.floor(window.length / 2);
      const median = window.length % 2 ? window[mid] : (window[mid - 1] + window[mid]) / 2;
      return { ...d, median };
    });

    const values = downloads.map(d => d.downloads);
    const max = Math.max(...values);
    const relevant = filterRelevantDays(days, isFirstYear || isLastYear);
    const avg = Math.round(relevant.reduce((sum, d) => sum + d.downloads, 0) / relevant.length);

    const releaseY = max * 0.9;
    const grouped = releases.reduce<Record<string, string[]>>((acc, r) => {
      const key = r.date.toISOString().slice(0, 10);
      if (!acc[key]) acc[key] = [];
      acc[key].push(r.version);
      return acc;
    }, {});
    const releaseData = Object.entries(grouped).map(([day, versions]) => ({
      day: new Date(day),
      downloads: releaseY,
      version: [...versions].sort((a, b) => Number.parseInt(a) - Number.parseInt(b)).join(', '),
    }));

    setChartOptions({
      title: {
        text: `Downloads per day (${year})`,
      },
      series: [
        {
          type: 'line',
          data: releaseData,
          xKey: 'day',
          yKey: 'downloads',
          yName: 'Releases',
          stroke: 'transparent',
          strokeWidth: 0,
          marker: {
            enabled: true,
            shape: 'diamond',
            size: 8,
            fill: CHART_COLORS[3],
            stroke: CHART_COLORS[3],
          },
          tooltip: {
            renderer: params => chartTooltip(params.datum.version, locale, params.datum.day),
          },
        },
        {
          type: 'line',
          data: dataWithMedian,
          xKey: 'day',
          yKey: 'downloads',
          yName: 'Daily downloads',
          stroke: CHART_COLORS[2],
          strokeWidth: 1,
          marker: {
            enabled: false,
          },
          tooltip: {
            renderer: params =>
              chartTooltip(
                `Daily downloads: ${formatNumber(params.datum.downloads, locale)}`,
                locale,
                params.datum.day,
              ),
          },
        },
      ],
      axes: {
        x: {
          type: 'time',
          nice: false,
          min: new Date(year, 0, 1),
          max: new Date(year, 11, 31),
        },
        y: {
          type: 'number',
          title: {
            enabled: true,
            text: 'Downloads',
          },
          crossLines: [
            {
              type: 'line',
              value: max,
              stroke: CHART_COLORS[0],
              strokeWidth: 1,
              lineDash: [4, 2],
              label: { text: `Max: ${formatNumber(max, locale)}`, position: 'right' },
            },
            {
              type: 'line',
              value: avg,
              stroke: CHART_COLORS[9],
              strokeWidth: 1,
              lineDash: [4, 2],
              label: { text: `Avg: ${formatNumber(avg, locale)}`, position: 'right' },
            },
          ],
        },
      },
      background: TRANSPARENT_BG,
      tooltip: {
        mode: 'single',
      },
      theme: {
        palette: {
          fills: [CHART_COLORS[3], CHART_COLORS[2]],
          strokes: [CHART_COLORS[3], CHART_COLORS[2]],
        },
      },
    });
  }, [days, releases]);

  return (
    <div className="downloads-chart card card-charts w-full">
      <AgCharts options={chartOptions} />
    </div>
  );
};

/**
 * Horizontal bar chart showing downloads grouped by major version for the last week.
 * @param versions - Array of major versions with their aggregated download counts
 */
const DownloadsPerVersionChart: React.FC<{
  locale: string;
  versions: VersionRecord[];
}> = ({ versions, locale }) => {
  const [chartOptions, setChartOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    if (versions.length === 0) return;

    const total = versions.reduce((sum, d) => sum + d.downloads, 0);

    setChartOptions({
      title: {
        text: 'Downloads per version (last week)',
      },
      subtitle: {
        text: `Total: ${formatNumber(total, locale)}`,
      },
      data: versions,
      series: [
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: 'version',
          yKey: 'downloads',
          yName: 'Downloads',
          label: {
            color: 'var(--post-current-fg)',
            placement: 'outside-end',
            formatter: ({ value }) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
              return String(value);
            },
          },
          itemStyler: ({ datum }) => {
            const index = versions.findIndex(d => d.version === datum.version);
            return { fill: CHART_COLORS[index % CHART_COLORS.length] };
          },
          tooltip: {
            renderer: params =>
              chartTooltip(`Downloads: ${formatNumber(params.datum.downloads, locale)}`, locale),
          },
        },
      ],
      background: TRANSPARENT_BG,
      theme: {
        overrides: {
          bar: {
            series: {
              cornerRadius: 4,
            },
          },
        },
      },
    });
  }, [versions]);

  return (
    <div className="card card-charts">
      <AgCharts options={chartOptions} />
    </div>
  );
};

/**
 * Hook that uses IntersectionObserver to detect when an element becomes visible in the viewport.
 * Once visible, the observer disconnects and the state remains true permanently.
 * @returns A tuple of [ref to attach to the element, whether the element has been visible]
 */
function useIsVisible<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setIsVisible(true);
      observer.disconnect();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// --- Helpers ---

/** Format a date string using the shared locale options. */
const formatDate = (date: string, locale: string) =>
  new Date(date).toLocaleDateString(locale, DATE_FORMAT);

/** Format a number using the shared locale options. */
const formatNumber = (value: number, locale: string) => value.toLocaleString(locale, NUMBER_FORMAT);

/** Get the number of days in a given year. */
const daysInYear = (year: number) => (new Date(year, 1, 29).getMonth() === 1 ? 366 : 365);

/** Filter days to only those with downloads > 0 for partial years (first/last). */
const filterRelevantDays = (days: DayRecord[], isPartialYear: boolean) =>
  isPartialYear ? days.filter(d => d.downloads > 0) : days;

/** Format a tooltip cell for ag-charts. */
const chartTooltip = (label: string, locale: string, date?: Date) =>
  `<div class="ag-chart-tooltip">
    ${date ? `<span class="fs-11">${date.toLocaleDateString(locale, DATE_FORMAT)}</span>` : ''}
    <span class="d-block mt-8 fs-9 fw-bold">${label}</span>
  </div>`;
