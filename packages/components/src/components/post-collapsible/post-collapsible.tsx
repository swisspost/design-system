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
  Build,
} from '@stencil/core';
import { version } from '@root/package.json';
import { collapsedKeyframe, collapse, expand } from '@/animations/collapse';
import { checkEmptyOrType } from '@/utils';

type InlineStyles = { [key: string]: string };

/**
 * @slot default - Slot for placing content within the collapsible element.
 */
@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  @Element() host: HTMLPostCollapsibleElement;

  /**
   * If `true`, the element is collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed?: boolean = false;

  @Watch('collapsed')
  collapsedChange() {
    checkEmptyOrType(this, 'collapsed', 'boolean');
  }

  /**
   * An event emitted when the collapse element is shown or hidden, before the transition.
   *
   * The event payload is a boolean: `true` if the collapsible is expanded, `false` if it is collapsed.
   */
  @Event() postToggle: EventEmitter<boolean>;

  get isExpanded() {
    return !this.collapsed;
  }

  componentDidLoad() {
    this.collapsedChange();
    this.updateTriggers();
  }

  /**
   * Triggers the collapse programmatically.
   * If there is a collapsing transition running already, it will be reversed.
   * If no parameter is provided, the current state (this.isExpanded) will be toggled.
   */
  @Method()
  async toggle(shouldExpand = !this.isExpanded): Promise<boolean> {
    // if the parameter (shouldExpand) is set during the call (e.g. `document.querySelector('post-collapsible').toggle(true)`)
    // and it matches the current state, the current state is returned and the function exits early
    if (shouldExpand === this.isExpanded) return this.isExpanded;

    // applying the new state to this.collapsed will also indirectly update this.isExpanded,
    // due to its implementation with the getter, which returns !this.collapsed
    this.collapsed = !shouldExpand;
    const isExpanded = this.isExpanded;

    if (Build.isBrowser) {
      const animation = isExpanded ? expand(this.host) : collapse(this.host);
      this.postToggle.emit(isExpanded);

      await animation.finished;
      animation.commitStyles();

      this.updateTriggers();
    }

    return isExpanded;
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
      <Host
        data-version={version}
        tabindex={this.collapsed ? -1 : undefined}
        style={this.collapsed ? (collapsedKeyframe as InlineStyles) : undefined}
      >
        <slot />
      </Host>
    );
  }
}
