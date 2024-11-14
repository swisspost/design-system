import { Component, Element, Host, State, h, Prop, Watch } from '@stencil/core';
import { showUp, hideDown } from '@/animations/back-to-top';

// Token for different translate values depending on the breakpoint
const tokens = {
  translateY: '8rem',
};

@Component({
  tag: 'post-back-to-top',
  styleUrl: 'post-back-to-top.scss',
  shadow: true,
})
export class PostBackToTop {
  @Element() el: HTMLElement;

  @Prop() threshold: number = 80;

  @State() belowFold: boolean = false;

  getScrollPositionPercentage(): number {
    return (window.pageYOffset / window.innerHeight) * 100;
  }

  calcIfIsBelowFold(): boolean {
    return this.getScrollPositionPercentage() > this.threshold;
  }

  handleScroll = () => {
    this.belowFold = this.calcIfIsBelowFold();
  };

  // Watch for changes in belowFold
  @Watch('belowFold')
  watchBelowFold(newValue: boolean) {
    if (newValue) {
      showUp(this.el, tokens.translateY);
    } else {
      hideDown(this.el, tokens.translateY);
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
    this.belowFold = this.calcIfIsBelowFold();
    if (!this.belowFold) {
      this.el.style.transform = `translateY(${tokens.translateY})`;
    }
  }

  componentDidLoad() {
    window.addEventListener('scroll', this.handleScroll, false);
    // Trigger the animation on initial load
    if (this.belowFold) {
      showUp(this.el, tokens.translateY);
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
          <span class="visually-hidden">Back To Top Button</span>
        </button>
      </Host>
    );
  }
}
