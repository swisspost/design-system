export class DemoListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
    <div role="listitem">
      <slot></slot>
    </div>`;
  }
}

customElements.define('demo-list-item', DemoListItem);
