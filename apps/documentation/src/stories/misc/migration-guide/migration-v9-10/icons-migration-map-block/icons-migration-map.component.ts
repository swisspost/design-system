import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import Styles from './icons-migration-map.component.scss?inline';
import migrationMap from '@/shared/icons-migration-map.json';

@customElement('icons-migration-map')
export class IconsMigrationMap extends LitElement {
  static get styles() {
    return css`
      ${unsafeCSS(Styles)}
    `;
  }

  wrapIcon(tag: 'code' | 'post-icon', iconName: string | number) {
    return html`<div>
      ${tag === 'post-icon'
        ? html`<post-icon name="${iconName}"></post-icon>`
        : html`<code>${iconName}</code>`}
    </div>`;
  }

  render() {
    return html`
      <dl>
        ${migrationMap.icons.map(
          icon => html`
            <dt>
              ${this.wrapIcon('code', icon.old)}
              ${Array.isArray(icon.new)
                ? icon.new.map(newIcon => this.wrapIcon('code', newIcon))
                : this.wrapIcon('code', icon.new)}
            </dt>
            <dd>
              ${this.wrapIcon('post-icon', icon.old)}
              ${Array.isArray(icon.new)
                ? icon.new.map(newIcon => this.wrapIcon('post-icon', newIcon))
                : this.wrapIcon('post-icon', icon.new)}
            </dd>
          `,
        )}
      </dl>
    `;
  }
}
