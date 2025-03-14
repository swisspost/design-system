import React from 'react';
import report from '@swisspost/design-system-icons/public/report.min.json';
import { ReportIcon, ReportSourceIcon } from '@swisspost/design-system-icons/src/models/icon.model';
import './search-icons.styles.scss';

interface Icon {
  set: string;
  name: string;
  keywords: string;
  searchKeywords: string[];
  sources: ReportSourceIcon[];
}

interface IconSets {
  post: Icon[];
  uiLight: Icon[];
  uiSolid: Icon[];
}

const ICON_SETS: IconSets = report.icons.reduce(
  (sets: IconSets, icon: ReportIcon) => {
    let typeOfSet = icon.stats.set;
    const basename = icon.name.replace(/.svg$/, '');

    if (typeOfSet === 'ui') {
      if (basename.endsWith('-solid')) {
        typeOfSet += 'Solid';
      } else {
        typeOfSet += 'Light';
      }
    }

    sets[typeOfSet as keyof IconSets].push({
      set: typeOfSet,
      sources: icon.stats.sources,
      name: basename,
      keywords: icon.keys.join(', '),
      searchKeywords: [basename, ...icon.keys].map(word =>
        word
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase(),
      ),
    });
    return sets;
  },
  { post: [], uiLight: [], uiSolid: [] },
);

export const POST_ICONS_COUNT = ICON_SETS.post.length;
export const UI_ICONS_COUNT = ICON_SETS.uiLight.length + ICON_SETS.uiSolid.length;

const PAGE_SIZE = 96;

export class Search extends React.Component {
  form = {
    text: '',
    set: {
      current: 'post',
      options: [
        {
          text: 'Post Icons',
          value: 'post',
        },
        {
          text: 'UI Icons (line)',
          value: 'uiLight',
        },
        {
          text: 'UI Icons (solid)',
          value: 'uiSolid',
        },
      ],
    },
  };

  activeIcon: Icon | null = null;

  results = {
    icons: ICON_SETS.post,
    paging: {
      pageSize: PAGE_SIZE,
      currentPage: 1,
      totalPages: Math.ceil(ICON_SETS.post.length / PAGE_SIZE),
    },
  };

  search(value: string) {
    this.form.text = value;
    this.setState(this.form);

    this.updateResults(
      value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase(),
    );
  }

  updateResults(query?: string) {
    let icons = ICON_SETS[this.form.set.current as keyof IconSets];
    if (query) icons = icons.filter(icon => icon.searchKeywords.find(word => word.includes(query)));

    this.results.icons = icons;
    this.results.paging.currentPage = 1;
    this.results.paging.totalPages = Math.ceil(
      this.results.icons.length / this.results.paging.pageSize,
    );

    this.setState(this.results);
  }

  changeIconSet(setName: string) {
    this.form.set.current = setName;
    this.search('');
  }

  changePage(page: number) {
    this.results.paging.currentPage = page;
    this.setState(this.results);
    this.scrollToResults();
  }

  scrollToResults() {
    const resultsAnchor = document.querySelector('a[href="#results-top"]');

    if (resultsAnchor) {
      const anchorTop = resultsAnchor.getBoundingClientRect().top;

      if (anchorTop < 0) {
        window.scrollTo({
          top: resultsAnchor.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        });
      }
    }
  }

  popoverEventListener() {
    document.body.style.overflow = '';
  }

  openIconDetails(icon: Icon) {
    const popover = document.querySelector('#icon-panel') as HTMLPostPopovercontainerElement;
    popover?.removeEventListener('postToggle', this.popoverEventListener);
    document.body.style.overflow = 'hidden';
    this.activeIcon = icon;
    this.setState(this.activeIcon);
    popover.showPopover();
    popover?.addEventListener('postToggle', this.popoverEventListener);
  }

  iconDetailPanel() {
    const popover = document.querySelector('#icon-panel') as HTMLPostPopovercontainerElement;

    return (
      <post-popovercontainer id="icon-panel" class="palette-default icon-panel">
        <div className="icon-panel-content">
          <div>
            <div className="resizer-container">
              <div className="resizer">
                {this.activeIcon && <post-icon name={this.activeIcon?.name}></post-icon>}
              </div>
            </div>
            <dl>
              <dt>Set</dt>
              <dd className="text-capitalize">{this.activeIcon?.set}</dd>
              <dt>Name</dt>
              <dd>{this.activeIcon?.name}</dd>
              <dt>Download</dt>
              <dd>
                <a href={`/post-icons/${this.activeIcon?.name}.svg`} download>{this.activeIcon?.name}.svg</a>
              </dd>
              <dt>Keywords</dt>
              <dd>{this.activeIcon?.keywords}</dd>
              <dt>Source files</dt>
              <dd>
                {this.activeIcon?.sources.map((source, i) => {
                  return (
                    <span key={source.id}>
                      {source.name}
                      {i + 1 === this.activeIcon?.sources.length ? '' : ', '}
                    </span>
                  );
                })}
              </dd>
            </dl>
          </div>
          <button className="btn btn-close" onClick={() => popover.hidePopover()}>
            <span className="visually-hidden">Close</span>
          </button>
        </div>
      </post-popovercontainer>
    );
  }

  searchForm() {
    return (
      <>
        <div className="sets segmented-button-container">
          <fieldset className="segmented-button">
            <legend>Choose the icon set you want to browse</legend>

            {this.form.set.options.map(option => {
              return (
                <label className="segmented-button-label" key={`set-${option.value}`}>
                  <input
                    type="radio"
                    name="IconSearchSetCurrent"
                    value={option.value}
                    checked={option.value === this.form.set.current}
                    onChange={() => this.changeIconSet(option.value)}
                  />
                  {option.text}
                </label>
              );
            })}
          </fieldset>
        </div>

        <div className="search-text">
          <div className="search-input form-floating">
            <input
              id="IconSearchText"
              className="form-control"
              placeholder="Icon ID or keyword"
              type="search"
              value={this.form.text}
              onChange={e => this.search(e.target.value)}
            />
            <label className="form-label" htmlFor="IconSearchText">
              Search for icons
            </label>

            <button
              className="delete-button"
              aria-label="Clear search"
              onClick={() => this.search('')}
            >
              <post-icon name="closex"></post-icon>
            </button>

            <button className="search-button" aria-label="Search">
              <post-icon name="search"></post-icon>
            </button>
          </div>

          <p className="form-hint">
            Showing {this.results.icons.length} of{' '}
            {ICON_SETS[this.form.set.current as keyof IconSets].length} icons.
          </p>
        </div>
      </>
    );
  }

  resultsList() {
    const pageStartIndex = this.results.paging.pageSize * (this.results.paging.currentPage - 1);
    const pageEndIndex = pageStartIndex + this.results.paging.pageSize;

    if (this.results.paging.totalPages <= 0)
      return (
        <div className="no-results">
          <post-icon name="2126"></post-icon>
          <p>No results found with your current query</p>
        </div>
      );

    return (
      <ul className="result-list">
        {this.results.icons.slice(pageStartIndex, pageEndIndex).map((icon, i) => {
          return (
            <li className="icon" key={`icon-${icon.name}-${i}`}>
              <button onClick={() => this.openIconDetails(icon)}>
                <span className="gfx">
                  <post-icon name={icon.name} />
                </span>
                <span className="name">{icon.name}</span>
                <span className="visually-hidden">{icon.keywords}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  paging() {
    if (this.results.paging.totalPages <= 0) return null;

    return (
      <div className="paging">
        <ul>
          <li>
            <button
              className="btn btn-sm btn-secondary"
              disabled={this.results.paging.currentPage <= 1}
              onClick={() => this.changePage(this.results.paging.currentPage - 1)}
            >
              <post-icon name="chevronleft" aria-hidden="true" />
              <span className="visually-hidden">navigate to previous page</span>
            </button>
          </li>
          {Array.from(Array(this.results.paging.totalPages).keys()).map(page => {
            return (
              <li key={`paging-${page}`}>
                <button
                  className={[
                    'btn',
                    'btn-sm',
                    this.results.paging.currentPage === page + 1 ? 'btn-primary' : 'btn-secondary',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => this.changePage(page + 1)}
                >
                  {page + 1}
                  <span className="visually-hidden">navigate to page number {page + 1}</span>
                </button>
              </li>
            );
          })}
          <li>
            <button
              className="btn btn-sm btn-secondary"
              disabled={this.results.paging.currentPage >= this.results.paging.totalPages}
              onClick={() => this.changePage(this.results.paging.currentPage + 1)}
            >
              <post-icon name="chevronright" aria-hidden="true" />
              <span className="visually-hidden">navigate to next page</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="search-form">{this.searchForm()}</div>
        <div className="search-results">
          <a href="#results-top"></a>
          {this.paging()}
          {this.resultsList()}
          {this.paging()}
          {this.iconDetailPanel()}
        </div>
      </div>
    );
  }
}
