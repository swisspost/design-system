import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';
import { collapse, expand } from '@/animations/collapse';
import { checkEmptyOrType } from '@/utils';

/**
 * @slot default - Slot for placing content within the collapsible element.
 */
@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  private isOpen = true;

  @Element() host: HTMLPostCollapsibleElement;

  /**
   * If `true`, the element is collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed?: boolean = false;

  @Watch('collapsed')
  collapsedChange() {
    checkEmptyOrType(this, 'collapsed', 'boolean');
    void this.toggle(!this.collapsed);
  }

  /**
   * An event emitted when the collapse element is shown or hidden, before the transition.
   *
   * The event payload is a boolean: `true` if the collapsible was opened, `false` if it was closed.
   */
  @Event() postToggle: EventEmitter<boolean>;

  componentDidLoad() {
    this.collapsedChange();
    this.updateTriggers();
  }

  /**
   * Triggers the collapse programmatically.
   * If there is a collapsing transition running already, it will be reversed.
   * If is called accidentally on the server or if the requested state is already set, it will do nothing.
   */
  @Method()
  async toggle(open = !this.isOpen): Promise<boolean> {
    if (open === this.isOpen) return open;

    const animation = open ? expand(this.host) : collapse(this.host);

    if (animation && animation.finished) {
      this.isOpen = open;
      this.collapsed = !open;

      await animation.finished;
      animation.commitStyles();

      this.updateTriggers();
      this.postToggle.emit(open);

      return open;
    } else {
      return this.isOpen;
    }
  }

  /**
   * Update all `<post-collapsible-trigger>` aria attributes, referring to this collapsible
   * If is called accidentally on the server, it will do nothing.
   */
  private updateTriggers() {
    const triggers: NodeListOf<HTMLPostCollapsibleTriggerElement> = document.querySelectorAll(
      `post-collapsible-trigger[for="${this.host.id}"]`,
    );

    triggers.forEach(trigger => trigger.update());
  }

  render() {
    return (
      <Host data-version={version} tabindex={this.collapsed ? -1 : undefined}>
        <slot />
      </Host>
    );
  }
}
