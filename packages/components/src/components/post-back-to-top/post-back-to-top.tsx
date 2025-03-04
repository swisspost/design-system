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
  @Element() host: HTMLPostBackToTopElement;

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

  private readonly handleScroll = () => {
    this.belowFold = this.isBelowFold();
  };

  // Watch for changes in belowFold to show/hide the back to top button
  @Watch('belowFold')
  watchBelowFold(newValue: boolean) {
    if (newValue) {
      slideDown(this.host, this.translateY);
    } else {
      slideUp(this.host, this.translateY);
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

    const headerHeight = window
      .getComputedStyle(this.host)
      .getPropertyValue('--post-header-height');

    this.translateY =
      String((-1 * 100) / 100 - parseFloat(headerHeight.replace('px', '')) - 32) + 'px';

    if (this.belowFold) {
      slideDown(this.host, this.translateY);
    }

    if (!this.belowFold) {
      this.host.style.transform = `translateY(${this.translateY})`;
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
