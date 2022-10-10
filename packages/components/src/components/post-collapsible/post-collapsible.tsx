import { Component, Element, h, Method, Prop, State } from '@stencil/core';

let nextId = 0;

@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  @Element() hostElement: HTMLElement;
  hasHeaderSlot: boolean;
  collapseId: string;

  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed = false;

  @State() collapseHeight: string;
  @State() collapseClasses = 'collapse show';

  get hasReducedMotion(): boolean {
    return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  }

  componentDidLoad() {
    this.hasHeaderSlot = !!this.hostElement.querySelector('[slot="header"]');
    this.collapseId = this.hostElement.id || `post-collapsible-${nextId++}`;

    if (!this.hasHeaderSlot && !this.hostElement.id) {
      console.warn(
        'Be sure to add an id to the post-collapsible and bind it to its control using the aria-controls attribute. ' +
        'You should also add an aria-expanded attribute to the control element. ' +
        'More information here: https://getbootstrap.com/docs/5.2/components/collapse/#accessibility'
      );
    }

    this.toggleCollapse(false);
  }

  /**
   * Triggers the collapse programmatically.
   */
  @Method() async toggle(open: boolean = this.collapsed) {
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
    if (!this.hasHeaderSlot) {
      return (
        <div
          id={`${this.collapseId}--collapse`}
          class={this.collapseClasses}
          style={{ height: this.collapseHeight }}
        >
          <slot />
        </div>
      );
    }
    return (

      <div class="accordion-item">
        <h2 class="accordion-header" id={`${this.collapseId}--header`}>
          <button
            class={`accordion-button ${this.collapsed ? 'collapsed' : ''}`}
            type="button"
            aria-expanded={`${!this.collapsed}`}
            aria-controls={`${this.collapseId}--collapse`}
            onClick={() => this.toggle()}
          >
            <slot name="header"/>
          </button>
        </h2>
        <div
          id={`${this.collapseId}--collapse`}
          class={`accordion-collapse ${this.collapseClasses}`}
          style={{ height: this.collapseHeight }}
          aria-labelledby={`${this.collapseId}--header`}
        >
          <div class="accordion-body">
            <slot name="body"/>
          </div>
        </div>
      </div>
    );
  }
}
