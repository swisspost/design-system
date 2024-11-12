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
  @Element() el: HTMLElement;

  @State() buttonId: string;

  @State() scrollPositionVH: number = null;

  handleScroll = () => {
    const scrollY = window.pageYOffset;
    this.scrollPositionVH = (scrollY / window.innerHeight) * 100;
    document.body.style.setProperty('--scroll', this.scrollPositionVH.toString());
  };

  componentWillLoad() {
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
        <button role="button" class="back-to-top">
          <post-icon aria-hidden="true" name="3026"></post-icon>
          <span id={this.buttonId} class="visually-hidden">
            Back To Top Button
          </span>
        </button>
      </Host>
    );
  }
}
