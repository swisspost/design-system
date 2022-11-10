import { Component, Element, h, Method, Prop, State } from '@stencil/core';

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

  @State() collapseClasses = 'collapse show';
  @State() collapseHeight: string;

  @Element() host: HTMLElement;

  hasHeader: boolean;
  collapsibleId: string;
  collapsibleElement: HTMLElement;

  get headingTag(): string {
    if (this.headingLevel < 1 || this.headingLevel > 6) {
      console.error('The post-collapsible element requires a heading level between 1 and 6.');
    }

    return isNaN(this.headingLevel) ? 'h2' : `h${Math.min(Math.max(this.headingLevel, 1), 6)}`;
  }

  get hasReducedMotion(): boolean {
    return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  }

  componentWillLoad() {
    this.hasHeader = !!this.host.querySelector('[slot="header"]');
    if (!this.hasHeader) {
      console.warn('Be sure to bind the post-collapsible to its control using aria-controls and aria-expanded attributes. More information here: https://getbootstrap.com/docs/5.2/components/collapse/#accessibility');
    }

    this.collapsibleId = this.host.id || `post-collapsible-${nextId++}`;

    this.toggleCollapse(false);
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
      this.toggleCollapse();
    }
  }

  toggleCollapse(animation = !this.hasReducedMotion) {
    if (!animation) {
      this.applyCollapse();
    } else {
      this.runTransition();

      this.collapsibleElement.ontransitionend = () => {
        this.applyCollapse();
        this.collapsibleElement.ontransitionend = null;
      };
    }
  }

  runTransition() {
    const expandedHeight = this.getExpandedHeight(this.collapsibleElement);

    this.collapseHeight = this.collapsed ? expandedHeight : '0px';
    this.collapseClasses = 'collapsing';

    setTimeout(() => {
      this.collapseHeight = this.collapsed ? '0px' : expandedHeight;
    });
  }

  getExpandedHeight(collapsibleElement: HTMLElement): string {
    const hasShowClass = collapsibleElement.classList.contains('show');

    if (!hasShowClass) {
      collapsibleElement.classList.add('show');
    }

    const scrollHeight = collapsibleElement.scrollHeight;

    if (!hasShowClass) {
      collapsibleElement.classList.remove('show');
    }

    return `${scrollHeight}px`;
  }

  applyCollapse() {
    this.collapseHeight = null;
    this.collapseClasses = this.collapsed ? 'collapse' : 'collapse show';
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
