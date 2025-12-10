import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, EventFrom } from '@/utils';

@Component({
  tag: 'post-megadropdown-trigger',
  styleUrl: 'post-megadropdown-trigger.scss',
  shadow: true,
})
export class PostMegadropdownTrigger {
  @Element() host: HTMLPostMegadropdownTriggerElement;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated mega dropdown is expanded or collapsed.
   */
  private isMegadropdownExpanded: boolean = false;

  /**
   * Observes changes in the content of the megadropdown trigger
   */
  private mutationObserver = new MutationObserver(this.cloneSlottedButton.bind(this));

  /**
   * Reference to the slotted button within the trigger, if present.
   * Used to manage click and key events for mega dropdown control.
   */
  private slottedButton: HTMLButtonElement | null = null;

  /**
   * ID of the mega dropdown element that this trigger is linked to. Used to open and close the specified mega dropdown.
   */
  @Prop({ reflect: true }) for!: string;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   */
  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  constructor() {
    this.handleToggle = this.handleToggle.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onMegadropdownToggled = this.onMegadropdownToggled.bind(this);
  }

  connectedCallback() {
    this.mutationObserver.observe(this.host, { childList: true, subtree: true });
  }

  componentWillLoad() {
    this.cloneSlottedButton();
  }

  componentDidLoad() {
    this.validateFor();

    // Check if the mega dropdown attached to the trigger is expanded or not
    document.addEventListener('postToggleMegadropdown', this.onMegadropdownToggled);
  }

  disconnectedCallback() {
    document.removeEventListener('postToggleMegadropdown', this.onMegadropdownToggled);
    this.mutationObserver.disconnect();

    if (this.slottedButton) {
      this.slottedButton.removeEventListener('click', this.handleToggle);
      this.slottedButton.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  private cloneSlottedButton(mutations: MutationRecord[] = []) {
    const addedNodes = mutations.flatMap(mutation => Array.from(mutation.addedNodes));
    const wasOnlyCloneAdded =
      addedNodes.length !== 0 &&
      addedNodes.every(node => node instanceof HTMLButtonElement && node.hasAttribute('inert'));

    if (wasOnlyCloneAdded) return;

    const previousClone = this.host.querySelector('button[inert]');
    if (previousClone) {
      previousClone.remove();
    }

    const wasTriggerAdded =
      addedNodes.length === 0 ||
      addedNodes.some(node => node instanceof HTMLButtonElement && !node.hasAttribute('inert'));

    if (wasTriggerAdded) {
      if (this.host.children.length !== 1 || this.host.children[0].localName !== 'button') {
        console.warn('The post-megadropdown-trigger content must be a single button.');
        return;
      }

      this.slottedButton = this.host.children[0] as HTMLButtonElement;
      this.setInitialAttributes();
    }

    const newClone = this.slottedButton.cloneNode(true) as HTMLButtonElement;
    newClone.setAttribute('inert', '');
    this.host.append(newClone);
  }

  private setInitialAttributes() {
    this.slottedButton.setAttribute('type', 'button');
    this.slottedButton.setAttribute('aria-haspopup', 'menu');
    this.slottedButton.setAttribute('aria-expanded', 'false');
    this.slottedButton.addEventListener('click', this.handleToggle);
    this.slottedButton.addEventListener('keydown', this.handleKeyDown);
  }

  private get megadropdown(): HTMLPostMegadropdownElement | null {
    const ref = document.getElementById(this.for);
    return ref && ref.localName === 'post-megadropdown'
      ? (ref as HTMLPostMegadropdownElement)
      : null;
  }

  private handleToggle() {
    if (this.megadropdown) {
      this.megadropdown.toggle();
    } else {
      console.warn(`No post-megadropdown found with ID: ${this.for}`);
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleToggle();
      if (this.megadropdown && !this.isMegadropdownExpanded) {
        setTimeout(() => this.megadropdown.focusFirst(), 100);
      }
    }
  }

  @EventFrom('post-megadropdown', { ignoreNestedComponents: false })
  private onMegadropdownToggled(event: CustomEvent<{ isVisible: boolean; focusParent: boolean }>) {
    if ((event.target as HTMLPostMegadropdownElement).id === this.for) {
      const wasMegadropdownExpanded = this.isMegadropdownExpanded;
      this.isMegadropdownExpanded = event.detail.isVisible;

      // Focus on the trigger parent of the dropdown after it's closed if the close button had been clicked
      if (wasMegadropdownExpanded && !this.isMegadropdownExpanded && event.detail.focusParent) {
        setTimeout(() => {
          this.slottedButton?.focus();
        }, 100);
      }

      if (this.slottedButton) {
        this.slottedButton.setAttribute('aria-expanded', this.isMegadropdownExpanded.toString());
      }
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
