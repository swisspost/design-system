import { getFocusableChildren } from '@/utils/get-focusable-children';
import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { version } from '@root/package.json';
import { breakpoint, Device } from '@/utils/breakpoints';
import { fadeSlide, slide } from '@/animations';
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

  private fsAnimationOptions: Partial<AnimationOptions> = {
    translate: -10,
    duration: 350,
    easing: {
      x1: 0.8,
      y1: 0.2,
      x2: 0.8,
      y2: 0.7,
    },
    fill: 'forwards',
  };

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

  constructor() {
    this.keyboardHandler = this.keyboardHandler.bind(this);
    this.handleTabOutside = this.handleTabOutside.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

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
    window.removeEventListener('postBreakpoint:device', this.breakpointChange.bind(this));
    this.currentAnimation = null;
    if (PostMegadropdown.activeDropdown === this) PostMegadropdown.activeDropdown = null;
    this.removeListeners();
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
  async show(forceOpen?: boolean) {
    if (PostMegadropdown.activeDropdown && PostMegadropdown.activeDropdown !== this) {
      console.log(PostMegadropdown.activeDropdown);
      // Close the previously active dropdown without animation
      PostMegadropdown.activeDropdown.forceClose();
    }
    console.log(PostMegadropdown.activeDropdown);

    if (forceOpen) {
      console.log('force open');
      this.forceOpen();
      return;
    }

    this.cancelAnimation();

    // First set the megadropdown to be visible and emit state to the trigger
    this.isVisible = true;
    PostMegadropdown.activeDropdown = this;
    this.postToggleMegadropdown.emit({ isVisible: true });
    this.currentAnimation = this.createAnimation('in');

    try {
      await this.currentAnimation.finished;

      // After the megadropdown becomes visible
      this.currentAnimation = null;
      this.addListeners();

      if (
        this.firstFocusableEl &&
        window.getComputedStyle(this.firstFocusableEl).display !== 'none'
      ) {
        this.firstFocusableEl.focus();
      }
    } catch {
      // Open animation was cancelled - reset state
      this.currentAnimation = null;
      this.removeListeners();
      this.isVisible = false;
      if (PostMegadropdown.activeDropdown === this) PostMegadropdown.activeDropdown = null;
      this.postToggleMegadropdown.emit({ isVisible: false, focusParent: true });
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
    this.cancelAnimation();

    this.currentAnimation = this.createAnimation('out');

    try {
      await this.currentAnimation.finished;
      // After the megadropdown container is hidden
      this.isVisible = false;
      this.postToggleMegadropdown.emit({ isVisible: false, focusParent: focusParent });
      this.currentAnimation = null;
      this.removeListeners();
      if (PostMegadropdown.activeDropdown === this) PostMegadropdown.activeDropdown = null;
    } catch {
      // Closing animation was cancelled - reset state
      this.currentAnimation = null;
      PostMegadropdown.activeDropdown = this;
      this.addListeners();
      this.isVisible = true;
      this.postToggleMegadropdown.emit({ isVisible: true, focusParent: false });
    }
  }

  /**
   * Sets focus to the first focusable element within the component.
   */
  @Method()
  async focusFirst() {
    this.firstFocusableEl?.focus();
  }

  /**
   * Forces the dropdown to open without animation.
   */
  private forceOpen() {
    this.cancelAnimation();
    this.isVisible = true;
    this.currentAnimation = null;
    PostMegadropdown.activeDropdown = this;
    this.addListeners();
    this.postToggleMegadropdown.emit({ isVisible: true, focusParent: false });
  }

  /**
   * Forces the dropdown to close without animation.
   */
  private forceClose() {
    this.cancelAnimation();
    if (PostMegadropdown.activeDropdown === this) PostMegadropdown.activeDropdown = null;
    this.removeListeners();
    this.isVisible = false;
    this.postToggleMegadropdown.emit({ isVisible: false, focusParent: false });
  }

  // Run the respective animation
  private createAnimation(direction: 'in' | 'out'): Animation {
    if (this.device === 'desktop') {
      return fadeSlide(this.animatedContainer, direction, this.fsAnimationOptions);
    }

    return slide(this.animatedContainer, direction, {
      translate: 100,
      duration: 350,
      easing: direction === 'in' ? 'ease-in' : 'ease-out',
    });
  }

  private cancelAnimation() {
    this.currentAnimation?.cancel();
    this.currentAnimation = null;
  }

  private breakpointChange(e: CustomEvent) {
    this.device = e.detail;
    this.cancelAnimation();
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
    this.host.addEventListener('keydown', this.keyboardHandler);
    document.addEventListener('keyup', this.handleTabOutside);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  private removeListeners() {
    this.host.removeEventListener('keydown', this.keyboardHandler);
    document.removeEventListener('keyup', this.handleTabOutside);
    document.removeEventListener('mousedown', this.handleClickOutside);
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
