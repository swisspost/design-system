import { Component, h, Host, Prop } from '@stencil/core';
import { state } from '../../data/store';

@Component({
  tag: 'post-meta-navigation',
  styleUrl: 'post-meta-navigation.scss',
  shadow: true,
})
export class PostMetaNavigation {
  /**
   * Displays the meta-navigation horihontally or vertically.
   * Allowed values: 'horizontal' | 'vertical'
   */
  @Prop() orientation: 'horizontal' | 'vertical';
  /**
   * Displays the meta-navigation in full-width.
   */
  @Prop() fullWidth?: boolean = false;

  render() {
    if (state.localizedConfig?.header.navMeta === undefined) return;
    const headerConfig = state.localizedConfig.header;

    return (
      <Host>
        <div class={`meta-container ${this.orientation}${this.fullWidth ? ' full-width' : ''}`}>
          <nav aria-label={headerConfig.translations.navMetaAriaLabel} class="meta-navigation">
            <ul class="meta-list">
              {headerConfig.navMeta
                ?.filter(meta => !meta.isHomeLink)
                .map(meta => (
                  <li key={meta.url}>
                    <a
                      class={{ 'active': meta.isActive, 'meta-link': true }}
                      target={meta.target}
                      href={meta.url}
                    >
                      {meta.text}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
