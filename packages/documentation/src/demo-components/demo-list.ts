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
    if (!this.shadowRoot) return;
    if (this.listVersion == 0) {
      this.shadowRoot.innerHTML = `
        <div role="list" tabindex="0">
        </div>
    `;
    } else if (this.listVersion == 1) {
      this.shadowRoot.innerHTML = `
          <slot></slot>
    `;
    } else if (this.listVersion == 2) {
      this.shadowRoot.innerHTML = `
        <div role="list" tabindex="0">
          <div role="listitem">item 1</div>
          <div role="listitem">item 2</div>
          <div role="listitem">item 3</div>
        </div>
    `;
    } else if (this.listVersion == 3) {
      this.shadowRoot.innerHTML = `
        <div role="list" tabindex="0">
            <slot></slot>
        </div>
    `;
    } else if (this.listVersion == 4) {
      this.shadowRoot.innerHTML = `<demo-list-item-group list-group-version="3"></demo-list-item-group>`;
    }
  }
}

customElements.define('demo-list', DemoList);
