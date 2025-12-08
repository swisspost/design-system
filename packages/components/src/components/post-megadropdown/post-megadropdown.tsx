import { getFocusableChildren } from '@/utils/get-focusable-children';
import {
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
import { version } from '@root/package.json';
import { breakpoint, Device } from '@/utils/breakpoints';
import { checkRequiredAndType } from '@/utils';

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

  /**
   * A label for the back button visible on tablet and mobile
   */
  @Prop({ reflect: true }) backLabel!: string;

  @Watch('backLabel')
  validateBackLabel() {
    checkRequiredAndType(this, 'backLabel', 'string');
  }
  /**
   * An accessible label for the close button visible on desktop
   */
  @Prop({ reflect: true }) closeLabel!: string;

  @Watch('closeLabel')
  validateCloseLabel() {
    checkRequiredAndType(this, 'closeLabel', 'string');
  }

  @Element() host: HTMLPostMegadropdownElement;

  @State() device: Device = breakpoint.get('device');

  /**
   * Holds the current visibility state of the dropdown.
   * This state is internally managed to track whether the dropdown is open (`true`) or closed (`false`),
   * and updates automatically when the dropdown is toggled.
   */
  @State() isVisible: boolean = false;

  @State() trigger: boolean = false;

  /** Holds the current animation class. */
  @State() animationClass: string | null = null;

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
    this.validateBackLabel();
    this.validateCloseLabel();
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
      this.hide();
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
    this.animationClass = 'slide-in';

    this.isVisible = true;
    PostMegadropdown.activeDropdown = this;
    this.postToggleMegadropdown.emit({ isVisible: this.isVisible });
    if (
      this.firstFocusableEl &&
      window.getComputedStyle(this.firstFocusableEl).display !== 'none'
    ) {
      this.firstFocusableEl.focus();
    }
    this.addListeners();
  }

  /**
   * Hides the dropdown with an animation.
   */
  @Method()
  async hide(focusParent = true, forceClose = false) {
    this.postToggleMegadropdown.emit({ isVisible: false, focusParent: focusParent });
    if (forceClose) {
      this.forceClose();
    } else {
      this.animationClass = 'slide-out';
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
      this.animationClass = null;
    }
  }
  /**
   * Forces the dropdown to close without animation.
   */
  private forceClose() {
    this.isVisible = false;
    this.animationClass = null;
    this.postToggleMegadropdown.emit({ isVisible: this.isVisible, focusParent: false });
    this.removeListeners();
  }

  private handleAnimationEnd() {
    if (this.animationClass === 'slide-out') {
      this.isVisible = false;
      this.animationClass = null;
      PostMegadropdown.activeDropdown = null;
      this.removeListeners();
    }
  }

  private readonly handleClickOutside = (event: MouseEvent) => {
    if (this.device !== 'desktop') return;

    const target = event.target as Node;

    if (this.host.contains(target)) {
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

    this.hide(false);
  };

  private addListeners() {
    this.host.addEventListener('keydown', e => this.keyboardHandler(e));
    document.addEventListener('keyup', e => this.handleTabOutside(e));
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  private removeListeners() {
    this.host.removeEventListener('keydown', e => this.keyboardHandler(e));
    document.removeEventListener('keyup', e => this.handleTabOutside(e));
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

    const triggerLabel = this.megadropdownTrigger.querySelector('.nav-el-active');

    const backButton = (
      <button onClick={() => this.hide(true)} class="back-button btn btn-tertiary px-0 btn-sm">
        <post-icon name="arrowleft"></post-icon>
        {this.backLabel}
      </button>
    );

    const closeButton = (
      <post-closebutton onClick={() => this.hide(true)} class="close-button">
        {this.closeLabel}
      </post-closebutton>
    );

    return (
      <Host version={version}>
        <div
          class={`megadropdown-container ${this.animationClass || ''}`}
          style={containerStyle}
          onAnimationEnd={() => this.handleAnimationEnd()}
        >
          <div class="megadropdown">
            <div class="megadropdown-content">
              {triggerLabel && <p class="megadropdown-title">{triggerLabel.innerHTML}</p>}
              <slot></slot>
            </div>

            {this.device === 'desktop' ? closeButton : backButton}
          </div>
        </div>
      </Host>
    );
  }
}
