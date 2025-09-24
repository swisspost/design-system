export class DemoListItemGroup extends HTMLElement {
  static get observedAttributes() {
    return ['list-group-version'];
  }

  private listGroupVersion?: number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name: string, _oldValue: number, newValue: number) {
    if (name === 'list-group-version') this.listGroupVersion = newValue;

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;
    if (this.listGroupVersion == 1) {
      this.shadowRoot.innerHTML = `
        <slot name="list-item"></slot>
      `;
    } else if (this.listGroupVersion == 2) {
      this.shadowRoot.innerHTML = `<slot name="list-parent"></slot>
        <div role="listitem">item 1</div>
        <div role="listitem">item 2</div>
        <div role="listitem">item 3</div>`;
    } else if (this.listGroupVersion == 3) {
      this.shadowRoot.innerHTML = `
        <div role="listitem">item 1</div>
        <div role="listitem">item 2</div>
        <div role="listitem">item 3</div>`;
    } else if (this.listGroupVersion == 4) {
      this.shadowRoot.innerHTML = `
        <slot></slot>
      `;
    }
  }
}

customElements.define('demo-list-item-group', DemoListItemGroup);
