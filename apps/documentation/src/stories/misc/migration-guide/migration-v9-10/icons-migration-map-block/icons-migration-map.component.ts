import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import Styles from './icons-migration-map.component.scss?inline';
import migrationMap from '@/shared/icons-migration-map.json';

@customElement('icons-migration-map')
export class IconsMigrationMap extends LitElement {
  private iconObserver?: IntersectionObserver;
  private observedPlaceholders = new WeakSet<HTMLElement>();

  static get styles() {
    return css`
      ${unsafeCSS(Styles)}
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    this.iconObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const placeholder = entry.target as HTMLElement;

        this.injectIcon(placeholder);
        this.iconObserver?.unobserve(placeholder);
      }
    });
  }

  disconnectedCallback() {
    this.iconObserver?.disconnect();
    super.disconnectedCallback();
  }

  updated() {
    const placeholders = this.renderRoot.querySelectorAll<HTMLElement>('[data-icon-placeholder]');

    if (!this.iconObserver) {
      placeholders.forEach(placeholder => this.injectIcon(placeholder));
      return;
    }

    for (const placeholder of placeholders) {
      if (this.observedPlaceholders.has(placeholder)) continue;

      this.observedPlaceholders.add(placeholder);
      this.iconObserver.observe(placeholder);
    }
  }

  private injectIcon(placeholder: HTMLElement) {
    const iconName = placeholder.dataset.iconName;

    if (placeholder.dataset.iconLoaded === 'true') return;
    if (!iconName) return;

    const icon = document.createElement('post-icon');
    icon.setAttribute('name', iconName);
    placeholder.replaceChildren(icon);
    placeholder.dataset.iconLoaded = 'true';
  }

  wrapIcon(tag: 'code' | 'post-icon', iconName: string | number) {
    if (tag === 'code') {
      return html`<div><code>${iconName}</code></div>`;
    }

    return html`<div data-icon-placeholder data-icon-name="${String(iconName)}"></div>`;
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
