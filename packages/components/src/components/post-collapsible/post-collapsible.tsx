import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { checkOneOf, checkType, getElementHeight, onTransitionEnd } from '../../utils';
import { version } from '../../../package.json';

let nextId = 0;

@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  private collapsibleElement: HTMLElement;
  private isLoaded = false;

  @Element() host: HTMLPostCollapsibleElement;

  @State() collapseClasses: string;
  @State() collapseHeight: string | null = null;
  @State() collapsibleId: string;
  @State() hasHeader: boolean;
  @State() headingTag: string | undefined;
  @State() isOpen = true;
  @State() onAccordionButtonClick = () => this.toggle();

  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop() readonly collapsed?: boolean = false;

  @Watch('collapsed')
  validateCollapsed(newValue = this.collapsed) {
    checkType(newValue, 'boolean', 'The post-collapsible "collapsed" prop should be a boolean.');

    if (!this.isLoaded) {
      this.isOpen = !newValue;
      this.collapseClasses = this.getCollapseClasses();
    } else {
      setTimeout(() => {
        this.toggle(!newValue);
      });
    }
  }

  /**
   * Defines the hierarchical level of the collapsible header within the headings structure.
   */
  @Prop() readonly headingLevel?: number = 2;

  @Watch('headingLevel')
  validateHeadingLevel(newValue = this.headingLevel) {
    checkOneOf(
      newValue,
      [1, 2, 3, 4, 5, 6],
      'The post-collapsible element requires a heading level between 1 and 6.',
    );

    this.headingTag = `h${newValue}`;
  }

  componentWillLoad() {
    this.validateCollapsed();
    this.validateHeadingLevel();

    this.hasHeader = this.host.querySelectorAll('[slot="header"]').length > 0;
    if (!this.hasHeader) {
      console.warn(
        'Be sure to bind the post-collapsible to its control using aria-controls and aria-expanded attributes. More information here: https://getbootstrap.com/docs/5.2/components/collapse/#accessibility',
      );
    }

    this.collapsibleId = this.host.id || `post-collapsible-${nextId++}`;
    this.collapseClasses = this.getCollapseClasses();
  }

  componentDidLoad() {
    this.isLoaded = true;
    this.collapsibleElement = this.host.shadowRoot.querySelector(
      `#${this.collapsibleId}--collapse`,
    );
  }

  /**
   * Triggers the collapse programmatically.
   */
  @Method()
  async toggle(open = !this.isOpen): Promise<boolean> {
    if (open !== this.isOpen) {
      this.isOpen = !this.isOpen;

      this.startTransition();

      await onTransitionEnd(this.collapsibleElement).then(() => {
        this.collapseHeight = null;
        this.collapseClasses = this.getCollapseClasses();
      });

      return this.isOpen;
    }
  }

  private startTransition() {
    const expandedHeight = getElementHeight(this.collapsibleElement, 'show');

    this.collapseHeight = `${this.isOpen ? 0 : expandedHeight}px`;
    this.collapseClasses = 'collapsing';

    setTimeout(() => {
      this.collapseHeight = `${this.isOpen ? expandedHeight : 0}px`;
    }, 50);
  }

  private getCollapseClasses() {
    return this.isOpen ? 'collapse show' : 'collapse';
  }

  render() {
    if (!this.hasHeader) {
      return (
        <div
          id={`${this.collapsibleId}--collapse`}
          class={this.collapseClasses}
          style={{ height: this.collapseHeight }}
        >
          <slot />
        </div>
      );
    }

    return (
      <Host data-version={version}>
        <div class="accordion-item">
          <this.headingTag class="accordion-header" id={`${this.collapsibleId}--header`}>
            <button
              class={`accordion-button ${this.isOpen ? '' : 'collapsed'}`}
              type="button"
              aria-expanded={`${this.isOpen}`}
              aria-controls={`${this.collapsibleId}--collapse`}
              onClick={this.onAccordionButtonClick}
            >
              <slot name="header" />
            </button>
          </this.headingTag>
          <div
            id={`${this.collapsibleId}--collapse`}
            class={`accordion-collapse ${this.collapseClasses}`}
            style={{ height: this.collapseHeight }}
            aria-labelledby={`${this.collapsibleId}--header`}
          >
            <div class="accordion-body">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
