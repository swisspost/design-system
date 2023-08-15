import { Component, Host, h, Element } from '@stencil/core';
import { state } from '../../data/store';
import { FocusableElement } from '../../models/header.model';
import { translate } from '../../services/language.service';
import { SvgIcon } from '../../utils/svg-icon.component';

@Component({
  tag: 'post-skiplinks',
  styleUrl: 'post-skiplinks.scss',
  shadow: false,
})
export class PostSkiplinks {
  @Element() host: HTMLElement;

  private getMainId() {
    return document.querySelector('main[id]')?.getAttribute('id');
  }

  private setFocus(tagname: string) {
    const rootHost = this.host.closest('.post-internet-header');
    if (!rootHost) {
      return;
    }

    const focusable = rootHost.querySelector<FocusableElement>(tagname);
    if (focusable) {
      focusable.setFocus();
    }
  }

  private focusMain() {
    this.setFocus('post-main-navigation');
  }

  private focusSearch() {
    this.setFocus('post-search');
  }

  private focusLogin() {
    this.setFocus('post-klp-login-widget');
  }

  render() {
    const config = state.localizedConfig?.header;
    const mainId = this.getMainId();

    if (config === undefined) {
      return;
    }

    return (
      <Host>
        <div class="skiplinks">
          <ul class="no-list" aria-label={translate('Skip Links')}>
            <li>
              <a class="nav-link" href={config.logo.logoLink}>
                <span>{config.logo.logoLinkTitle}</span>
                <SvgIcon name="pi-pointy-arrow-right" />
              </a>
            </li>
            <li>
              <a class="nav-link" href="#post-internet-header-main-navigation" onClick={() => this.focusMain()}>
                <span>{config.translations.navMainAriaLabel}</span>
                <SvgIcon name="pi-pointy-arrow-right" />
              </a>
            </li>
            {mainId ? (
              <li>
                <a class="nav-link" href={`#${mainId}`}>
                  <span>{translate('Go to main content')}</span>
                  <SvgIcon name="pi-pointy-arrow-right" />
                </a>
              </li>
            ) : null}
            {state.search ? (
              <li>
                <a class="nav-link" href="#post-internet-header-search-button" onClick={() => this.focusSearch()}>
                  <span>{translate('Go to search')}</span>
                  <SvgIcon name="pi-pointy-arrow-right" />
                </a>
              </li>
            ) : null}
            {state.login ? (
              <li>
                <a class="nav-link" href="#post-klp-login-widget" onClick={() => this.focusLogin()}>
                  <span>{translate('Go to login')}</span>
                  <SvgIcon name="pi-pointy-arrow-right" />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Host>
    );
  }
}
