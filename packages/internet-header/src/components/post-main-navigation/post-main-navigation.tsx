import { Component, Host, h, State, Method, Event, Element, EventEmitter } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { state } from '../../data/store';
import {
  DropdownElement,
  DropdownEvent,
  HasDropdown,
  IsFocusable,
  NavMainEntity,
} from '../../models/header.model';
import { userPrefersReducedMotion } from '../../services/ui.service';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';
import { LevelOneAction } from './components/level-one-action.component';

@Component({
  tag: 'post-main-navigation',
  styleUrl: 'post-main-navigation.scss',
  shadow: true,
})
export class PostMainNavigation implements HasDropdown, IsFocusable {
  @State() activeFlyout: string | null;
  @State() mobileMenuOpen: boolean;
  @Event() dropdownToggled: EventEmitter<DropdownEvent>;
  @Event() flyoutToggled: EventEmitter<string | null>;
  @Element() host: DropdownElement;
  private throttledResize: throttle<() => void>;
  private resizeTimer: number | null = null;
  private mouseLeaveTimer: number | null = null;
  private mouseEnterTimer: number | null = null;

  connectedCallback() {
    this.throttledResize = throttle(300, () => this.handleResize());
    window.addEventListener('resize', this.throttledResize, { passive: true });
    this.setWindowHeight();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.throttledResize);
    if (this.mouseEnterTimer !== null) window.clearTimeout(this.mouseEnterTimer);
    if (this.mouseLeaveTimer !== null) window.clearTimeout(this.mouseLeaveTimer);
  }

  handleResize() {
    // Suspend all animations and transitions on window resize
    this.host.classList.add('no-animation');
    if (this.resizeTimer !== null) window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      this.host.classList.remove('no-animation');
    }, 300);

    this.setWindowHeight();
  }

  // Update window height var
  setWindowHeight() {
    if (!this.host) {
      return;
    }
    this.host.style.setProperty('--window-height', `${window.innerHeight}px`);

    // Safari might or might not show a blank bar at the bottom where the browser
    // controls should be. This timeout waits for this bar to appear before resetting the available height
    window.setTimeout(() => {
      this.host.style.setProperty('--window-height', `${window.innerHeight}px`);
    }, 100);
  }

  openFlyout(id: string) {
    const flyout = this.host.shadowRoot?.getElementById(id);

    if (flyout && this.activeFlyout !== '') {
      // Add flyout animation if there's no flyout open
      this.addFlyoutAnimation(flyout);
    }

    this.activeFlyout = id;
    this.flyoutToggled.emit(id);
    this.setWindowHeight();

    if (this.mouseLeaveTimer !== null) {
      window.clearTimeout(this.mouseLeaveTimer);
      this.mouseLeaveTimer = null;
    }
  }

  closeFlyout(id?: string) {
    if (id === undefined) return;
    const flyout = this.host.shadowRoot?.getElementById(id);

    if (flyout) {
      // Add flyout animation for close action
      this.addFlyoutAnimation(flyout);
    }

    this.activeFlyout = null;
    this.flyoutToggled.emit();
  }

  addFlyoutAnimation(flyout: HTMLElement) {
    // Check if user prefers to see animations or not
    if (!userPrefersReducedMotion()) {
      flyout.classList.add('animate');

      // Remove flyout animation after transition ended
      flyout.addEventListener('transitionend', () => this.removeFlyoutAnimation(flyout), {
        once: true,
      });
    }
  }

  removeFlyoutAnimation(flyout: HTMLElement) {
    flyout.classList.remove('animate');
  }

  isActiveFlyout(id?: string) {
    return id === this.activeFlyout;
  }

  handleMouseEnter(level: NavMainEntity) {
    // Cancel opening the flyout if there already is one scheduled to open
    if (this.mouseEnterTimer !== null) {
      window.clearTimeout(this.mouseEnterTimer);
      this.mouseEnterTimer = null;
    }

    // Cancel closing if we enter again
    if (this.mouseLeaveTimer && this.activeFlyout === level.id) {
      window.clearTimeout(this.mouseLeaveTimer);
      this.mouseLeaveTimer = null;
    }

    if (window.innerWidth >= 1024 && level.flyout.length > 0 && this.activeFlyout !== level.id) {
      // Delay opening the flyout for a moment to give users a chance to move the mouse over the navigation without triggering the flyout
      this.mouseEnterTimer = window.setTimeout(() => {
        this.mouseEnterTimer = null;
        if (level.id !== undefined) this.openFlyout(level.id);
      }, 200);
    }
  }

  handleMouseLeave(level: NavMainEntity) {
    // Cancel opening the flyout if a mouseleave event happens before the flyout opened
    if (this.mouseEnterTimer !== null) {
      window.clearTimeout(this.mouseEnterTimer);
    }

    // Don't close an open flyout if the mouseleave is from another mainnav entry
    if (this.activeFlyout && this.activeFlyout !== level.id) {
      return;
    }

    if (window.innerWidth >= 1024 && level.flyout.length > 0) {
      // Allow the pointer to shortly leave the flyout without closing it. This
      // allows for user mistakes and makes the experience less nervous
      this.mouseLeaveTimer = window.setTimeout(() => {
        this.closeFlyout(level.id);
      }, 300);
    }
  }

  handleTouchEnd(event: TouchEvent, level: NavMainEntity) {
    if (!this.isActiveFlyout(level.id) && !level.noFlyout) {
      // It's the first touchstart and has a flyout, prevent link activation and open the flyout
      if (event.cancelable) event.preventDefault();
      if (level.id) this.openFlyout(level.id);
    }
  }

  handleKeyPress(event: KeyboardEvent, level: NavMainEntity) {
    if (event.key === 'Enter' && !this.isActiveFlyout(level.id) && !level.noFlyout) {
      // It's the first enter keypress and has a flyout, prevent link activation and open the flyout
      event.preventDefault();
      if (level.id) this.openFlyout(level.id);
    }
  }

  handleClick(event: MouseEvent, level: NavMainEntity) {
    if (!this.isActiveFlyout(level.id) && !level.noFlyout) {
      // It's the first click, always open the flyout, never the link
      // This is relevant for desktop with active screenreader which
      // translates an enter keypress to a click
      event.preventDefault();
      if (level.id) this.openFlyout(level.id);
    }
  }

  /**
   * Toggle the main navigation (only visible on mobile)
   * @param force Force a state
   * @returns Boolean indicating new state
   */
  @Method()
  async toggleDropdown(force?: boolean) {
    this.mobileMenuOpen = force === undefined ? !this.mobileMenuOpen : force;
    this.dropdownToggled.emit({ open: this.mobileMenuOpen, element: this.host });

    if (force === false) {
      this.closeFlyout();
    }

    this.setWindowHeight();

    return this.mobileMenuOpen;
  }

  /**
   * Focus the main navigation toggle button
   */
  @Method()
  async setFocus() {
    const firstLink = this.host.shadowRoot?.querySelector<HTMLElement>('.main-link');
    if (firstLink) {
      firstLink.focus();
    }
  }

  /**
   * Open a specific flyout
   * @param id Flyout ID
   */
  @Method()
  async setActiveFlyout(id: string | null) {
    this.activeFlyout = id;
    this.flyoutToggled.emit(this.activeFlyout);
  }

  render() {
    if (state.localizedConfig?.header === undefined) return;
    const headerConfig = state.localizedConfig.header;

    return (
      <Host>
        <SvgSprite />
        <nav
          id="post-internet-header-main-navigation"
          class={{ 'main-navigation': true, 'open': this.mobileMenuOpen }}
          role="menu"
        >
          <h1 class="visually-hidden">{headerConfig.translations.navMainAriaLabel}</h1>
          <ul class="main-container container">
            {headerConfig.navMain.map(levelOne => (
              <li
                key={levelOne.text}
                onMouseLeave={() => this.handleMouseLeave(levelOne)}
                onMouseEnter={() => this.handleMouseEnter(levelOne)}
              >
                <LevelOneAction
                  level={levelOne}
                  isOpen={this.isActiveFlyout(levelOne.id)}
                  onTouchEnd={e => this.handleTouchEnd(e, levelOne)}
                  onKeyDown={e => this.handleKeyPress(e, levelOne)}
                  onClick={e => this.handleClick(e, levelOne)}
                />
                {!levelOne.noFlyout ? (
                  <div
                    id={levelOne.id}
                    class={{ flyout: true, open: this.isActiveFlyout(levelOne.id) }}
                  >
                    <div class="wide-container">
                      <div class="flyout-nav">
                        <button
                          class="nav-link flyout-back-button"
                          onClick={() => this.closeFlyout(levelOne.id)}
                        >
                          <SvgIcon name="pi-pointy-arrow-right" classNames="mirrored" />
                          <span>{headerConfig.translations.backButtonText}</span>
                        </button>
                        <button
                          class="flyout-close-button"
                          onClick={() => this.closeFlyout(levelOne.id)}
                        >
                          <span class="visually-hidden">
                            {levelOne.text}, {headerConfig.translations.mobileNavToggleClose}
                          </span>
                          <SvgIcon name="pi-close" />
                        </button>
                      </div>
                      <h2 class="flyout-title container">
                        <a href={levelOne.url} class="nav-link">
                          {levelOne.text}
                        </a>
                      </h2>
                      <div class="flyout-row container">
                        {levelOne.flyout.map((flyout, i) => (
                          <div key={flyout.title} class="flyout-column">
                            {flyout.title ? <h3 id={`${levelOne.id}-column-${i}`}>{flyout.title}</h3> : null}
                            <ul
                              class="flyout-linklist"
                              aria-labelledby={flyout.title ? `${levelOne.id}-column-${i}` : undefined}
                            >
                              {flyout.linkList.map(link => (
                                <li key={link.url}>
                                  <a
                                    class={{
                                      'flyout-link': true,
                                      'active': !!link?.isActiveOverride,
                                    }}
                                    href={link.url}
                                    target={link.target}
                                  >
                                    {link.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
          <slot></slot>
        </nav>
      </Host>
    );
  }
}
