export class DemoInput extends HTMLElement {
  static get observedAttributes() {
    return ['workaround', 'arialabelledby-id', 'target-version'];
  }

  private workaround?: string;
  private arialabelledbyId?: string;
  private targetVersion?: '1' | '2' | '3';
  private internalEl?: HTMLElement;
  private slotEl?: HTMLSlotElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'workaround') this.workaround = newValue;
    if (name === 'arialabelledby-id') this.arialabelledbyId = newValue;
    if (name === 'target-version') this.targetVersion = newValue as '1' | '2' | '3';

    this.render();
  }

  private setupAriaLabelledBy() {
    if (!this.internalEl) {
      return;
    }

    let elementToLink: Element | null = null;
    const isLabelledByWorkaround = this.workaround === 'ariaLabelledByElements';

    if (this.targetVersion === '1') {
      if (isLabelledByWorkaround && this.arialabelledbyId) {
        elementToLink = document.querySelector(`[for="${this.arialabelledbyId}"]`);
      }
    } else if (this.targetVersion === '2') {
      if (isLabelledByWorkaround && this.slotEl) {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });
        elementToLink = assignedElements.find(el => el.tagName === 'LABEL') || null;
      }
    } else if (this.targetVersion === '3') {
      if (this.arialabelledbyId) {
        elementToLink = document.querySelector(`#${this.arialabelledbyId}`);
      }
    }

    this.internalEl.ariaLabelledByElements = elementToLink ? [elementToLink] : [];
  }

  private render() {
    if (!this.shadowRoot) return;
    //Version #2
    if (this.targetVersion === '2') {
      this.shadowRoot.innerHTML = `
        <slot name="aria-slot"></slot>
        <input id="internal">
      `;
      this.slotEl = this.shadowRoot.querySelector('slot[name="aria-slot"]') as HTMLSlotElement;
      this.internalEl = this.shadowRoot.querySelector('#internal') as HTMLElement;
    } else if (this.targetVersion === '3') {
      // Version #3
      this.shadowRoot.innerHTML = `
        <input id="internal">
      `;
      this.internalEl = this.shadowRoot.querySelector('#internal') as HTMLElement;
    } else if (this.targetVersion === '1') {
      // Version #1
      this.shadowRoot.innerHTML = `
        <input id="internal">
        <slot></slot>
      `;
      this.internalEl = this.shadowRoot.querySelector('#internal') as HTMLElement;
    } else {
      // Version default
      this.shadowRoot.innerHTML = `
        <label for="example">My Text</label>
        <input id="example">
      `;
    }

    this.setupAriaLabelledBy();
  }
}

customElements.define('demo-input', DemoInput);
