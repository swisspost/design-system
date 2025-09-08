export class DemoButton extends HTMLElement {
  static get observedAttributes() {
    return ['button-version', 'workaround', 'aria-labelledby-id', 'aria-describedby-id'];
  }
  private buttonVersion?: '1' | '2' | '3' | '4';
  private workaround?: string;
  private internalButton?: HTMLElement;
  private ariaLabelledbyId?: string;
  private ariaDescribedbyId?: string;
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
    if (name === 'aria-labelledby-id') this.ariaLabelledbyId = newValue;
    if (name === 'aria-describedby-id') this.ariaDescribedbyId = newValue;
    if (name === 'button-version') this.buttonVersion = newValue as '1' | '2' | '3';
    this.render();
  }

  private setupAria() {
    if (this.buttonVersion == '1') {
      if (this.workaround === 'ariaLabelledByElements') {
        const labelEl = document.querySelector(`#${this.ariaLabelledbyId}`);
        if (this.internalButton)
          this.internalButton.ariaLabelledByElements = labelEl ? [labelEl] : [];
      }
    }

    if (this.buttonVersion == '2') {
      if (this.workaround === 'ariaLabelledByElements' && this.slotEl) {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });
        const labelEl = assignedElements.find(el => el.tagName === 'SPAN');
        if (this.internalButton)
          this.internalButton.ariaLabelledByElements = labelEl ? [labelEl] : [];
      }
    }

    if (this.buttonVersion == '3') {
      if (this.workaround === 'ariaDescribedByElements') {
        const labelEl = document.querySelector(`#${this.ariaDescribedbyId}`);
        console.log('version 3', labelEl);
        if (this.internalButton)
          this.internalButton.ariaDescribedByElements = labelEl ? [labelEl] : [];
      }
    }

    if (this.buttonVersion == '4') {
      if (this.workaround === 'ariaDescribedByElements' && this.slotEl) {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });

        const labelEl = assignedElements.find(el => el.tagName === 'SPAN');
        if (this.internalButton)
          this.internalButton.ariaDescribedByElements = labelEl ? [labelEl] : [];
      }
    }
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <slot name="label-slot"></slot>
      <div part="button"
        class="btn btn-primary"
        role="button"
        tabindex="0"
      > <post-icon name="1022"></post-icon>
      </div>
    `;

    this.internalButton = this.shadowRoot.querySelector('div[role="button"]') as HTMLElement;
    this.slotEl = this.shadowRoot.querySelector('slot[name="label-slot"]') as HTMLSlotElement;
    this.setupAria();
  }
}

customElements.define('demo-button', DemoButton);
