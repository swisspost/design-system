import { Component, Host, h, State, Element } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { state } from '../../data/store';
import { LogoSprite, FaviconSvg } from './logo-sprite.component';

@Component({
  tag: 'post-logo',
  styleUrl: 'post-logo.scss',
  shadow: true,
})
export class PostLogo {
  @State() showFaviconLogo: boolean;
  @Element() host: HTMLPostLogoElement;
  private throttledResize: throttle<() => void>;
  private resizeObserver: ResizeObserver;

  constructor() {
    // Register window resize event listener and a resize observer on the mainnav controls (they change size while controls are being loaded) to display an accurately sized logo
    this.throttledResize = throttle(300, () => this.handleResize());
    window.addEventListener('resize', this.throttledResize, { passive: true });
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));

    // Initially call the resize handler
    this.handleResize();
  }

  componentDidLoad() {
    const mainNavControls = this.host.parentElement?.querySelector('.main-navigation-controls');
    if (mainNavControls) {
      this.resizeObserver.observe(mainNavControls);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.throttledResize);
    this.resizeObserver.disconnect();
  }

  handleResize() {
    const mainNavControls = this.host.parentElement?.querySelector('.main-navigation-controls');
    const menuButton = this.host.parentElement?.querySelector('.menu-button');
    if (mainNavControls && menuButton)
      this.showFaviconLogo =
        window.innerWidth - (150 + mainNavControls.clientWidth + menuButton.clientWidth) <= 0;
  }

  render() {
    if (state.localizedConfig?.header.logo === undefined) return;
    const config = state.localizedConfig.header.logo;

    return (
      <Host>
        <LogoSprite />
        <a href={config.logoLink} class="logo">
          <span class="visually-hidden">{config.logoLinkTitle}</span>
          <FaviconSvg className="square-logo" />
          <img class="logo-svg full-logo" src={config.logoSvg} alt={config.logoText} />
        </a>
      </Host>
    );
  }
}
