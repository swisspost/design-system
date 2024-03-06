import { css, LitElement, nothing, unsafeCSS } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import Styles from './tile.component.scss?inline';

@customElement('ti-le')
export class TileComponent extends LitElement {
  @property({ type: String }) title: string = '';
  @property({ type: String }) ariaLabel: string | null = null;
  @property({ type: String }) href: string | null = null;

  static get styles() {
    return css`
      ${unsafeCSS(Styles)}
    `;
  }

  render() {
    const isLink = this.href !== null;
    const tag = isLink ? 'a' : 'div';
    const attributes = isLink ? { href: this.href, target: '_blank' } : {};

    return html` <${unsafeStatic(tag)} class="tile" ${spread(attributes)} aria-label="${
      this.ariaLabel ?? nothing
    }">
      ${this.title ? html`<span class="tile--title">${this.title}</span>` : nothing}
      <span class="tile--icon"><slot></slot></span>
    </${unsafeStatic(tag)}>`;
  }
}
