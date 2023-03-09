import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { checkEmptyOrType, checkExists, getChildIndex } from '../../utils';

@Component({
  tag: 'post-tab-header',
  styleUrl: 'post-tab-header.scss',
  shadow: true,
})
export class PostTabHeader {
  private isLoaded = false;

  @Element() host: HTMLPostTabHeaderElement;

  @State() isActive: boolean;
  @State() tabIndex: number;

  @State() tabGroup: HTMLPostTabsElement;

  @Watch('tabGroup')
  validateTabGroup(newValue: HTMLPostTabsElement | undefined) {
    checkExists(newValue, 'The post-tab-header should be contained in a post-tabs element.');
  }

  /**
   * If `true`, the header is active and its corresponding panel is visible
   */
  @Prop() readonly active: boolean;

  @Watch('active')
  validateActive(newValue = this.active) {
    checkEmptyOrType(newValue, 'boolean', 'The post-tab-header "active" prop should be a boolean.');

    if (newValue) {
      this.activate();
    } else {
      this.deactivate();
    }
  }

  /**
   * An event emitted whenever the tab header becomes active. It has no payload.
   */
  @Event() activated: EventEmitter<void>;

  /**
   * An event emitted whenever the tab header becomes inactive. It has no payload.
   */
  @Event() deactivated: EventEmitter<void>;

  componentWillLoad() {
    this.validateActive();

    this.tabIndex = getChildIndex(this.host, 'post-tab-header');
    this.tabGroup = this.host.closest('post-tabs');
  }

  componentDidLoad() {
    this.isLoaded = true;
  }

  /**
   * Activates the tab programmatically.
   */
  @Method()
  async activate() {
    this.isActive = true;
    if (this.isLoaded) {
      this.activated.emit();
    }
  }

  /**
   * Deactivates the tab programmatically.
   */
  @Method()
  async deactivate() {
    this.isActive = false;
    if (this.isLoaded) {
      this.deactivated.emit();
    }
  }

  private onTabClick(e: MouseEvent) {
    e.preventDefault();
    if (!this.isActive) {
      this.activate();
    }
  }

  render() {
    return (
      <li class="nav-item">
        <a
          aria-controls={`${this.tabGroup.id}--panel-${this.tabIndex}`}
          aria-selected={`${this.isActive}`}
          class={`tab-title nav-link ${this.isActive ? 'active' : ''}`}
          href=""
          id={`${this.tabGroup.id}--tab-${this.tabIndex}`}
          onClick={this.onTabClick}
          role="tab"
        >
          <slot/>
        </a>
      </li>
    );
  }
}
