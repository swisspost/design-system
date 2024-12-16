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
import { checkEmptyOrType, isMotionReduced } from '@/utils';

/**
 * @part collapsible-container - The pseudo-element, used to override styles on the collapsible element.
 * @slot default - Slot for placing content within the collapsible element.
 */

@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  private isLoaded = false;
  private isOpen = true;

  @Element() host: HTMLPostCollapsibleElement;

  /**
   * If `true`, the element is collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed?: boolean = false;

  @Watch('collapsed')
  collapsedChange() {
    checkEmptyOrType(
      this.collapsed,
      'boolean',
      'The `collapsed` property of the `post-collapsible` must be a boolean.',
    );

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
    this.isLoaded = true;

    this.updateTriggers();
  }

  /**
   * Triggers the collapse programmatically.
   *
   * If there is a collapsing transition running already, it will be reversed.
   */
  @Method()
  async toggle(open = !this.isOpen): Promise<boolean> {
    if (open === this.isOpen) return open;

    this.isOpen = open;
    this.collapsed = !open;
    if (this.isLoaded) this.postToggle.emit(open);

    const animation = open ? expand(this.host) : collapse(this.host);

    if (!this.isLoaded || isMotionReduced()) animation.finish();

    await animation.finished;

    const isHostRendered = this.host.offsetParent;
    if (isHostRendered) animation.commitStyles();

    return open;
  }

  /**
   * Update all post-collapsible-trigger elements referring to the collapsible
   */
  private updateTriggers() {
    const triggers: NodeListOf<HTMLPostCollapsibleTriggerElement> = document.querySelectorAll(
      `post-collapsible-trigger[for="${this.host.id}"]`,
    );

    triggers.forEach(trigger => trigger.update());
  }

  render() {
    return (
      <Host data-version={version} part="collapsible-container">
        <slot />
      </Host>
    );
  }
}
