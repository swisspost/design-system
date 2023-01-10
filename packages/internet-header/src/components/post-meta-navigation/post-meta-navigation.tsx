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
    const config = state.localizedConfig.header;

    // There's no meta navigation config
    if (!config.navMeta) {
      return null;
    }

    return (
      <Host>
        <div class={`meta-container ${this.orientation}${this.fullWidth ? ' full-width' : ''}`}>
          <nav class="meta-navigation">
            <ul class="meta-list">
              {config.navMeta
                ?.filter(meta => !meta.isHomeLink)
                .map(meta => (
                  <li>
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
