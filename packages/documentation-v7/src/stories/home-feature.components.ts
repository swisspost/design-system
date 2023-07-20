import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './home-feature.components.scss?inline';

@customElement('home-feature')
export class HomeFeature extends LitElement {
    static styles = unsafeCSS(styles);

    @property() title: string = '';
    @property() icon: string = '';

    render() {
      return html`
        <div className="feature">
            <post-icon name=${this.icon} class="feature--icon"></post-icon>
            <div className="feature--content">
            <h3 className="content--title">${this.title}</h3>
                <slot></slot>
            </div>
        </div>
    `;
    }
  }

