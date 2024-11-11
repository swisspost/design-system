import { Component, Element, Host, State, h } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - NOTHING YET
 */

@Component({
  tag: 'post-back-to-top',
  styleUrl: 'post-back-to-top.scss',
  shadow: true,
})
export class PostBackToTop {
  @Element() host: HTMLPostListElement;

  /**
   *
   */
  @State() buttonId: string;

  /**
   *
   */

  @State() isBelowFold: boolean = false;

  handleScroll = () => {
    // Get the current scroll position in pixels
    const scrollY = window.pageYOffset;

    // Calculate the scroll position in viewport height units (vh)
    const scrollPositionVh = (scrollY / window.innerHeight) * 100;

    // Set CSS custom property for other potential uses
    document.documentElement.style.setProperty('--scroll', scrollPositionVh.toString());
    console.log(scrollPositionVh);

    // Update state when the scroll position reaches or exceeds 80vh
    this.isBelowFold = scrollPositionVh >= 80;
    console.log(this.isBelowFold); // Logs true when past 80vh
  };

  componentWillLoad() {
    /**
     * Use a random id by default
     */
    this.buttonId = `back-to-top-${crypto.randomUUID()}`;
  }

  componentDidLoad() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    return (
      <Host data-version={version}>
        <button role="button" class={`back-to-top ${this.isBelowFold ? 'show' : ''}`}>
          <post-icon aria-hidden="true" name="3026"></post-icon>
          <span id={this.buttonId} class="visually-hidden">
            Back To Top Button
          </span>
        </button>
      </Host>
    );
  }
}
