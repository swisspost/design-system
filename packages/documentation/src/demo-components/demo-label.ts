export class DemoLabel extends HTMLElement {
  static get observedAttributes() {
    return ['for'];
  }

  private for!: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'for') this.for = newValue;

    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <label>My Text</label>
    `;
  }
}

customElements.define('demo-label', DemoLabel);
