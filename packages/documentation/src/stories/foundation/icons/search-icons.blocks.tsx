import report from '@swisspost/design-system-icons/public/report.json';
import React from 'react';
import './search-icons.styles.scss';

const ICONS = report.icons.map(icon =>
  Object.assign({}, icon, {
    searchKeywords: [icon.file.basename, ...icon.meta.keywords]
      .map(kWord => kWord.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      .join(' || ')
      .toLowerCase(),
  }),
);

export class Search extends React.Component {
  state = {
    freetext: '',
    icons: ICONS,
  };

  freetextRef: React.RefObject<HTMLInputElement> = React.createRef();

  searchFreetext(e: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = e.target.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    this.setState({
      freetext: e.target.value,
      icons: ICONS.filter(icon => icon.searchKeywords.includes(searchQuery)),
    });
  }

  resetFreetext() {
    this.setState({
      freetext: '',
      icons: ICONS,
    });
    this.freetextRef.current?.focus();
  }

  render() {
    return (
      <div className="icon-search">
        <div className="icon-search--filters">
          <div className="form-floating freetext">
            <input
              id="IconSearchFilter_Freetext"
              type="text"
              className="form-control"
              placeholder=""
              value={this.state.freetext}
              onChange={this.searchFreetext.bind(this)}
              ref={this.freetextRef}
            />
            <label htmlFor="IconSearchFilter_Freetext">Search for icons by name or id</label>
            {this.state.freetext ? (
              <button className="form-control-reset" onClick={this.resetFreetext.bind(this)}>
                <post-icon name="2043" />
                <span className="visually-hidden">Reset Search</span>
              </button>
            ) : null}
            <p className="form-hint" id="form-hint-example">
              {`Showing ${this.state.icons.length} of ${report.icons.length} icons.`}
            </p>
          </div>
        </div>

        <div className="icon-search--results" lang="de">
          {this.state.icons.map(icon => (
            <div key={icon.id} className="icon">
              <div className="icon--tile">
                <post-icon name={icon.file.basename} />
              </div>
              <div className="icon--info">
                <div className="info--name">{icon.file.basename}</div>
                <div className="info--keywords">
                  {icon.meta.keywords[0]}
                  <span className="visually-hidden">{icon.meta.keywords.join(' || ')}</span>
                </div>
              </div>
            </div>
          ))}
          {this.state.icons.length === 0 ? (
            <div className="results--empty">
              <post-icon name="2126" class="fs-huge" />
              We could not find any icons.
              <br />
              Please try with another search query.
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
