export class DemoTarget extends HTMLElement {
  static get observedAttributes() {
    return ['workaround', 'aria-labelledby-id', 'target-version'];
  }

  private workaround?: string;
  private ariaLabelledbyId?: string;
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
    if (name === 'aria-labelledby-id') this.ariaLabelledbyId = newValue;
    if (name === 'target-version') this.targetVersion = newValue as '1' | '2' | '3';

    this.render();
  }

  private setupAriaLabelledBy() {
    if (!this.internalEl) return;

    if (this.targetVersion === '1') {
      const labelEl = document.querySelector(`[for="${this.ariaLabelledbyId}"]`);
      this.internalEl.ariaLabelledByElements =
        this.workaround === 'ariaLabelledByElements' && labelEl ? [labelEl] : [];
    } else if (this.targetVersion === '2') {
      if (this.slotEl && this.workaround === 'ariaLabelledByElements') {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });
        const labelElement = assignedElements.find(el => el.tagName === 'LABEL');
        this.internalEl.ariaLabelledByElements = labelElement ? [labelElement] : [];
      } else {
        this.internalEl.ariaLabelledByElements = [];
      }
    } else if (this.targetVersion === '3') {
      // Target3 doesn't have an input; just make div focusable
      // this.setAttribute('tabindex', '0');
      // this.setAttribute('role', 'textbox');
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    if (this.targetVersion === '2') {
      this.shadowRoot.innerHTML = `
        <slot name="label-slot"></slot>
        <input id="internal">
      `;
      this.slotEl = this.shadowRoot.querySelector('slot[name="label-slot"]') as HTMLSlotElement;
      this.internalEl = this.shadowRoot.querySelector('#internal') as HTMLElement;
    } else if (this.targetVersion === '3') {
      this.shadowRoot.innerHTML = `
        <slot name="label-slot"></slot>
        <input id="internal">
        </input>
      `;
      this.internalEl = this.shadowRoot.querySelector('#internal') as HTMLElement;
    } else {
      // default to target1
      this.shadowRoot.innerHTML = `
        <input id="internal">
        <slot></slot>
      `;
      this.internalEl = this.shadowRoot.querySelector('#internal') as HTMLElement;
    }

    this.setupAriaLabelledBy();
  }
}

customElements.define('demo-target', DemoTarget);
