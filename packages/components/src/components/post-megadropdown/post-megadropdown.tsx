import { getFocusableChildren } from '@/utils/get-focusable-children';
import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { version } from '@root/package.json';
import { breakpoint, Device } from '@/utils/breakpoints';
import { fadeSlideIn, fadeSlideOut, slideIn, slideOut } from '@/animations';
import { AnimationOptions } from '@/animations/types';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;

  /** Tracks the currently active dropdown instance. */
  private static activeDropdown: PostMegadropdown | null = null;

  private defaultSlotObserver: MutationObserver;

  private currentAnimation: Animation | null = null;
  private animatedContainer: HTMLElement;

  private fsAnimationOptions: AnimationOptions = {
    translate: -10,
    duration: 350,
    easing: {
      x1: 0.8,
      y1: 0.2,
      x2: 0.8,
      y2: 0.7,
    },
  };

  private onKeydown = (e: KeyboardEvent) => this.keyboardHandler(e);
  private onKeyup = (e: KeyboardEvent) => this.handleTabOutside(e);
  private onMousedown = (e: MouseEvent) => this.handleClickOutside(e);

  @Element() host: HTMLPostMegadropdownElement;

  @State() device: Device = breakpoint.get('device');

  /**
   * Holds the current visibility state of the dropdown.
   * This state is internally managed to track whether the dropdown is open (`true`) or closed (`false`),
   * and updates automatically when the dropdown is toggled.
   */
  @State() isVisible: boolean = false;

  @State() trigger: boolean = false;

  private get megadropdownTrigger(): Element | null {
    const hostId = this.host.getAttribute('id');
    return hostId
      ? document.querySelector(`post-megadropdown-trigger[for="${hostId}"] > button`)
      : null;
  }

  /**
   * Emits when the dropdown is shown or hidden.
   * The event payload is an object.
   * `isVisible` is true when the dropdown gets opened and false when it gets closed
   * `focusParent` determines whether after the closing of the mega dropdown, the focus should go back to the trigger parent or naturally go to the next focusable element in the page
   **/
  @Event() postToggleMegadropdown: EventEmitter<{ isVisible: boolean; focusParent?: boolean }>;

  connectedCallback() {
    window.addEventListener('postBreakpoint:device', this.breakpointChange.bind(this));
  }

  componentDidRender() {
    this.getFocusableElements();
  }

  componentDidLoad() {
    this.checkInitialAriaCurrent();
    this.setupObserver();
    this.handleAriaCurrentChange([]);
  }

  disconnectedCallback() {
    this.removeListeners();
    window.removeEventListener('postBreakpoint:device', this.breakpointChange.bind(this));

    if (PostMegadropdown.activeDropdown === this) {
      PostMegadropdown.activeDropdown = null;
    }

    if (this.defaultSlotObserver) {
      this.defaultSlotObserver.disconnect();
    }
  }

  /**
   * Toggles the dropdown visibility based on its current state.
   */
  @Method()
  async toggle() {
    if (this.isVisible) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  /**
   * Displays the dropdown.
   */
  @Method()
  async show() {
    if (PostMegadropdown.activeDropdown && PostMegadropdown.activeDropdown !== this) {
      // Close the previously active dropdown without animation
      PostMegadropdown.activeDropdown.forceClose();
    }

    // First set the megadropdown to be visible, then animate
    this.isVisible = true;
    PostMegadropdown.activeDropdown = this;
    this.postToggleMegadropdown.emit({ isVisible: this.isVisible });

    this.cancelAllAnimations();

    this.currentAnimation =
      this.device === 'desktop'
        ? fadeSlideIn(this.animatedContainer, this.fsAnimationOptions)
        : slideIn(this.animatedContainer, { translate: 100, duration: 350, easing: 'ease-in' });

    try {
      await this.currentAnimation.finished;
      // After the megadropdown becomes visible
      this.currentAnimation = null;

      if (
        this.firstFocusableEl &&
        window.getComputedStyle(this.firstFocusableEl).display !== 'none'
      ) {
        this.firstFocusableEl.focus();
      }
      this.addListeners();
    } catch {
      // Open animation was cancelled
      this.isVisible = false;
      this.currentAnimation = null;
      PostMegadropdown.activeDropdown = null;
      this.removeListeners();
      this.postToggleMegadropdown.emit({ isVisible: false });
    }
  }
  /**
   * Hides the dropdown with an animation.
   */
  @Method()
  async hide(focusParent = true, forceClose = false) {
    if (forceClose) {
      this.forceClose();
      return;
    }
    this.cancelAllAnimations();

    this.currentAnimation =
      this.device === 'desktop'
        ? fadeSlideOut(this.animatedContainer, this.fsAnimationOptions)
        : slideOut(this.animatedContainer, { translate: 100, duration: 350, easing: 'ease-out' });

    try {
      this.postToggleMegadropdown.emit({ isVisible: false, focusParent: focusParent });

      await this.currentAnimation.finished;

      // After the megadropdown container is hidden
      this.currentAnimation = null;
      this.isVisible = false;
      PostMegadropdown.activeDropdown = null;
      this.removeListeners();
    } catch {
      // Closing animation was cancelled
      this.isVisible = true;
      this.currentAnimation = null;
      PostMegadropdown.activeDropdown = null;
      this.postToggleMegadropdown.emit({ isVisible: true, focusParent: focusParent });
    }
  }

  /**
   * Sets focus to the first focusable element within the component.
   */
  @Method()
  async focusFirst() {
    this.firstFocusableEl?.focus();
  }

  private breakpointChange(e: CustomEvent) {
    this.device = e.detail;
    if (this.device === 'desktop' && this.isVisible) {
      this.cancelAllAnimations();
    }
  }
  /**
   * Forces the dropdown to close without animation.
   */
  private forceClose() {
    this.isVisible = false;
    this.cancelAllAnimations();
    this.postToggleMegadropdown.emit({ isVisible: this.isVisible, focusParent: false });
    this.removeListeners();
  }

  private readonly handleClickOutside = async (event: MouseEvent) => {
    if (this.device !== 'desktop') return;

    const target = event.target as Node;

    if (this.host.contains(target)) {
      return;
    }

    // Ignore clicks on the trigger or its contents to prevent running hide() twice
    if (this.megadropdownTrigger.contains(target)) {
      return;
    }

    if (target instanceof HTMLElement) {
      const trigger = target.closest('post-megadropdown-trigger');

      if (trigger) {
        const targetDropdownId = trigger.getAttribute('for');

        if (targetDropdownId !== this.host.id) {
          return;
        }
      }
    }
    await this.hide(false);
  };

  private addListeners() {
    this.host.addEventListener('keydown', this.onKeydown);
    document.addEventListener('keyup', this.onKeyup);
    document.addEventListener('mousedown', this.onMousedown);
  }

  private removeListeners() {
    this.host.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('keyup', this.onKeyup);
    document.removeEventListener('mousedown', this.onMousedown);
  }

  private cancelAllAnimations() {
    this.currentAnimation?.cancel();
    this.animatedContainer?.getAnimations().forEach(a => a.cancel());
    this.currentAnimation = null;
  }

  private getFocusableElements() {
    const focusableEls = Array.from(this.host.querySelectorAll('post-list-item, h3, .back-button'));
    const focusableChildren = focusableEls.flatMap(el => Array.from(getFocusableChildren(el)));

    // Check for an overview link
    const overviewLink = this.host.querySelector<HTMLAnchorElement>(
      'a[slot="megadropdown-overview-link"]',
    );

    if (overviewLink) {
      focusableChildren.unshift(overviewLink);
    }

    this.firstFocusableEl = focusableChildren[0];
    this.lastFocusableEl = focusableChildren[focusableChildren.length - 1];
  }

  // Loop through the focusable children
  private keyboardHandler(e: KeyboardEvent) {
    if (e.key === 'Tab' && this.device !== 'desktop') {
      if (e.shiftKey && document.activeElement === this.firstFocusableEl) {
        // If back tab (TAB + Shift) and first element is focused, focus goes to the last element of the megadropdown
        e.preventDefault();
        this.lastFocusableEl.focus();
      } else if (!e.shiftKey && document.activeElement === this.lastFocusableEl) {
        // If TAB and last element is focused, focus goes back to the first element of the megadropdown
        e.preventDefault();
        this.firstFocusableEl.focus();
      }
    }
  }

  private handleTabOutside(e: KeyboardEvent) {
    if (e.key === 'Tab' && this.device === 'desktop') {
      if (this.isVisible && !this.host.contains(e.target as Node)) {
        this.hide(false);
      }
    }
  }

  /**
   * Sets up a MutationObserver on the host to watch for changes
   * in `aria-current` attributes.
   */
  private setupObserver() {
    const config: MutationObserverInit = {
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-current'],
    };

    this.defaultSlotObserver = new MutationObserver(this.handleAriaCurrentChange.bind(this));
    this.defaultSlotObserver.observe(this.host, config);
  }

  /**
   * Adds or removes the 'active' class on the megadropdown trigger button
   * based on the active state.
   *
   * @param isActive - Whether the trigger should appear active
   */
  private setTriggerActive(isActive: boolean) {
    const trigger = this.megadropdownTrigger;
    if (!trigger) return;

    if (isActive) {
      trigger.classList.add('active');
    } else {
      trigger.classList.remove('active');
    }
  }

  /**
   * Updates the megadropdown trigger state when the megadropdown content changes.
   * Checks if any element inside the megadropdown has `aria-current="page"`
   * and sets the trigger as active accordingly.
   */
  private handleAriaCurrentChange(mutations: MutationRecord[]) {
    if (!mutations.length) return;
    const hasCurrentPage = mutations.some(
      m => m.target instanceof HTMLElement && m.target.getAttribute('aria-current') === 'page',
    );
    this.setTriggerActive(hasCurrentPage);
  }

  /**
   * Checks on initialization if any element inside the megadropdown
   * has `aria-current="page"` and sets the trigger as active if so.
   */
  private checkInitialAriaCurrent() {
    const hasCurrentPage = this.host.querySelector('[aria-current="page"]');
    if (hasCurrentPage) this.setTriggerActive(true);
  }

  render() {
    const containerStyle = this.isVisible ? {} : { display: 'none' };

    return (
      <Host version={version}>
        <div
          ref={el => (this.animatedContainer = el)}
          class="megadropdown-container"
          style={containerStyle}
        >
          <div class="megadropdown">
            <slot name="megadropdown-title"></slot>
            <slot name="megadropdown-overview-link"></slot>
            <div class="megadropdown-content">
              <slot></slot>
            </div>
            <div onClick={() => this.hide(true)} class="back-button">
              <slot name="back-button"></slot>
            </div>
            <div onClick={() => this.hide(true)} class="close-button">
              <slot name="close-button"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
