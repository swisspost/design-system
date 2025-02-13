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
  mapper: (icon: MinimalIcon, index?: number) => JSX.Element | JSX.Element[];
}

type StatsKey = 'errored' | 'noSVG' | 'wrongViewBox' | 'duplicates';

interface ErrorInSourceProps {
  title: string;
  statsKey: StatsKey;
}

function getHeader({
  title,
  errors,
}: {
  title: string;
  errors: number;
}): JSX.Element | JSX.Element[] {
  return (
    <span>
      <span>
        {title} <span className="error-count">({errors})</span>
      </span>
      <span className="float-end">
        {errors > 0 ? (
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
  mapper: (icon: MinimalIcon) => JSX.Element | JSX.Element[];

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

    return `${icon.name}, ${icon.keys.join(', ')}, ${icon.stats.sources
      .map((sourceIcon: MinimalSourceIcon) => sourceIcon.name)
      .join(', ')}`.includes(this.form.query);
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
                  "name" or "keyword"
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
            .map((icon: MinimalIcon, i: number) => (
              <div key={`${icon.id}-${i}`}>{this.mapper(icon)}</div>
            ))}
        </div>
      </div>
    );
  }
}

class ErrorInSource extends React.Component<ErrorInSourceProps> {
  errors: number;
  title: string;
  statsKey: StatsKey;
  getHeader: (props: { title: string; errors: number }) => JSX.Element | JSX.Element[];
  header: JSX.Element | JSX.Element[];

  constructor(props: ErrorInSourceProps) {
    super(props);
    this.filter = this.filter.bind(this);
    this.mapper = this.mapper.bind(this);

    this.title = props.title;
    this.statsKey = props.statsKey;
    this.errors = report.icons.filter(this.filter).length;
    this.getHeader = getHeader.bind(this);
    this.header = this.getHeader({ title: this.title, errors: this.errors });
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
        {this.errors > 0 ? (
          <details>
            <summary>{this.header}</summary>
            <Search filter={this.filter} mapper={this.mapper}></Search>
          </details>
        ) : (
          this.header
        )}
      </div>
    );
  }
}

export const StatusBlock: React.FC = () => {
  const errors = report.icons.length - report.stats.success;
  const header = getHeader({ title: 'Overall status', errors });
  const statusBannerClass = errors === 0 ? 'status-success' : 'status-danger';

  return (
    <div className="status">
      <p>
        <strong>Version:</strong> {report.version}
        <br />
        <strong>Last updated:</strong> {new Date(report.created).toString()}
      </p>

      <p className={`overall-status ${statusBannerClass} my-16`}>{header}</p>

      <hr className="my-32" />

      <p className="banner banner-info banner-md my-16">
        The amount of source files can be higher than the amount of output files, because one output
        file can contain multiple source files.
      </p>

      <div className="row gy-16 mb-16">
        <div className="col-12 col-md-6">
          <div className="status-container">
            <h2 className="status-title">Source Files</h2>
            <div className="status-count">{report.stats.sources}</div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="status-container">
            <h2 className="status-title">Output files</h2>
            <div className="status-count">{report.icons.length}</div>
          </div>
        </div>
      </div>

      <div className="row gy-16">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="status-container">
            <h2 className="status-title">Download errors</h2>
            <div className="status-count">
              <span className={report.stats.errored > 0 ? 'status-danger' : 'status-success'}>
                {report.stats.errored}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="status-container">
            <h2 className="status-title">Invalid SVG content</h2>
            <div className="status-count">
              <span className={report.stats.noSVG > 0 ? 'status-danger' : 'status-success'}>
                {report.stats.noSVG}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="status-container">
            <h2 className="status-title">Wrong ViewBox</h2>
            <div className="status-count">
              <span className={report.stats.wrongViewBox > 0 ? 'status-danger' : 'status-success'}>
                {report.stats.wrongViewBox}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="status-container">
            <h2 className="status-title">Duplicates</h2>
            <div className="status-count">
              <span className={report.stats.duplicates > 0 ? 'status-danger' : 'status-success'}>
                {report.stats.duplicates}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="status-container">
            <h2 className="status-title">Wrong amount of sources</h2>
            <div className="status-count">
              <span className={report.stats.hasAllSources > 0 ? 'status-danger' : 'status-success'}>
                {report.stats.hasAllSources}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="status-container">
            <h2 className="status-title">No Keywords</h2>
            <div className="status-count">
              <span className={report.stats.noKeywords > 0 ? 'status-danger' : 'status-success'}>
                {report.stats.noKeywords}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SourceFiles: React.FC = () => (
  <details>
    <summary>Downloaded source files</summary>
    <Search mapper={mapper.bind(this)}></Search>
  </details>
);

export const ErroredIcons: React.FC = () => {
  return (
    <ErrorInSource title="Icons with sources, which errored while downloading" statsKey="errored" />
  );
};

export const NoSVGIcons: React.FC = () => {
  return (
    <ErrorInSource title="Icons with sources, which contain invalid SVG markup" statsKey="noSVG" />
  );
};

export const WrongViewBoxIcons: React.FC = () => {
  return (
    <ErrorInSource
      title="Icons with sources, which contain wrong ViewBox attributes"
      statsKey="wrongViewBox"
    />
  );
};

export const DuplicateIcons: React.FC = () => {
  return (
    <ErrorInSource
      title="Icons with sources, which have been downloaded multiple times"
      statsKey="duplicates"
    />
  );
};

export const WrongAmountOfSourcesIcons: React.FC = () => {
  const errors = report.icons.filter(icon => !icon.stats.hasAllSources).length;
  const header = getHeader({
    title: 'Output icons with a wrong amount of sources',
    errors,
  });

  return (
    <div>
      {errors ? (
        <details>
          <summary>{header}</summary>
          <Search
            filter={(icon: MinimalIcon) => !icon.stats.hasAllSources}
            mapper={(icon: MinimalIcon) => {
              return (
                <details>
                  <summary>
                    <code>{icon.name}</code>
                  </summary>
                  <ul>
                    {icon.stats.sources.map((sourceIcon: MinimalSourceIcon) => (
                      <li key={sourceIcon.id}>
                        <code>{sourceIcon.name}</code>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            }}
          ></Search>
        </details>
      ) : (
        header
      )}
    </div>
  );
};

export const NoKeywords: React.FC = () => {
  const errors = report.icons.filter(icon => !icon.stats.hasKeywords).length;
  const header = getHeader({
    title: 'Output icons without keywords',
    errors,
  });

  return (
    <div>
      {errors ? (
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

const KeywordsInspectorDetail: React.FC<{ icon: MinimalIcon }> = ({ icon }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <details
      open={isOpen}
      onToggle={(event: React.SyntheticEvent<HTMLDetailsElement>) =>
        setIsOpen((event.target as HTMLDetailsElement).open)
      }
    >
      <summary>{icon.name}</summary>
      {isOpen ? (
        <div className="row mt-8">
          <div className="col-auto">
            <div>
              <post-icon class="preview-icon" name={icon.name}></post-icon>
            </div>
            <div>
              <post-icon class="preview-icon size-24" name={icon.name}></post-icon>
            </div>
            <div>
              <post-icon class="preview-icon size-32" name={icon.name}></post-icon>
            </div>
            <div>
              <post-icon class="preview-icon size-40" name={icon.name}></post-icon>
            </div>
            <div>
              <post-icon class="preview-icon size-48" name={icon.name}></post-icon>
            </div>
            <div>
              <post-icon class="preview-icon size-64" name={icon.name}></post-icon>
            </div>
          </div>
          <div className="col">
            <ul>
              {icon.keys.map((key: string, i: number) => (
                <li key={`${key}-${i}`}>
                  <code>{key}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </details>
  );
};

export const KeywordsInspector: React.FC = () => {
  return (
    <details>
      <summary>Keywords inspector</summary>
      <Search
        mapper={(icon: MinimalIcon, i?: number) => (
          <KeywordsInspectorDetail key={`${icon.name}-${i}`} icon={icon} />
        )}
      ></Search>
    </details>
  );
};
