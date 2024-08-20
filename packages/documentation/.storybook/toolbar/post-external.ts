import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import postExternalStyles from '../../../styles/dist/post-external.css?inline';

@customElement('post-external')
export class SimpleGreeting extends LitElement {
  static styles = unsafeCSS(postExternalStyles);

  render() {
    return html`<slot></slot>`;
  }
}
