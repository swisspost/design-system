import { Component, Element, Host, State, h, Watch, Prop } from '@stencil/core';
import { slideUp, slideDown } from '@/animations/slide';

@Component({
  tag: 'post-back-to-top',
  styleUrl: 'post-back-to-top.scss',
  shadow: true,
})
export class PostBackToTop {
  @Element() el: HTMLPostBackToTopElement;

  @State() belowFold: boolean = false;

  /**
   * Defines the back to top buttons hidden title.
   */
  @Prop() buttonTitle: string = '';

  private translateY: string = '';

  IsBelowFold(): boolean {
    return window.scrollY > window.innerHeight;
  }

  handleScroll = () => {
    this.belowFold = this.IsBelowFold();
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

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Set the initial state
  componentWillLoad() {
    this.belowFold = this.IsBelowFold();
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
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Host>
        <button
          role="button"
          class="back-to-top"
          aria-hidden={this.belowFold ? 'false' : 'true'}
          onClick={this.scrollToTop}
        >
          <post-icon aria-hidden={this.belowFold ? 'false' : 'true'} name="3026"></post-icon>
          <span class="visually-hidden">{this.buttonTitle}</span>
        </button>
      </Host>
    );
  }
}
