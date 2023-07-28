import { Component, Host, h, Prop } from '@stencil/core';
import { state } from '../../data/store';

@Component({
  tag: 'post-meta-navigation',
  styleUrl: 'post-meta-navigation.scss',
  shadow: true,
})
export class PostMetaNavigation {
  @Prop() orientation: 'horizontal' | 'vertical';
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
                      <span aria-hidden="true">{meta.text}</span>
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
