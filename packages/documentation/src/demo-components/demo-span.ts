export class DemoSpan extends HTMLElement {
  static get observedAttributes() {
    return ['spanId', 'content'];
  }

  private spanId!: string;
  private content: string = 'My text';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'id') this.spanId = newValue;
    if (name === 'content') this.content = newValue;

    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <span>${this.content}</span>
    `;
  }
}

customElements.define('demo-span', DemoSpan);
