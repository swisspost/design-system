import { Component, Element, h, Method, Prop, State } from '@stencil/core';
import { getElementHeight, onTransitionEnd } from '../../utils';

let nextId = 0;

@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed?: boolean = false;

  /**
   * Defines the hierarchical level of the collapsible header within the headings structure.
   */
  @Prop() headingLevel?: number = 2;

  @State() collapseClasses: string;
  @State() collapseHeight: string | null = null;

  @Element() host: HTMLElement;

  hasHeader: boolean;
  headingTag: string | undefined;
  collapsibleId: string;
  collapsibleElement: HTMLElement;

  componentWillLoad() {
    this.hasHeader = this.host.querySelectorAll('[slot="header"]').length > 0;
    if (!this.hasHeader) {
      console.warn('Be sure to bind the post-collapsible to its control using aria-controls and aria-expanded attributes. More information here: https://getbootstrap.com/docs/5.2/components/collapse/#accessibility');
    }

    this.headingTag = `h${this.headingLevel}`;
    if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.headingTag)) {
      console.error('The post-collapsible element requires a heading level between 1 and 6.');
    }

    this.collapsibleId = this.host.id || `post-collapsible-${nextId++}`;
    this.collapseClasses = this.collapsed ? 'collapse' : 'collapse show';
  }

  componentDidLoad() {
    this.collapsibleElement = this.host.shadowRoot.querySelector(`#${this.collapsibleId}--collapse`);
  }

  /**
   * Triggers the collapse programmatically.
   */
  @Method()
  async toggle(open: boolean = this.collapsed) {
    if (open === this.collapsed) {
      this.collapsed = !open;

      this.startTransition();

      await onTransitionEnd(this.collapsibleElement).then(() => {
        this.collapseHeight = null;
        this.collapseClasses = this.collapsed ? 'collapse' : 'collapse show';
      });
    }
  }

  startTransition() {
    const expandedHeight = getElementHeight(this.collapsibleElement, 'show');

    this.collapseHeight = `${this.collapsed ? expandedHeight : 0}px`;
    this.collapseClasses = 'collapsing';

    setTimeout(() => {
      this.collapseHeight = `${this.collapsed ? 0 : expandedHeight}px`;
    });
  }

  render() {
    if (!this.hasHeader) {
      return (
        <div
          id={`${this.collapsibleId}--collapse`}
          class={this.collapseClasses}
          style={{ height: this.collapseHeight }}
        >
          <slot/>
        </div>
      );
    }

    return (
      <div class="accordion-item">
        <this.headingTag class="accordion-header" id={`${this.collapsibleId}--header`}>
          <button
            class={`accordion-button ${this.collapsed ? 'collapsed' : ''}`}
            type="button"
            aria-expanded={`${!this.collapsed}`}
            aria-controls={`${this.collapsibleId}--collapse`}
            onClick={() => this.toggle()}
          >
            <slot name="header"/>
          </button>
        </this.headingTag>
        <div
          id={`${this.collapsibleId}--collapse`}
          class={`accordion-collapse ${this.collapseClasses}`}
          style={{ height: this.collapseHeight }}
          aria-labelledby={`${this.collapsibleId}--header`}
        >
          <div class="accordion-body">
            <slot/>
          </div>
        </div>
      </div>
    );
  }
}
