export class DemoButton extends HTMLElement {
  static get observedAttributes() {
    return ['button-version', 'workaround', 'arialabelledby-id', 'ariadescribedby-id'];
  }
  private buttonVersion?: '1' | '2' | '3' | '4';
  private workaround?: string;
  private internalButton?: HTMLElement;
  private arialabelledbyId?: string;
  private ariadescribedbyId?: string;
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
    if (name === 'ariadescribedby-id') this.ariadescribedbyId = newValue;
    if (name === 'button-version') this.buttonVersion = newValue as '1' | '2' | '3';
    this.render();
  }

  private setupAria() {
    const isLabelled = this.workaround === 'ariaLabelledByElements';
    const isDescribed = this.workaround === 'ariaDescribedByElements';

    if (!this.internalButton || (!isLabelled && !isDescribed)) {
      return;
    }

    let elementToLink: Element | null = null;

    if (this.buttonVersion === '1' || this.buttonVersion === '3') {
      const id = isLabelled ? this.arialabelledbyId : this.ariadescribedbyId;
      if (id) {
        elementToLink = document.querySelector(`#${id}`);
      }
    } else if (this.buttonVersion === '2' || this.buttonVersion === '4') {
      if (this.slotEl) {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });
        elementToLink = assignedElements.find(el => el.tagName === 'SPAN') || null;
      }
    }

    const ariaPropertyName = isLabelled ? 'ariaLabelledByElements' : 'ariaDescribedByElements';
    this.internalButton[ariaPropertyName] = elementToLink ? [elementToLink] : [];
  }

  private render() {
    if (!this.shadowRoot) return;

    if (this.buttonVersion) {
      this.shadowRoot.innerHTML = `
      <slot name="aria-slot"></slot>
      <div part="button"
        role="button"
        tabindex="0"
      > <post-icon name="1022"></post-icon>
      </div>
    `;
    } else {
      this.shadowRoot.innerHTML = `
      <span id="example">My Text</span>
      <div part="button"
      role="button" tabindex="0" aria-labelledby="example">
        <post-icon name="1022"></post-icon>
      </div>
   `;
    }

    this.internalButton = this.shadowRoot.querySelector('div[role="button"]') as HTMLElement;
    this.slotEl = this.shadowRoot.querySelector('slot[name="aria-slot"]') as HTMLSlotElement;
    this.setupAria();
  }
}

customElements.define('demo-button', DemoButton);
