import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '../../../package.json';
import { collapse, expand } from '../../animations/collapse';
import { checkEmptyOrOneOf, checkEmptyOrType, isMotionReduced } from '../../utils';
import { HEADING_LEVELS, HeadingLevel } from './heading-levels';

@Component({
  tag: 'post-collapsible',
  styleUrl: 'post-collapsible.scss',
  shadow: true,
})
export class PostCollapsible {
  private isLoaded = false;
  private collapsible: HTMLElement;

  @Element() host: HTMLPostCollapsibleElement;

  @State() id: string;
  @State() isOpen = true;
  @State() hasHeader: boolean;
  @State() headingTag: string;

  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop() readonly collapsed?: boolean = false;

  @Watch('collapsed')
  validateCollapsed(newValue = this.collapsed) {
    checkEmptyOrType(newValue, 'boolean', 'The `collapsed` property of the `post-collapsible` must be a boolean.');
  }

  /**
   * Defines the hierarchical level of the collapsible header within the headings structure.
   */
  @Prop() readonly headingLevel?: HeadingLevel = 2;

  @Watch('headingLevel')
  validateHeadingLevel(newValue = this.headingLevel) {
    checkEmptyOrOneOf(newValue, HEADING_LEVELS, 'The `headingLevel` property of the `post-collapsible` must be a number between 1 and 6.');
  }

  /**
   * An event emitted when the collapse element is shown or hidden, before the transition. It has no payload.
   */
  @Event() collapseChange: EventEmitter<void>;

  connectedCallback() {
    this.validateCollapsed();
    this.validateHeadingLevel();
  }

  componentWillRender() {
    this.id = this.host.id || `c${crypto.randomUUID()}`;
    this.hasHeader = this.host.querySelectorAll('[slot="header"]').length > 0;
    this.headingTag = `h${this.headingLevel ?? 2}`;
  }

  componentDidLoad() {
    if (this.collapsed) void this.toggle(false);
    this.isLoaded = true;
  }

  /**
   * Triggers the collapse programmatically.
   *
   * If there is a collapsing transition running already, it will be reversed.
   */
  @Method()
  async toggle(open = !this.isOpen): Promise<boolean> {
    if (open === this.isOpen) return open;

    this.isOpen = !this.isOpen;
    if (this.isLoaded) this.collapseChange.emit();

    const animation = open ? expand(this.collapsible): collapse(this.collapsible);

    if (!this.isLoaded || isMotionReduced()) animation.finish();

    await animation.finished;

    animation.commitStyles();

    return this.isOpen;
  }

  render() {
    const collapse = (
      <div
        aria-labelledby={this.hasHeader ? `${this.id}--header` : undefined}
        class={`collapse${this.hasHeader ? ' accordion-collapse' : ''}`}
        id={`${this.id}--collapse`}
        ref={el => this.collapsible = el}
      >
        {this.hasHeader ? (
          <div class="accordion-body">
            <slot/>
          </div>
        ) : (
          <slot/>
        )}
      </div>
    );

    return (
      <Host id={this.id} data-version={version}>
        {this.hasHeader ? (
          <div class="accordion-item">
            <this.headingTag class="accordion-header" id={`${this.id}--header`}>
              <button
                aria-controls={`${this.id}--collapse`}
                aria-expanded={`${this.isOpen}`}
                class={`accordion-button${this.isOpen ? '' : ' collapsed'}`}
                onClick={() => this.toggle()}
                type="button"
              >
                <slot name="header"/>
              </button>
            </this.headingTag>

            {collapse}
          </div>
        ) : collapse}
      </Host>
    );
  }
}
