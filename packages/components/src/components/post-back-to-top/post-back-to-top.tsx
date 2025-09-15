import { Component, Element, Host, State, h, Watch, Prop } from '@stencil/core';
import { slideUpAndFadeOut, slideDownAndFadeIn } from '@/animations/slide-and-fade';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';

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
  @Prop({ reflect: true }) label!: string;

  @State() belowFold: boolean = false;

  private translateY: string;

  private isBelowFold(): boolean {
    return window.scrollY > window.innerHeight;
  }

  private readonly handleScroll = () => {
    this.belowFold = this.isBelowFold();
  };

  @Watch('label')
  validateLabel() {
    checkRequiredAndType(this, 'label', 'string');
  }

  /*Watch for changes in belowFold to show/hide the back to top button*/
  @Watch('belowFold')
  watchBelowFold(newValue: boolean) {
    if (newValue) {
      slideDownAndFadeIn(this.host, this.translateY);
    } else {
      slideUpAndFadeOut(this.host, this.translateY);
    }
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private getSecondPixelValue(parts: string[]) {
    for (const part of parts) {
      const pixelValues = part.match(/\b\d+px\b/g);

      if (pixelValues && pixelValues.length > 1) {
        return pixelValues[1];
      }
    }
  }

  private animateButton() {
    // Get the back-to-top button top postiion
    const positionTop = window.getComputedStyle(this.host).getPropertyValue('top');

    const buttonElement = this.host.shadowRoot.querySelector('button');

    // Extract the elevation height from the back-to-top button elevation token
    const elevation = getComputedStyle(buttonElement).getPropertyValue(
      '--post-back-to-top-elevation',
    );
    const elevationParts = elevation.split(',');

    const elevationHeight = this.getSecondPixelValue(elevationParts);

    // The translateY is calculated as => -100% (btt button height) - topPosition - elevationHeight
    this.translateY =
      String(
        (-1 * 100) / 100 -
          parseFloat(positionTop.replace('px', '')) -
          parseFloat(elevationHeight.replace('px', '')),
      ) + 'px';

    if (this.belowFold) {
      slideDownAndFadeIn(this.host, this.translateY);
    }

    if (!this.belowFold) {
      this.host.style.transform = `translateY(${this.translateY})`;
    }
  }

  // Set the initial state
  componentWillLoad() {
    this.belowFold = this.isBelowFold();
  }

  componentDidLoad() {
    window.addEventListener('scroll', this.handleScroll, false);

    this.animateButton();

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
          <post-icon aria-hidden="true" name="arrowup"></post-icon>
          <span class="visually-hidden">{this.label}</span>
        </button>
      </Host>
    );
  }
}
