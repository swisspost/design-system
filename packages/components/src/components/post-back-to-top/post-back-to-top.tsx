import { Component, Element, Host, State, h, Watch, Prop } from '@stencil/core';
import { slideUp, slideDown } from '@/animations/slide';
import { version } from '@root/package.json';
import { checkType, checkNonEmpty } from '@/utils';

@Component({
  tag: 'post-back-to-top',
  styleUrl: 'post-back-to-top.scss',
  shadow: true,
})
export class PostBackToTop {
  @Element() el: HTMLPostBackToTopElement;

  /**
   * The label of the back-to-top button, intended solely for accessibility purposes.
   * This label is always hidden from view.
   **/
  @Prop() label!: string;

  @State() belowFold: boolean = false;

  private translateY: string;

  private isBelowFold(): boolean {
    return window.scrollY > window.innerHeight;
  }

  private handleScroll = () => {
    this.belowFold = this.isBelowFold();
  };

  // Watch for changes in belowFold
  @Watch('belowFold')
  watchBelowFold(newValue: boolean) {
    if (newValue) {
      slideUp(this.el, this.translateY);
    } else {
      slideDown(this.el, this.translateY);
    }
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  // Validate the label
  @Watch('label')
  validateLabel() {
    checkType(this, 'label', 'string');
    checkNonEmpty(this, 'label');
  }

  // Set the initial state
  componentWillLoad() {
    this.belowFold = this.isBelowFold();
  }

  componentDidLoad() {
    window.addEventListener('scroll', this.handleScroll, false);

    this.translateY = window
      .getComputedStyle(this.el)
      .getPropertyValue('--post-floating-button-translate-y');

    if (!this.belowFold) {
      this.el.style.transform = `translateY(${this.translateY})`;
    }

    // Initial load
    if (this.belowFold) {
      slideUp(this.el, this.translateY);
    }

    this.validateLabel();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Host data-version={version}>
        <button
          class="back-to-top"
          aria-hidden={this.belowFold ? 'false' : 'true'}
          tabindex={this.belowFold ? '0' : '-1'}
          onClick={this.scrollToTop}
        >
          <post-icon aria-hidden="true" name="3026"></post-icon>
          <span class="visually-hidden">{this.label}</span>
        </button>
      </Host>
    );
  }
}
