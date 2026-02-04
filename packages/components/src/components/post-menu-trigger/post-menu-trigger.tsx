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

  /**
   * ID of the menu element that this trigger is linked to. Used to open and close the specified menu.
   */
  @Prop({ reflect: true }) for!: string;

  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  componentDidLoad() {
    this.validateFor();
    this.linkButtonToMenu();
  }

  private linkButtonToMenu() {
    const slottedButtons = this.host.querySelectorAll('button');

    if (slottedButtons.length !== 1) {
      const warning = `The post-menu-trigger must contain a single button (${slottedButtons.length} found).`;
      console.warn(warning);
      return;
    }

    const button = slottedButtons.item(0);

    button.setAttribute('type', 'button');
    button.setAttribute('aria-haspopup', 'menu');
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', this.handleToggle.bind(this));
    button.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Listen to the `toggleMenu` event emitted by the `post-menu` component
    const menu = this.getMenu();
    if (menu) {
      menu.addEventListener('toggleMenu', (event: CustomEvent<boolean>) => {
        button.setAttribute('aria-expanded', event.detail.toString());
      });
    }
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
    const ref = getRoot(this.host).getElementById(this.for);
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
