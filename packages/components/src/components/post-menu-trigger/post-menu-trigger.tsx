import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-menu-trigger',
  shadow: true,
})
export class PostMenuTrigger {
  // private mutationObserver: MutationObserver;
  // private slottedButton: HTMLElement;
  //
  @Element() host: HTMLPostMenuTriggerElement;

  /**
   * ID of the menu element that this trigger is linked to. Used to open and close the specified menu.
   */
  @Prop({ reflect: true }) for!: string;

  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }
  //
  // componentDidLoad() {
  //   this.validateFor();
  //   this.createMutationObserver();
  // }
  //
  // disconnectedCallback() {
  //   this.mutationObserver?.disconnect();
  // }
  //
  // @Listen('toggleMenu', { target: 'document' })
  // onMenuToggle(event: CustomEvent<boolean>) {
  //   if (isPostMenu(event.target) && event.target.id === this.for) {
  //     this.slottedButton?.setAttribute('aria-expanded', event.detail.toString());
  //   }
  // }
  //
  // private createMutationObserver() {
  //   this.mutationObserver = new MutationObserver(this.linkButtonToMenu.bind(this));
  //   this.mutationObserver.observe(this.host, { childList: true });
  //
  //   // run callback at least once
  //   this.linkButtonToMenu();
  // }
  //
  // private linkButtonToMenu() {
  //   const slottedElements = this.host.children;
  //   if (slottedElements.length !== 1) {
  //     console.warn('Multiple children found within post-menu-trigger.', this.host);
  //   }
  //
  //   if (slottedElements[0].localName !== 'button') {
  //     console.warn('Multiple children found within post-menu-trigger.', this.host);
  //   }
  //
  //   this.slottedButton = slottedElements[0] as HTMLButtonElement;
  //
  //   this.slottedButton.setAttribute('aria-haspopup', 'menu');
  //   this.slottedButton.setAttribute('aria-expanded', 'false');
  //
  //   this.slottedButton.addEventListener('click', this.handleToggle.bind(this));
  //   this.slottedButton.addEventListener('keydown', this.handleKeyDown.bind(this));
  // }
  //
  // private readonly handleKeyDown = (e: KeyboardEvent) => {
  //   if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
  //     e.preventDefault();
  //     this.handleToggle();
  //   }
  // };
  //
  // private handleToggle() {
  //   const menu = getRoot(this.host).getElementById(this.for);
  //   if (!isPostMenu(menu)) {
  //     console.warn(`No post-menu found with ID: ${this.for}`);
  //     return;
  //   }
  //
  //   menu.toggle(this.host);
  // }

  render() {
    return (
      <Host data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
