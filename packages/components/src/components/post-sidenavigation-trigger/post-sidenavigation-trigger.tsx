import { Component, h, Host, Element } from "@stencil/core";
import { version } from '@root/package.json';

@Component({
  tag: 'post-sidenavigation-trigger',
  styleUrl: 'post-sidenavigation-trigger.scss',
  shadow: true,
})
export class PostSidenavigationTrigger {
  @Element() host: HTMLPostSidenavigationTriggerElement;
  
  get sideNavigation() {
    const postSideNavigation = document.querySelector('post-sidenavigation');
    return postSideNavigation;
  }

  componentDidLoad() {
    this.setTrigger();
  }

  private setTrigger() {
    const button = this.host.querySelector('button');
    button?.addEventListener('click', () => this.toggleSubnavigation());
  }

  private async toggleSubnavigation() {
    await this.sideNavigation?.toggle();
  }

  render() {
    return (
      <Host data-version={version}>
        <slot />
      </Host>
    );
  }
}
