import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { state } from '../../data/store';
import { CoveoCompletion } from '../../models/coveo.model';
import { GeocodeLocation } from '../../models/geocode.model';
import { TagManagerDataLayer } from '../../models/general.model';
import {
  DropdownEvent,
  HasDropdown,
  ISearchRecommendation,
  IsFocusable,
} from '../../models/header.model';
import { equalizeArrays, getSearchRedirectUrl } from '../../services/search/search.service';
import { getCoveoSuggestions } from '../../services/search/coveo.service';
import {
  getPlacesUrl,
  highlightPlacesString,
  queryPlaces,
} from '../../services/search/places.service';
import { elementHasTransition, userPrefersReducedMotion } from '../../services/ui.service';
import { HighlightedText } from '../../utils/highlighted.component';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';
import { TrackAndTraceInfo } from '../../models/track-and-trace.model';
import { getParcelSuggestion } from '../../services/search/parcel.service';
import { If } from '../../utils/if.component';
import { translate } from '../../services/language.service';

@Component({
  tag: 'post-search',
  styleUrl: 'post-search.scss',
  shadow: true,
})
export class PostSearch implements HasDropdown, IsFocusable {
  @State() searchDropdownOpen = false;
  @State() coveoSuggestions: CoveoCompletion[] = [];
  @State() placeSuggestions: GeocodeLocation[] = [];
  @State() parcelSuggestion: (TrackAndTraceInfo & { url: string }) | null = null;
  /**
   * Fires when the dropdown has been toggled.
   */
  @Event() dropdownToggled: EventEmitter<DropdownEvent>;
  @Element() host: HTMLPostSearchElement;
  private searchBox?: HTMLInputElement;
  private searchFlyout: HTMLElement | undefined;
  private throttledResize: throttle<() => void>;
  private clearButton?: HTMLButtonElement;

  connectedCallback() {
    this.throttledResize = throttle(300, () => this.handleResize());
    window.addEventListener('resize', this.throttledResize, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.throttledResize);
    clearAllBodyScrollLocks();
  }

  componentWillUpdate() {
    // Check if search flyout got set to close
    if (this.searchFlyout && !this.searchDropdownOpen) {
      this.searchFlyout.classList.remove('open');

      // Check if element has transition applied and whether user prefers to see animations or not
      if (elementHasTransition(this.searchFlyout, 'transform') && !userPrefersReducedMotion()) {
        // Wait for CSS transition 'transform' to end before continuing
        return new Promise<boolean>(resolve => {
          if (this.searchFlyout === undefined) {
            return resolve(true);
          }

          this.searchFlyout.addEventListener('transitionend', event => {
            if (event.propertyName === 'transform') {
              resolve(true);
            }
          });
        });
      }
    }
  }

  componentDidUpdate() {
    // Search flyout got set to open
    if (this.searchFlyout && this.searchDropdownOpen) {
      // Force browser to redraw/refresh DOM before adding 'open' class
      this.searchFlyout.getBoundingClientRect();
      this.searchFlyout.classList.add('open');
    }

    // Focus on the searchBox whenever the dropdown is opened
    if (this.searchDropdownOpen && this.searchBox) {
      this.searchBox.focus({ preventScroll: true });
    }
  }

  /**
   * Toggle the dropdown and optionally force an open/closed state
   * @param force Boolean to force open/closed state
   * @returns Boolean indicating open state of the component
   */
  @Method()
  async toggleDropdown(force?: boolean | Event): Promise<boolean> {
    this.searchDropdownOpen =
      force === undefined || typeof force !== 'boolean' ? !this.searchDropdownOpen : force;
    this.dropdownToggled.emit({ open: this.searchDropdownOpen, element: this.host });

    if (!this.searchDropdownOpen) {
      // Reset suggestions when dropdown closes
      this.coveoSuggestions = [];
      this.placeSuggestions = [];
      if (this.searchBox) this.searchBox.value = '';
      void this.setFocus();
    } else {
      // Get basic suggestions when dropdown opens
      try {
        this.coveoSuggestions = await getCoveoSuggestions('');
      } catch {
        // Intentionally ignored
      }
    }

    this.setBodyScroll();

    return this.searchDropdownOpen;
  }

  /**
   * Sets the focus on the search button
   */
  @Method()
  public async setFocus() {
    const shadowRoot = this.host.shadowRoot;
    if (shadowRoot === null) {
      return;
    }
    const toggleButton = shadowRoot.querySelector<HTMLElement>('.search-button');
    if (toggleButton) {
      toggleButton.focus();
    }
  }

  private handleResize() {
    // Only enable/disable body scroll on resize if the search dropdown is open, otherwise this could lead to side effects in other controls
    if (this.searchDropdownOpen) {
      this.setBodyScroll();
    }
  }

  /**
   * Disable or re-enable body scrolling, depending on whether search dropdown is open or closed in mobile view (width < 1024px)
   */
  private setBodyScroll() {
    if (!this.searchFlyout) {
      return;
    }

    if (this.searchDropdownOpen && window.innerWidth < 1024) {
      disableBodyScroll(this.searchFlyout);
    } else {
      enableBodyScroll(this.searchFlyout);
    }
  }

  /**
   * Fetch suggestions from all available sources
   */
  private async handleSearchInput() {
    if (this.searchBox === undefined || state.localizedConfig?.header.search === undefined) {
      return;
    }
    const query = this.searchBox.value.trim();

    // shows or hides clearButton depending on the content of the searchbar
    if (this.clearButton) {
      if (query !== '') {
        this.clearButton.style.visibility = 'visible';
      } else {
        this.clearButton.style.visibility = 'hidden';
      }
    }

    const [placeSuggestions, coveoSuggestions, trackAndTraceInfo] = await Promise.all([
      queryPlaces(query),
      getCoveoSuggestions(query),
      getParcelSuggestion(query, state.localizedConfig.header.search),
    ]);

    this.parcelSuggestion = trackAndTraceInfo;

    // Parcel suggestion is more important than any other
    if (trackAndTraceInfo) {
      this.placeSuggestions = [];
      this.coveoSuggestions = [];
    } else {
      [this.coveoSuggestions, this.placeSuggestions] = equalizeArrays(
        coveoSuggestions,
        placeSuggestions,
        7,
      );
    }

    this.deselectSuggestion();
  }

  /**
   * clear Search box
   * calls handleSearchInput to update/remove suggestions
   */
  private handleClearSearchBox() {
    if (this.searchBox !== undefined) {
      this.searchBox.value = '';
      this.handleSearchInput();
    }
  }

  /**
   * Start search on enter
   * @param event
   */
  private handleKeyDown(event: KeyboardEvent) {
    if (this.searchFlyout === undefined) {
      return;
    }

    const selectedSuggestion = this.searchFlyout.querySelector<HTMLElement>(
      '.suggestions > li > a.selected',
    );
    const selectedHref = selectedSuggestion?.getAttribute('href') ?? null;
    const suggestions = this.searchFlyout.querySelectorAll('.suggestions > li > a');

    switch (event.key.toLowerCase()) {
      case 'enter':
        if (selectedHref !== null) {
          window.location.href = selectedHref;
        } else {
          void this.startSearch();
        }

        break;
      case 'arrowdown':
        this.deselectSuggestion();

        if (selectedSuggestion?.parentElement?.nextElementSibling?.firstElementChild) {
          // Select next suggestion if there's any, otherwise none will be selected
          selectedSuggestion.parentElement.nextElementSibling.firstElementChild.classList.add(
            'selected',
          );
          // If there are any suggestions, select first suggestion in list
        } else if (suggestions.length > 0) {
          suggestions[0].classList.add('selected');
        }

        this.updateSearchBoxWithSuggestion();

        break;
      case 'arrowup':
        this.deselectSuggestion();

        if (selectedSuggestion?.parentElement?.previousElementSibling?.firstElementChild) {
          // Select previous suggestion if there's any, otherwise none will be selected

          selectedSuggestion.parentElement.previousElementSibling.firstElementChild.classList.add(
            'selected',
          );
          // If there are any suggestions, select last suggestion in list
        } else if (suggestions.length > 0) {
          suggestions[suggestions.length - 1].classList.add('selected');
        }

        this.updateSearchBoxWithSuggestion();

        break;
    }
  }

  /**
   * Set selected suggestion on mouse enter
   * @param event
   */
  private handleMouseEnterSuggestion(event: MouseEvent) {
    this.deselectSuggestion();

    // Set hovered suggestion element as selected
    (event.target as HTMLElement).classList.add('selected');
  }

  /**
   * Set selected suggestion on mouse enter
   * @param event
   */
  private handleMouseLeaveSuggestions() {
    this.deselectSuggestion();
  }

  /**
   * Deselect any previously selected suggestion
   */
  private deselectSuggestion() {
    if (this.searchFlyout === undefined) return;

    const selectedSuggestion = this.searchFlyout.querySelector('.suggestions .selected');

    if (selectedSuggestion) {
      selectedSuggestion.classList.remove('selected');
    }
  }

  /**
   * Update search box with selected suggestion
   */
  private updateSearchBoxWithSuggestion() {
    if (this.searchFlyout === undefined) return;

    // Get the newly selected suggestion
    const selectedSuggestion = this.searchFlyout.querySelector<HTMLElement>(
      '.suggestions > li > a.selected',
    );
    const suggestedText = selectedSuggestion?.dataset.suggestionText;

    // Update search box value with selected suggestion text
    if (suggestedText !== undefined && this.searchBox) {
      this.searchBox.value = suggestedText;
    }
  }

  /**
   * Redirect to the post search page
   */
  private async startSearch() {
    if (this.searchBox && state.localizedConfig?.header.search) {
      const redirectUrl = await getSearchRedirectUrl(
        this.searchBox.value.trim(),
        state.localizedConfig.header.search,
      );
      if (redirectUrl === undefined) return;
      window.location.href = redirectUrl;
    }
  }

  private trackRecommendationClick(recommendation: ISearchRecommendation) {
    if (!('dataLayer' in window)) return;

    const trackingAttributes = recommendation.additionalAttributes.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});

    (window.dataLayer as TagManagerDataLayer).push({
      event: trackingAttributes['data-event'],
      text: trackingAttributes['data-text'],
      link_url: trackingAttributes['data-linkurl'],
      label: trackingAttributes['data-label'],
      type: trackingAttributes['data-type'],
    });
  }

  render() {
    if (state.localizedConfig?.header === undefined) {
      return;
    }
    const { translations, search } = state.localizedConfig.header;
    const isParcelTrackingNr = this.parcelSuggestion && 'sending' in this.parcelSuggestion;
    const isSearchEmpty = this.searchBox?.value === '';

    const portalRecommendationCount = search.searchRecommendations?.links.length;
    const showPortalRecommendations = isSearchEmpty && portalRecommendationCount > 0;

    const suggestionCount = showPortalRecommendations
      ? portalRecommendationCount
      : this.coveoSuggestions.length + this.placeSuggestions.length;
    const suggestionHint = ` ${suggestionCount} ${translate(
      'most searched topics available, press the tab key to continue.',
    )}`;

    return (
      <Host role="search">
        <SvgSprite />
        <focus-trap active={this.searchDropdownOpen}>
          <div class="search" key="search">
            <button
              id="post-internet-header-search-button"
              class="search-button"
              key="search-button"
              type="button"
              aria-expanded={`${this.searchDropdownOpen}`}
              onClick={e => void this.toggleDropdown(e)}
            >
              <span class="visually-hidden">
                {this.searchDropdownOpen
                  ? translations.searchToggleExpanded
                  : translations.searchToggle}
              </span>
              <SvgIcon name={this.searchDropdownOpen ? 'pi-close' : 'pi-search'} />
            </button>
            <If condition={this.searchDropdownOpen}>
              <div class="flyout" key="flyout" ref={e => (this.searchFlyout = e)}>
                <div class="container box">
                  <div class="row">
                    <div class="col-xs-12 col-md-10 col-lg-8">
                      <div class="form-group form-floating">
                        <input
                          type="text"
                          role="searchbox"
                          id="searchBox"
                          class="form-control form-control-lg"
                          placeholder={translations.flyoutSearchBoxFloatingLabel}
                          autocomplete="off"
                          ref={el => (this.searchBox = el)}
                          onInput={() => void this.handleSearchInput()}
                          onKeyDown={e => this.handleKeyDown(e)}
                          title={
                            translate('Enter search term. Press "Enter" to search.') +
                            (isSearchEmpty && suggestionCount > 0 ? ` ${suggestionHint}` : '')
                          }
                        />
                        <label htmlFor="searchBox">
                          {translations.flyoutSearchBoxFloatingLabel}
                        </label>
                        <button
                          onClick={() => this.handleClearSearchBox()}
                          class="clear-search-button"
                          type="reset"
                          id="clearButton"
                          ref={el => (this.clearButton = el)}
                        >
                          <span class="visually-hidden">{translate('Delete search term')}</span>
                          <SvgIcon name="pi-close" />
                        </button>
                        <button onClick={() => void this.startSearch()} class="start-search-button">
                          <span class="visually-hidden">{translations.searchSubmit}</span>
                          <SvgIcon name="pi-search" />
                        </button>
                      </div>
                      <p class="visually-hidden" role="region" aria-live="polite">
                        {isParcelTrackingNr ? 1 : suggestionCount} {translate('search result(s)')}
                      </p>
                      {showPortalRecommendations && (
                        <h2 id="post-internet-header-search-recommendations-title" class="bold">
                          {search.searchRecommendations.title}
                        </h2>
                      )}
                      <ul
                        class="suggestions no-list"
                        onMouseLeave={() => this.handleMouseLeaveSuggestions()}
                        aria-labelledby={
                          showPortalRecommendations
                            ? 'post-internet-header-search-recommendations-title'
                            : undefined
                        }
                      >
                        {showPortalRecommendations &&
                          search.searchRecommendations.links.map(recommendation => (
                            <li key={recommendation.href}>
                              <a
                                class="nav-link search-recommendation"
                                href={new URL(recommendation.href, 'https://post.ch').href}
                                data-suggestion-text={recommendation.label}
                                onMouseEnter={e => this.handleMouseEnterSuggestion(e)}
                                onClick={() => this.trackRecommendationClick(recommendation)}
                              >
                                <span
                                  class="search-recommendation__icon"
                                  innerHTML={recommendation.inlineSvg}
                                ></span>
                                <span>{recommendation.label}</span>
                              </a>
                            </li>
                          ))}
                        {isParcelTrackingNr && (
                          <li>
                            <a
                              class="nav-link parcel-suggestion"
                              href={this.parcelSuggestion!.url}
                              data-suggestion-text={this.searchBox?.value}
                              onMouseEnter={e => this.handleMouseEnterSuggestion(e)}
                            >
                              <SvgIcon name="pi-letter-parcel" />
                              <span class="bold">{this.parcelSuggestion?.sending?.id}:&nbsp;</span>
                              <span>
                                {[
                                  this.parcelSuggestion?.sending?.product,
                                  ' ' + this.parcelSuggestion?.sending?.recipient.zipcode,
                                  ' ' + this.parcelSuggestion?.sending?.recipient.city,
                                  ', ' + this.parcelSuggestion?.sending?.state,
                                ]
                                  .filter(s => s !== '' && s !== ' ')
                                  .join('')}
                              </span>
                            </a>
                          </li>
                        )}
                        {!showPortalRecommendations &&
                          this.coveoSuggestions &&
                          this.coveoSuggestions.map(suggestion => (
                            <li key={suggestion.objectId}>
                              <a
                                class="nav-link"
                                href={suggestion.redirectUrl}
                                data-suggestion-text={suggestion.expression}
                                onMouseEnter={e => this.handleMouseEnterSuggestion(e)}
                              >
                                <SvgIcon name="pi-search" />
                                <HighlightedText text={suggestion.highlighted} />
                              </a>
                            </li>
                          ))}
                        {!showPortalRecommendations &&
                          this.placeSuggestions &&
                          this.placeSuggestions.map(suggestion => (
                            <li key={suggestion.id}>
                              <a
                                class="nav-link"
                                href={getPlacesUrl(suggestion)}
                                data-suggestion-text={suggestion.name}
                                onMouseEnter={e => this.handleMouseEnterSuggestion(e)}
                              >
                                <SvgIcon name="pi-place" />
                                <HighlightedText
                                  text={highlightPlacesString(
                                    this.searchBox?.value?.trim(),
                                    suggestion.name,
                                  )}
                                />
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </If>
          </div>
        </focus-trap>
      </Host>
    );
  }
}
