import React, { useEffect, useRef, useState } from 'react';
import { type AgChartOptions, AllCommunityModule, ModuleRegistry } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-react';

ModuleRegistry.registerModules([AllCommunityModule]);

function useIsVisible<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

const LOCALE_DATE_STRING_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const CHART_COLORS = [
  '#eb283e',
  '#edb168',
  '#bacf76',
  '#7feb91',
  '#91dced',
  '#cb91ed',
  '#eb49c8',
  '#f47b60',
  '#78c4d4',
  '#a3d977',
  '#f9a03f',
  '#8884d8',
  '#e06b9f',
  '#6bc5a0',
  '#d4a76a',
  '#7b9fe0',
  '#c9e04e',
  '#e87d5a',
  '#5ec4b6',
  '#d17de8',
];

const TotalDownloads: React.FC<{
  packageName: string;
  year: number;
  isFirstYear: boolean;
  isLastYear: boolean;
}> = ({ packageName, year, isFirstYear, isLastYear }) => {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [daysWithData, setDaysWithData] = useState<number | null>(null);
  const [firstDay, setFirstDay] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.npmjs.org/downloads/range/${year}-01-01:${year}-12-31/${packageName}`)
      .then(res => res.json())
      .then(data => {
        const days = data.downloads ?? [];
        const totalDaysInYear = new Date(year, 1, 29).getMonth() === 1 ? 366 : 365;

        if (isFirstYear || isLastYear) {
          const daysWithDownloads = days.filter(d => d.downloads > 0);
          setDaysWithData(daysWithDownloads.length);
          setDownloads(daysWithDownloads.reduce((sum, d) => sum + d.downloads, 0));
          setFirstDay(
            isFirstYear && daysWithDownloads.length > 0 ? daysWithDownloads[0].day : null,
          );
        } else {
          setDaysWithData(totalDaysInYear);
          setDownloads(days.reduce((sum, d) => sum + d.downloads, 0));
          setFirstDay(null);
        }
      });
  }, [packageName, year, isFirstYear, isLastYear]);

  return (
    <div>
      <div className="card card-stats">
        <h5>Days with data</h5>
        <p>
          {daysWithData != null
            ? `${daysWithData} / ${new Date(year, 1, 29).getMonth() === 1 ? 366 : 365}`
            : '…'}
        </p>
      </div>
      <div className="card card-stats mt-16">
        <h5>Total downloads ({year})</h5>
        <p>{downloads != null ? downloads.toLocaleString() : '…'}</p>
      </div>
      <div className="card card-stats mt-16">
        <h5>Average per day</h5>
        <p>
          {downloads && daysWithData ? Math.round(downloads / daysWithData).toLocaleString() : '…'}
        </p>
      </div>
    </div>
  );
};

const DownloadsChart: React.FC<{
  packageName: string;
  year: number;
  releases: { version: string; date: Date }[];
}> = ({ packageName, year, releases }) => {
  const [downloads, setDownloads] = useState<{ day: string; downloads: number }[]>([]);
  const [chartOptions, setChartOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    fetch(`https://api.npmjs.org/downloads/range/${year}-01-01:${year}-12-31/${packageName}`)
      .then(res => res.json())
      .then(data =>
        setDownloads(
          (data.downloads ?? []).map(d => ({
            ...d,
            day: new Date(d.day),
          })),
        ),
      );
  }, [packageName, year]);

  useEffect(() => {
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
    const avg = Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);

    const releaseY = max * 0.5;
    const releaseData = releases.map(r => ({
      day: r.date,
      downloads: releaseY,
      version: r.version,
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
            fill: CHART_COLORS[10],
            stroke: CHART_COLORS[10],
          },
          tooltip: {
            renderer: params =>
              `<div class="ag-chart-tooltip">
            <span class="fs-11">${params.datum.day.toLocaleDateString(undefined, LOCALE_DATE_STRING_OPTIONS)}</span>
                <span class="d-block mt-8 fs-9 fw-bold">${params.datum.version}</span>
              </div>`,
          },
        },
        {
          type: 'line',
          data: dataWithMedian,
          xKey: 'day',
          yKey: 'downloads',
          yName: 'Daily downloads',
          stroke: CHART_COLORS[8],
          strokeWidth: 2,
          marker: {
            enabled: false,
          },
          tooltip: {
            renderer: params =>
              `<div class="ag-chart-tooltip">
            <span class="fs-11">${params.datum.day.toLocaleDateString(undefined, LOCALE_DATE_STRING_OPTIONS)}</span>
                <span class="d-block mt-8 fs-9 fw-bold">Daily downloads: ${params.datum.downloads}</span>
              </div>`,
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
              label: { text: `Max: ${max.toLocaleString()}`, position: 'right' },
            },
            {
              type: 'line',
              value: avg,
              stroke: CHART_COLORS[7],
              strokeWidth: 2,
              label: { text: `Avg: ${avg.toLocaleString()}`, position: 'right' },
            },
          ],
        },
      },
      background: {
        fill: 'transparent',
      },
      theme: {
        palette: {
          fills: [CHART_COLORS[1], CHART_COLORS[11]],
          strokes: [CHART_COLORS[1], CHART_COLORS[11]],
        },
      },
    });
  }, [downloads, releases]);

  return (
    <div className="downloads-chart card card-charts">
      <AgCharts options={chartOptions} />
    </div>
  );
};

const VersionsChart: React.FC<{ packageName: string }> = ({ packageName }) => {
  const [downloads, setDownloads] = useState<{ version: string; downloads: number }[]>([]);
  const [chartOptions, setChartOptions] = useState<AgChartOptions>({});

  useEffect(() => {
    fetch(`https://api.npmjs.org/versions/${encodeURIComponent(packageName)}/last-week`)
      .then(res => res.json())
      .then(data => {
        setDownloads(
          Object.entries(data.downloads ?? {})
            .map(([version, downloads]) => ({
              version: `${version.split('.')[0]}.x`, // major version only
              downloads: downloads as number,
            }))
            .reduce(
              (acc, { version, downloads }) => {
                const existing = acc.find(d => d.version === version);
                if (existing) {
                  existing.downloads += downloads;
                } else {
                  acc.push({ version, downloads });
                }
                return acc;
              },
              [] as { version: string; downloads: number }[],
            )
            .sort((a, b) => parseInt(b.version) - parseInt(a.version)),
        );
      });
  }, [packageName]);

  useEffect(() => {
    const total = downloads.reduce((sum, d) => sum + d.downloads, 0);

    setChartOptions({
      title: {
        text: 'Downloads per version (last week)',
      },
      subtitle: {
        text: `Total: ${total.toLocaleString()}`,
      },
      data: downloads,
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
            const index = downloads.findIndex(d => d.version === datum.version);
            return { fill: CHART_COLORS[index % CHART_COLORS.length] };
          },
        },
      ],
      background: {
        fill: 'transparent',
      },
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
  }, [downloads]);

  return (
    <div className="card card-charts">
      <AgCharts options={chartOptions} />
    </div>
  );
};

export const StatsYearBlock: React.FC<{ packageName: string; startYear: number }> = ({
  packageName,
  startYear,
}) => {
  const [ref, isVisible] = useIsVisible<HTMLDivElement>();
  const endYear = new Date().getFullYear();
  const [registryTime, setRegistryTime] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isVisible) return;
    fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`)
      .then(res => res.json())
      .then(data => setRegistryTime(data.time ?? {}));
  }, [packageName, isVisible]);

  const releases = Object.entries(registryTime)
    .filter(([key]) => key !== 'created' && key !== 'modified')
    .map(([version, date]) => ({ version, date: new Date(date) }));

  return (
    <div ref={ref} className="stats-package lh-1">
      {!isVisible ? (
        <p className="text-center text-muted py-32">Loading...</p>
      ) : (
        <>
          <h2 className="text-center">{packageName}</h2>
          <p className="text-center text-muted">
            {registryTime.created && (
              <span>
                Package created:{' '}
                <span className="fw-bold">
                  {new Date(registryTime.created).toLocaleDateString(
                    undefined,
                    LOCALE_DATE_STRING_OPTIONS,
                  )}
                </span>
              </span>
            )}
            {registryTime.modified && (
              <span>
                {' '}
                · Last modified:{' '}
                <span className="fw-bold">
                  {new Date(registryTime.modified).toLocaleDateString(
                    undefined,
                    LOCALE_DATE_STRING_OPTIONS,
                  )}
                </span>
              </span>
            )}
          </p>
          <LazyVersionsChart packageName={packageName} />

          <hr className="my-32" />
          <h3 className="text-center">Download stats</h3>

          {Array.from({ length: endYear - startYear + 1 }, (_, i) => {
            const year = startYear + i;
            const yearReleases = releases.filter(r => r.date.getFullYear() === year);
            return (
              <LazyYearSection
                key={year}
                packageName={packageName}
                year={year}
                isFirstYear={year === startYear}
                isLastYear={year === endYear}
                releases={yearReleases}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

const LazyVersionsChart: React.FC<{ packageName: string }> = ({ packageName }) => {
  const [ref, isVisible] = useIsVisible<HTMLDivElement>();
  return (
    <div ref={ref}>
      {isVisible ? <VersionsChart packageName={packageName} /> : <div style={{ height: 300 }} />}
    </div>
  );
};

const LazyYearSection: React.FC<{
  packageName: string;
  year: number;
  isFirstYear: boolean;
  isLastYear: boolean;
  releases: { version: string; date: Date }[];
}> = ({ packageName, year, isFirstYear, isLastYear, releases }) => {
  const [ref, isVisible] = useIsVisible<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-16">
      <h4 className="text-center fw-normal">{year}</h4>
      {isVisible ? (
        <div className="d-flex flex-wrap gap-16 justify-content-between align-items-start mt-16">
          <TotalDownloads
            packageName={packageName}
            year={year}
            isFirstYear={isFirstYear}
            isLastYear={isLastYear}
          />
          <DownloadsChart packageName={packageName} year={year} releases={releases} />
        </div>
      ) : (
        <div style={{ height: 300 }} />
      )}
    </div>
  );
};
