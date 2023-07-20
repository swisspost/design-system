import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './home-tile.components.scss?inline';

@customElement('home-tile')
export class HomeTile extends LitElement {
    static styles = unsafeCSS(styles);

    @property() title: string = '';
    @property() href?: string;

    render() {
      return this.href
        ? html`
          <a class="tile" href=${this.href} target="_blank" rel="noopener">
              ${ this.title ? html`<span class="tile--title">${ this.title }</span>` : null }
              <span class="tile--icon">
              <slot></slot>
              </span>
          </a>`
        : html`
          <div class="tile">
              ${ this.title ? html`<span class="tile--title">${ this.title }</span>` : null }
              <span class="tile--icon">
              <slot></slot>
              </span>
          </div>`
    }
  }

