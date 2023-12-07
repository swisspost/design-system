import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { version } from '../../../package.json';
import { collapse, expand } from '../../animations/collapse';
import { checkEmptyOrType, isMotionReduced } from '../../utils';

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

  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop() readonly collapsed?: boolean = false;

  @Watch('collapsed')
  validateCollapsed(newValue = this.collapsed) {
    checkEmptyOrType(
      newValue,
      'boolean',
      'The `collapsed` property of the `post-collapsible` must be a boolean.',
    );
  }

  /**
   * An event emitted when the collapse element is shown or hidden, before the transition. It has no payload.
   */
  @Event() collapseChange: EventEmitter<void>;

  connectedCallback() {
    this.validateCollapsed();
  }

  componentWillRender() {
    this.id = this.host.id || `c${crypto.randomUUID()}`;
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

    const animation = open ? expand(this.collapsible) : collapse(this.collapsible);

    if (!this.isLoaded || isMotionReduced()) animation.finish();

    await animation.finished;

    animation.commitStyles();

    return this.isOpen;
  }

  render() {
    return (
      <Host id={this.id} data-version={version}>
        <div class="collapse" id={`${this.id}--collapse`} ref={el => (this.collapsible = el)}>
          <slot />
        </div>
      </Host>
    );
  }
}
