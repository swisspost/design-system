import type {
  MinimalReport,
  MinimalIcon,
  MinimalSourceIcon,
} from '@swisspost/design-system-icons/src/models/icon.model';
import React from 'react';
import reportData from '@swisspost/design-system-icons/public/report.min.json';

const report = reportData as unknown as MinimalReport;

interface SearchProps {
  filter?: (icon: MinimalIcon) => boolean;
  mapper: (icon: MinimalIcon) => React.ReactNode;
}

interface ErrorInSourceProps {
  title: string;
  statsKey: 'sourcesErrored' | 'sourcesNoSVG' | 'sourcesWrongViewBox';
}

function getHeader({ title, hasErrors }: { title: string; hasErrors: boolean }): React.ReactNode {
  return (
    <span>
      <span>{title}</span>
      <span className="float-end">
        {hasErrors ? (
          <post-icon name="error" class="status-danger" />
        ) : (
          <post-icon name="success" class="status-success" />
        )}
      </span>
    </span>
  );
}

function mapper(icon: MinimalIcon) {
  const sources = icon.stats.sources.map((icon: MinimalSourceIcon) => (
    <code key={icon.id}>{icon.name}</code>
  ));
  return sources.length > 1 ? <div key={icon.id}>{sources}</div> : sources;
}

class Search extends React.Component<SearchProps> {
  form = {
    id: window.crypto.randomUUID(),
    query: '',
    results: report.icons,
  };

  filter: (icon: MinimalIcon) => boolean = () => true;
  mapper: (icon: MinimalIcon) => React.ReactNode;

  constructor(props: SearchProps) {
    super(props);
    if (typeof props.filter === 'function') {
      this.filter = props.filter;
    }
    this.mapper = props.mapper.bind(this);
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  search(value: string) {
    this.form.query = value;
    this.setState(this.form);
  }

  reset(e: React.MouseEvent<HTMLButtonElement>): void {
    (e.target as HTMLButtonElement).value = '';
    this.search('');
  }

  searchFilter(icon: MinimalIcon) {
    if (this.form.query === '') return true;

    return `${icon.id}, ${icon.name}, ${icon.keys.join(', ')}, ${icon.stats.sources.join(
      ', ',
    )}`.includes(this.form.query);
  }

  render() {
    return (
      <div className="search">
        <div className="form">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="search-input form-floating">
                <input
                  id={this.form.id}
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  value={this.form.query}
                  onChange={e => this.search(e.target.value)}
                />
                <label className="form-label" htmlFor={this.form.id}>
                  "id", "name", "keyword" or "sourceId"
                </label>

                <button className="delete-button" aria-label="Clear search" onClick={this.reset}>
                  <post-icon name="closex"></post-icon>
                </button>

                <button className="search-button" aria-label="Start search">
                  <post-icon name="search"></post-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="results">
          {this.form.results
            .filter(this.searchFilter)
            .filter(this.filter)
            .map(icon => (
              <div key={icon.id}>{this.mapper(icon)}</div>
            ))}
        </div>
      </div>
    );
  }
}

class ErrorInSource extends React.Component<ErrorInSourceProps> {
  hasErrors: boolean;
  title: string;
  statsKey: 'sourcesErrored' | 'sourcesNoSVG' | 'sourcesWrongViewBox';
  getHeader: (props: { title: string; hasErrors: boolean }) => React.ReactNode;

  constructor(props: ErrorInSourceProps) {
    super(props);
    this.filter = this.filter.bind(this);
    this.mapper = this.mapper.bind(this);

    this.title = props.title;
    this.statsKey = props.statsKey;
    this.hasErrors = report.icons.some(this.filter);
    this.getHeader = getHeader.bind(this);
  }

  filter(icon: MinimalIcon) {
    return (icon.stats[this.statsKey as keyof typeof icon.stats] as number[]).length > 0;
  }

  mapper(icon: MinimalIcon) {
    return (
      <details>
        <summary>
          <code>{icon.name}</code>
        </summary>
        <ul>
          {(icon.stats[this.statsKey as keyof typeof icon.stats] as number[]).map((id: number) => {
            const source = icon.stats.sources.find(
              (sourceIcon: MinimalSourceIcon) => sourceIcon.id === id,
            );

            return (
              <li key={source?.id}>
                <code>{source?.name}</code>
              </li>
            );
          })}
        </ul>
      </details>
    );
  }

  render() {
    return (
      <div>
        {this.hasErrors ? (
          <details>
            <summary>{this.getHeader({ title: this.title, hasErrors: this.hasErrors })}</summary>
            <Search filter={this.filter} mapper={this.mapper}></Search>
          </details>
        ) : (
          this.getHeader({ title: this.title, hasErrors: this.hasErrors })
        )}
      </div>
    );
  }
}

export const StatusBlock: React.FC = () => (
  <div className="status">
    <div>
      <strong>Version:</strong> {report.version}
    </div>
    <div>
      <strong>Last updated:</strong> {new Date(report.created).toString()}
    </div>

    <hr />

    <div>
      <strong>Source files:</strong> {report.stats.sources}
    </div>
    <div>
      <strong>Output files:</strong> {report.stats.success}
    </div>

    <hr />

    <div>
      <strong>Download errors:</strong>{' '}
      <span className={report.stats.errored > 0 ? 'status-danger' : 'status-success'}>
        {report.stats.errored}
      </span>
    </div>

    <div>
      <strong>Invalid SVG content:</strong>{' '}
      <span className={report.stats.noSVG > 0 ? 'status-danger' : 'status-success'}>
        {report.stats.noSVG}
      </span>
    </div>

    <div>
      <strong>Wrong ViewBox:</strong>{' '}
      <span className={report.stats.wrongViewBox > 0 ? 'status-danger' : 'status-success'}>
        {report.stats.wrongViewBox}
      </span>
    </div>

    <div>
      <strong>Wrong amount of sources:</strong>{' '}
      <span className={report.stats.wrongAmountOfSources > 0 ? 'status-danger' : 'status-success'}>
        {report.stats.wrongAmountOfSources}
      </span>
    </div>

    <div>
      <strong>No Keywords:</strong>{' '}
      <span className={report.stats.noKeywords > 0 ? 'status-danger' : 'status-success'}>
        {report.stats.noKeywords}
      </span>
    </div>
  </div>
);

export const SourceFiles: React.FC = () => (
  <details>
    <summary>Available source files</summary>
    <Search mapper={mapper.bind(this)}></Search>
  </details>
);

export const ErroredIcons: React.FC = () => {
  return (
    <ErrorInSource
      title="Icons with sources, which errored while downloading"
      statsKey="sourcesErrored"
    />
  );
};

export const NoSVGIcons: React.FC = () => {
  return (
    <ErrorInSource
      title="Icons with sources, which contain invalid SVG code"
      statsKey="sourcesNoSVG"
    />
  );
};

export const WrongViewBoxIcons: React.FC = () => {
  return (
    <ErrorInSource
      title="Icons with sources, which contain wrong ViewBox attributes"
      statsKey="sourcesWrongViewBox"
    />
  );
};

export const WrongAmountOfSourcesIcons: React.FC = () => {
  const hasErrors = report.icons.some(icon => !icon.stats.hasRightAmountOfSources);
  const header = getHeader({
    title: 'Icons with a wrong amount of sources',
    hasErrors,
  });

  return (
    <div>
      {hasErrors ? (
        <details>
          <summary>{header}</summary>
          <Search
            filter={(icon: MinimalIcon) => !icon.stats.hasRightAmountOfSources}
            mapper={mapper.bind(this)}
          ></Search>
        </details>
      ) : (
        header
      )}
    </div>
  );
};

export const NoKeywords: React.FC = () => {
  const hasErrors = report.icons.some(icon => !icon.stats.hasKeywords);
  const header = getHeader({
    title: 'Icons with no keywords',
    hasErrors,
  });

  return (
    <div>
      {hasErrors ? (
        <details>
          <summary>{header}</summary>
          <Search
            filter={(icon: MinimalIcon) => !icon.stats.hasKeywords}
            mapper={mapper.bind(this)}
          ></Search>
        </details>
      ) : (
        header
      )}
    </div>
  );
};

export const DublicateIcons: React.FC = () => {
  const sources = report.icons
    .map((icon: MinimalIcon) =>
      icon.stats.sources.map((souceIcon: MinimalSourceIcon) => souceIcon.name),
    )
    .flat();
  const unique = new Set();
  const duplicates: string[] = [];

  sources.forEach((source: string) => {
    if (unique.has(source)) {
      duplicates.push(source);
    } else {
      unique.add(source);
    }
  });

  const hasErrors = duplicates.length > 0;
  const header = getHeader({
    title: 'Duplicate source icons',
    hasErrors,
  });

  return (
    <div>
      {hasErrors ? (
        <details>
          <summary>{header}</summary>
          {duplicates.map((duplicate: string, i: number) => (
            <code key={i}>{duplicate}</code>
          ))}
        </details>
      ) : (
        header
      )}
    </div>
  );
};
