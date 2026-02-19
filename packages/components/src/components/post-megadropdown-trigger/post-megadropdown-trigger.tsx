import { Component, Element, Prop, h, Host, Watch, State, Build, Listen } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, EventFrom } from '@/utils';

@Component({
  tag: 'post-megadropdown-trigger',
  styleUrl: 'post-megadropdown-trigger.scss',
  shadow: true,
})
export class PostMegadropdownTrigger {
  @Element() host: HTMLPostMegadropdownTriggerElement;

  private mutationObserver: MutationObserver;
  private interactiveButton: HTMLButtonElement;

  @State() private isMegadropdownExpanded: boolean = false;
  @State() private slottedContent: string = null;

  /**
   * Sets the trigger state to be active or inactive.
   */
  @Prop({ reflect: true }) active: boolean = false;

  /**
   * ID of the mega dropdown element that this trigger is linked to. Used to open and close the specified mega dropdown.
   */
  @Prop({ reflect: true }) for!: string;

  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  componentWillRender() {
    this.handleSlottedContentChanges();
  }

  componentDidLoad() {
    this.validateFor();
  }

  disconnectedCallback() {
    if (this.mutationObserver) this.mutationObserver.disconnect();
  }

  @Listen('postToggleMegadropdown', { target: 'document' })
  @EventFrom('post-megadropdown', { ignoreNestedComponents: false })
  onMegadropdownToggled(event: CustomEvent<{ isVisible: boolean; focusParent: boolean }>) {
    if ((event.target as HTMLPostMegadropdownElement).id === this.for) {
      const wasMegadropdownExpanded = this.isMegadropdownExpanded;
      this.isMegadropdownExpanded = event.detail.isVisible;

      const haveBeenClosed = wasMegadropdownExpanded && !this.isMegadropdownExpanded;
      if (!haveBeenClosed || !event.detail.focusParent) return;

      // Focus on the trigger parent of the dropdown after it's closed if the close button had been clicked
      setTimeout(() => {
        this.interactiveButton.focus();
      }, 100);
    }
  }

  private get megadropdown(): HTMLPostMegadropdownElement | null {
    const ref = document.getElementById(this.for);

    if (ref?.localName !== 'post-megadropdown') {
      console.warn(`No post-megadropdown found with ID: ${this.for}`);
      return null;
    }

    return ref as HTMLPostMegadropdownElement;
  }

  private handleSlottedContentChanges() {
    if (Build.isServer) return;

    this.cloneSlottedButton();

    this.mutationObserver = new MutationObserver(this.cloneSlottedButton.bind(this));
    this.mutationObserver.observe(this.host, { childList: true, subtree: true });
  }

  private cloneSlottedButton() {
    this.slottedContent = this.host.innerHTML;
  }

  private onClick() {
    this.megadropdown?.toggle();
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const megadropdown = this.megadropdown;
    if (!megadropdown) return;

    event.preventDefault();
    this.megadropdown.toggle();
  }

  render() {
    return (
      <Host data-version={version}>
        <button
          ref={el => (this.interactiveButton = el)}
          type="button"
          aria-haspopup="menu"
          aria-expanded={this.isMegadropdownExpanded.toString()}
          onClick={this.onClick.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          class={{ active: this.active }}
        >
          <span>
            <span innerHTML={this.slottedContent}></span>
            <span aria-hidden="true">
              <slot></slot>
            </span>
          </span>
          <post-icon name="chevrondown"></post-icon>
        </button>
      </Host>
    );
  }
}
