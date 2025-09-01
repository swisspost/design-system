export class DemoSpan extends HTMLElement {
  static get observedAttributes() {
    return ['spanId'];
  }

  private spanId!: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'id') this.spanId = newValue;

    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <span>My Text</span>
    `;
  }
}

customElements.define('demo-span', DemoSpan);
