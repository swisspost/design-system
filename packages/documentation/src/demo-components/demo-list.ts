export class DemoList extends HTMLElement {
  static get observedAttributes() {
    return ['list-version'];
  }

  private listVersion?: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: number, newValue: number) {
    if (name === 'list-version') this.listVersion = newValue;
    this.render();
  }

  private render() {
    console.log(this.listVersion);
    if (!this.shadowRoot) return;

    if (this.listVersion === 1) {
      this.shadowRoot.innerHTML = `
        <div>
          <slot name="demo-list-item"></slot>
        </div>
    `;
    } else if (this.listVersion === 2) {
      this.shadowRoot.innerHTML = `<div role="list" tabindex="0">
          <demo-list-item>item 1</demo-list-item>
          <demo-list-item>item 2</demo-list-item>
          <demo-list-item>item 3</demo-list-item>
        </div>`;
    }
  }
}

customElements.define('demo-list', DemoList);
