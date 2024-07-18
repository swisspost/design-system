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
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop() readonly collapsed?: boolean = false;

  @Watch('collapsed')
  validateCollapsed(newValue = this.collapsed) {
    checkEmptyOrType(
      newValue,
      'boolean',
      'The `collapsed` property of the `post-collapsible` must be a boolean.',
    );
  }

  /**
   * An event emitted when the collapse element is shown or hidden, before the transition.
   *
   * The event payload is a boolean: `true` if the collapsible was opened, `false` if it was closed.
   */
  @Event() postToggle: EventEmitter<boolean>;

  connectedCallback() {
    this.validateCollapsed();
  }

  componentDidLoad() {
    if (this.collapsed) void this.toggle(false);
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

    this.isOpen = !this.isOpen;
    if (this.isLoaded) this.postToggle.emit(this.isOpen);

    const animation = open ? expand(this.host) : collapse(this.host);

    if (!this.isLoaded || isMotionReduced()) animation.finish();

    await animation.finished;

    animation.commitStyles();

    return this.isOpen;
  }

  /**
   * Update all post-collapsible-trigger elements referring to the collapsible
   */
  private updateTriggers() {
    const triggers: NodeListOf<HTMLPostCollapsibleTriggerElement> = document.querySelectorAll(
      `post-collapsible-trigger[for=${this.host.id}]`,
    );

    triggers.forEach(trigger => trigger.update());
  }

  render() {
    return (
      <Host data-version={version}>
        <slot />
      </Host>
    );
  }
}
