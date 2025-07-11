export class DemoButton extends HTMLElement {
  static get observedAttributes() {
    return ['aria-labelledby-id', 'aria-describedby-id'];
  }

  private ariaLabelledbyId?: string;
  private ariaDescribedbyId?: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'aria-labelledby-id') this.ariaLabelledbyId = newValue;
    if (name === 'aria-describedby-id') this.ariaDescribedbyId = newValue;
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <div 
        class="btn btn-primary"
        role="button"
        tabindex="0"
        ${this.ariaLabelledbyId ? `aria-labelledby="${this.ariaLabelledbyId}"` : ''}
        ${this.ariaDescribedbyId ? `aria-describedby="${this.ariaDescribedbyId}"` : ''}
      >
        <slot name="label-slot"></slot>
        <div>
          <post-icon name="1022"></post-icon>
        </div>
      </div>
    `;
  }
}

customElements.define('demo-button', DemoButton);
