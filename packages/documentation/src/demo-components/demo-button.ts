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
    const member = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    if (member === 'buttonVersion') {
      this.buttonVersion = newValue as '1' | '2' | '3' | '4';
    } else {
      this[member as keyof this] = newValue as this[keyof this];
    }

    this.render();
  }

  private setupAria() {
    let elementToLink: Element | null = null;

    const isLabelled = this.workaround === 'ariaLabelledByElements';
    const isDescribed = this.workaround === 'ariaDescribedByElements';

    const ariaPropertyName = isLabelled ? 'ariaLabelledByElements' : 'ariaDescribedByElements';

    if (!this.internalButton || (!isLabelled && !isDescribed)) {
      return;
    }

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
    } else if (this.arialabelledbyId) {
      this.shadowRoot.innerHTML = `
      <span id="${this.arialabelledbyId}">My Text</span>
      <div part="button"
      role="button" tabindex="0" aria-labelledby="${this.arialabelledbyId}">
        <post-icon name="1022"></post-icon>
      </div>
   `;
    } else if (this.ariadescribedbyId) {
      this.shadowRoot.innerHTML = `
      <div part="button"
      role="button" tabindex="0" aria-describedby="${this.ariadescribedbyId}">
        <post-icon name="1022"></post-icon>
      </div>
        <span id="${this.ariadescribedbyId}">My Description</span>
   `;
    }

    this.internalButton = this.shadowRoot.querySelector('div[role="button"]') as HTMLElement;
    this.slotEl = this.shadowRoot.querySelector('slot[name="aria-slot"]') as HTMLSlotElement;
    this.setupAria();
  }
}

customElements.define('demo-button', DemoButton);
