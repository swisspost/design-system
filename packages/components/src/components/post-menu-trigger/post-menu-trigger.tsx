import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { getRoot, checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-menu-trigger',
  styleUrl: 'post-menu-trigger.scss',
  shadow: true,
})
export class PostMenuTrigger {
  @Element() host: HTMLPostMenuTriggerElement;

  private root: Document | ShadowRoot;
  private slottedButton: HTMLButtonElement;

  /**
   * ID of the menu element that this trigger is linked to. Used to open and close the specified menu.
   */
  @Prop({ reflect: true }) for!: string;

  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  constructor() {
    this.updateAriaExpanded = this.updateAriaExpanded.bind(this);
  }

  connectedCallback() {
    this.root = getRoot(this.host);
  }

  componentDidLoad() {
    this.validateFor();
    this.setAriaAttributes();

    if (this.root) {
      this.root.addEventListener('toggleMenu', this.updateAriaExpanded);
    }
  }

  disconnectedCallback() {
    this.root.removeEventListener('toggleMenu', this.updateAriaExpanded);
  }

  private updateAriaExpanded(event: CustomEvent) {
    const target = event.target as HTMLPostMenuElement;

    if (target.localName === 'post-menu' && target.id === this.for) {
      this.slottedButton.setAttribute('aria-expanded', event.detail.toString());
    }
  }

  private setAriaAttributes() {
    const slottedButtons = this.host.querySelectorAll('button');

    if (slottedButtons.length !== 1) {
      console.warn(
        `The post-menu-trigger should contain exactly one button (${slottedButtons.length} found).`,
      );
      return;
    }

    this.slottedButton = slottedButtons.item(0);

    this.slottedButton.setAttribute('type', 'button');
    this.slottedButton.setAttribute('aria-haspopup', 'menu');
    this.slottedButton.setAttribute('aria-expanded', 'false');

    this.slottedButton.addEventListener('click', this.handleToggle.bind(this));
    this.slottedButton.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.handleToggle();
    }
  }

  private handleToggle() {
    const menu = this.getMenu();
    if (menu) menu.toggle(this.host);
  }

  private getMenu(): HTMLPostMenuElement | null {
    const ref = this.root.getElementById(this.for);
    if (ref && ref.localName === 'post-menu') return ref as HTMLPostMenuElement;

    console.warn(`No post-menu found with ID: ${this.for}`);
    return null;
  }

  render() {
    return (
      <Host data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
