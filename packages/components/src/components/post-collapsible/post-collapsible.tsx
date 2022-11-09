import { Component, Element, h, Method, Prop, State } from '@stencil/core';

let nextId = 0;

@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  @Element() hostElement: HTMLElement;
  headerSlot: HTMLElement;
  collapseId: string;

  /**
   * Defines the hierarchical level of the collapsible header within the headings structure.
   */
  @Prop() headingLevel: number;

  get headingTag(): string {
    if (this.headingLevel < 1 || this.headingLevel > 6) {
      console.error('The post-collapsible element requires a heading level between 1 and 6.');
    }

    return isNaN(this.headingLevel) ? 'h2' : `h${Math.min(Math.max(this.headingLevel, 1), 6)}`;
  }

  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed = false;

  @State() collapseHeight: string;
  @State() collapseClasses = 'collapse show';

  get hasReducedMotion(): boolean {
    return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  }

  componentWillLoad() {
    this.headerSlot = this.hostElement.querySelector('[slot="header"]');
    this.collapseId = this.hostElement.id || `post-collapsible-${nextId++}`;

    if (!this.headerSlot && !this.hostElement.id) {
      console.warn('Be sure to add an id to the post-collapsible and bind it to its control using aria-controls and aria-expanded attributes. More information here: https://getbootstrap.com/docs/5.2/components/collapse/#accessibility');
    }

    this.toggleCollapse(false);
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
      const collapsibleElement = this.hostElement.shadowRoot.querySelector(`#${this.collapseId}--collapse`) as HTMLElement;

      this.runTransition(collapsibleElement);

      collapsibleElement.ontransitionend = () => {
        this.applyCollapse();
        collapsibleElement.ontransitionend = null;
      };
    }
  }

  runTransition(collapsibleElement: HTMLElement) {
    const expandedHeight = this.getExpandedHeight(collapsibleElement);

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
    if (!this.headerSlot) {
      return (
        <div
          id={`${this.collapseId}--collapse`}
          class={this.collapseClasses}
          style={{ height: this.collapseHeight }}
        >
          <slot/>
        </div>
      );
    }

    return (
      <div class="accordion-item">
        <this.headingTag class="accordion-header" id={`${this.collapseId}--header`}>
          <button
            class={`accordion-button ${this.collapsed ? 'collapsed' : ''}`}
            type="button"
            aria-expanded={`${!this.collapsed}`}
            aria-controls={`${this.collapseId}--collapse`}
            onClick={() => this.toggle()}
          >
            <slot name="header"/>
          </button>
        </this.headingTag>
        <div
          id={`${this.collapseId}--collapse`}
          class={`accordion-collapse ${this.collapseClasses}`}
          style={{ height: this.collapseHeight }}
          aria-labelledby={`${this.collapseId}--header`}
        >
          <div class="accordion-body">
            <slot/>
          </div>
        </div>
      </div>
    );
  }
}
