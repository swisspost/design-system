import { collapse, collapsedKeyframe, expand } from '@/animations/collapse';
import { getRoot, Type } from '@/utils';
import { version } from '@root/package.json';
import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';

type InlineStyles = { [key: string]: string };

const SUPPORTS_HIDDEN_UNTIL_FOUND = Build.isBrowser && 'onbeforematch' in document.documentElement;

/**
 * @slot default - Slot for placing content within the collapsible element.
 */
@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  private content: HTMLDivElement;
  private animation?: Animation;
  private revealedHash?: string;

  @Element() host: HTMLPostCollapsibleElement;

  @State() private animating = false;

  /**
   * If `true`, the element is collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true })
  @Type('boolean')
  collapsed?: boolean = false;

  /**
   * If `true`, browser search and links to content can expand the collapsible.
   * Browser search requires support for `hidden="until-found"`.
   */
  @Prop()
  @Type('boolean')
  findable: boolean = false;

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
    this.updateTriggers();
    if (!SUPPORTS_HIDDEN_UNTIL_FOUND) this.handleHashChange();
  }

  @Watch('collapsed')
  onCollapsedChange() {
    this.updateTriggers();
  }

  @Watch('findable')
  onFindableChange() {
    this.revealedHash = undefined;
    if (this.content) this.handleHashChange();
  }

  /**
   * Fallback for hidden="until-found". Can be removed once support is good enough.
   * Reveal fragment targets across assigned slots and shadow boundaries.
   */
  private handleHashChange = () => {
    if (!Build.isBrowser || SUPPORTS_HIDDEN_UNTIL_FOUND || !this.findable || !this.content) return;

    if (this.revealedHash !== globalThis.location.hash) this.revealedHash = undefined;
    if (!this.collapsed || this.revealedHash === globalThis.location.hash) return;

    let id: string;
    try {
      id = decodeURIComponent(globalThis.location.hash.slice(1));
    } catch (error) {
      if (!(error instanceof URIError)) throw error;
      console.warn('Unable to decode the collapsible fragment target.', error);
      return;
    }

    const target = this.host.ownerDocument.getElementById(id);
    let current: Node | null = target;
    while (current) {
      if (current === this.host) {
        this.revealedHash = globalThis.location.hash;
        this.reveal();
        requestAnimationFrame(() => target?.scrollIntoView());
        return;
      }

      const parent: Node | null =
        current instanceof globalThis.Element && current.assignedSlot
          ? current.assignedSlot
          : current.parentNode;
      current = parent instanceof ShadowRoot ? parent.host : parent;
    }
  };

  /**
   * Synchronize native revelation without waiting for an animation.
   */
  private reveal = () => {
    if (!this.findable) return;

    const wasCollapsed = this.collapsed;
    this.animation?.cancel();
    this.animation = undefined;
    this.animating = false;
    this.collapsed = false;
    this.content.removeAttribute('hidden');
    this.host.style.removeProperty('height');
    this.host.style.removeProperty('overflow');
    if (wasCollapsed) this.postToggle.emit(true);
  };

  /**
   * Keeps a ref to the content wrapper and handles beforematch events
   * @param content
   */
  private setContent = (content: HTMLDivElement) => {
    this.content = content;
    if (Build.isBrowser && this.host.isConnected && SUPPORTS_HIDDEN_UNTIL_FOUND) {
      content.addEventListener('beforematch', this.reveal);
    }
  };

  disconnectedCallback() {
    if (Build.isBrowser) {
      this.content?.removeEventListener('beforematch', this.reveal);
      globalThis.removeEventListener('hashchange', this.handleHashChange);
    }
    const animation = this.animation;
    this.animation = undefined;
    animation?.cancel();
    this.animating = false;
  }

  connectedCallback() {
    if (!Build.isBrowser) return;

    if (SUPPORTS_HIDDEN_UNTIL_FOUND) {
      this.content?.addEventListener('beforematch', this.reveal);
      return;
    }

    globalThis.addEventListener('hashchange', this.handleHashChange);
    this.revealedHash = undefined;
    if (this.content) this.handleHashChange();
  }

  /**
   * Triggers the collapse programmatically.
   * If there is a collapsing transition running already, it will be reversed.
   * If no parameter is provided, the current state (this.isExpanded) will be toggled.
   * Animates and emits postToggle only when connected in a browser.
   * Setting collapsed directly changes visibility without animation or postToggle.
   */
  @Method()
  async toggle(shouldExpand = !this.isExpanded): Promise<boolean> {
    // if the parameter (shouldExpand) is set during the call (e.g. `document.querySelector('post-collapsible').toggle(true)`)
    // and it matches the current state, the current state is returned and the function exits early
    if (shouldExpand === this.isExpanded) return this.isExpanded;

    // Detached and server-rendered elements change state without animation or postToggle.
    if (!Build.isBrowser || !this.host.isConnected) {
      this.collapsed = !shouldExpand;
      return shouldExpand;
    }

    this.animating = true;
    this.content?.removeAttribute('hidden');
    const isExpanded = shouldExpand;
    this.collapsed = !isExpanded;

    const animation = isExpanded ? expand(this.host) : collapse(this.host);
    const previousAnimation = this.animation;
    this.animation = animation;
    previousAnimation?.cancel();
    this.postToggle.emit(isExpanded);

    try {
      await animation.finished;
      if (this.animation !== animation) return isExpanded;
      animation.commitStyles();
      animation.cancel();
    } catch (error) {
      // A newer toggle or native reveal supersedes this animation.
      if (
        this.animation !== animation &&
        error instanceof DOMException &&
        error.name === 'AbortError'
      ) {
        return isExpanded;
      }
      throw error;
    } finally {
      // Only this animation may clear its state, not an older superseded animation.
      if (this.animation === animation) {
        this.animation = undefined;
        this.animating = false;
      }
    }

    return isExpanded;
  }

  /**
   * Update all post-collapsible-trigger elements referring to or wrapping the collapsible
   */
  private updateTriggers() {
    // Using a set for de-duplicating triggers
    const triggers = new Set<HTMLPostCollapsibleTriggerElement>(
      this.host.id &&
        getRoot(this.host).querySelectorAll<HTMLPostCollapsibleTriggerElement>(
          `post-collapsible-trigger[for="${this.host.id}"]`,
        ),
    );

    // Also update an ancestor trigger when the collapsible is nested inside one
    const nestedTrigger = this.host.closest<HTMLPostCollapsibleTriggerElement>(
      'post-collapsible-trigger',
    );
    if (nestedTrigger) triggers.add(nestedTrigger);

    triggers.forEach(trigger => trigger.update());
  }

  render() {
    const hidden =
      this.collapsed &&
      !this.animating &&
      (this.findable && SUPPORTS_HIDDEN_UNTIL_FOUND ? 'until-found' : true);

    return (
      <Host
        data-version={version}
        data-animating={this.animating ? '' : undefined}
        tabindex={this.collapsed ? -1 : undefined}
        style={this.collapsed ? (collapsedKeyframe as InlineStyles) : undefined}
      >
        {/* @ts-expect-error Stencil types do not yet support hidden="until-found". */}
        <div hidden={hidden} ref={this.setContent}>
          <slot onSlotchange={() => this.handleHashChange()} />
        </div>
      </Host>
    );
  }
}
