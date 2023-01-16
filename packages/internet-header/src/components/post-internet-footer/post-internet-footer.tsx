import { Component, Host, h, State } from '@stencil/core';
import { state } from '../../data/store';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { PostFooterBlockCustom } from './components/post-footer-block-custom.component';
import { PostFooterBlockList } from './components/post-footer-block-list.component';
import { PostFooterBlockAddress } from './components/post-footer-block-address.component';
import { PostFooterBlockContact } from './components/post-footer-block-contact.component';

@Component({
  tag: 'swisspost-internet-footer',
  styleUrl: 'post-internet-footer.scss',
  shadow: true,
})
export class PostInternetFooter {
  @State() liveSupportEnabled = false;

  constructor() {
    this.liveSupportEnabled = this.unbluEnabled();

    /**
     * If the unblu script is not available, wait 5 seconds for it to load.
     * If it's still not there after 5 seconds, abandon efforts and don't
     * show the live support button.
     */
    if (!this.liveSupportEnabled) {
      let intervalId: number;
      let runs = 0;

      const checker = () => {
        const isEnabled = this.unbluEnabled();
        if (isEnabled) {
          this.liveSupportEnabled = true;
        }
        if (isEnabled || runs >= 5) {
          window.clearInterval(intervalId);
        }
        runs++;
      };

      intervalId = window.setInterval(checker, 1000);
    }
  }

  /**
   * Check if the unblu live support script is loaded
   * @returns Boolean
   */
  private unbluEnabled(): boolean {
    return typeof window['unbluLSLoad'] === 'function';
  }

  render() {
    // There is something wrong entirely
    if (!state) {
      console.warn(
        `Internet Footer: Could not load config. Please make sure that you included the <swisspost-internet-header></swisspost-internet-header> component.`,
      );
      return null;
    }

    // Config has not loaded yet
    if (!state.localizedConfig) {
      return null;
    }

    // There's no footer config
    if (!state.localizedConfig.footer) {
      console.warn(
        `Internet Footer: Current project "${state.projectId}" does not include a footer config. The footer will not be rendered. Remove `,
        document.querySelector('swisspost-internet-footer'),
        `from your markup or configure the footer in your portal config to stop seeing this warning.`,
      );
      return null;
    }

    const footerConfig = state.localizedConfig.footer;
    const customFooterConfig = state.localizedCustomConfig?.footer;

    return (
      <Host>
        <SvgSprite />
        <footer class="post-internet-footer light font-curve-regular">
          <h2 class="visually-hidden">{footerConfig.title}</h2>
          {customFooterConfig?.block && <PostFooterBlockCustom block={customFooterConfig?.block} />}
          <div class="footer-container container">
            {footerConfig.block
              .filter(block => block.columnType === 'list')
              .map(block => (
                <PostFooterBlockList block={block} />
              ))}
            {footerConfig.block
              .filter(block => block.columnType === 'contact')
              .map(block => (
                <PostFooterBlockContact
                  block={block}
                  liveSupportEnabled={this.liveSupportEnabled}
                />
              ))}
            {footerConfig.block
              .filter(block => block.columnType === 'address')
              .map(block => (
                <PostFooterBlockAddress block={block} />
              ))}
          </div>
          <div class="copyright container">
            <span class="bold">{footerConfig.entry.text}</span>
            <ul class="no-list footer-meta-links">
              {footerConfig.links
                ? footerConfig.links.map(link => (
                    <li>
                      <a class="nav-link" href={link.url} target={link.target}>
                        {link.text}
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </footer>
      </Host>
    );
  }
}
