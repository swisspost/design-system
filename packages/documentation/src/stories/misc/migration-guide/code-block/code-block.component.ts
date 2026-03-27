import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Styles from './code-block.component.scss?inline';

@customElement('code-block')
export class CodeBlock extends LitElement {
  @property({ type: String }) code = '';

  @state() private copied = false;
  private timeoutId?: number;

  static get styles() {
    return css`
      ${unsafeCSS(Styles)}
    `;
  }

  private async handleCopy() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied = true;

      clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (error) {
      console.warn(`Code Block: copying "${this.code}" failed!`, error);
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <button @click=${this.handleCopy}>${this.copied ? 'Copied' : 'Copy'}</button>

        <pre><code>
  ${this.code}
        </code></pre>
      </div>
    `;
  }
}
