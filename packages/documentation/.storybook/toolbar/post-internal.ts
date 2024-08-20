import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import postInternalStyles from '../../../styles/dist/post-internal.css?inline';

@customElement('post-internal')
export class SimpleGreeting extends LitElement {
  static styles = unsafeCSS(postInternalStyles);

  render() {
    return html`<slot></slot>`;
  }
}
