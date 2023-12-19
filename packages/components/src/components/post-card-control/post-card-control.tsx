import { AttachInternals, Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { checkOneOf } from '../../utils';
import { version } from '../../../package.json';

/**
 * @class PostCardControl - representing a stencil component
 */
@Component({
  tag: 'post-card-control',
  styleUrl: 'post-card-control.scss',
  shadow: true,
  formAssociated: true,
})
export class PostCardControl {
  private readonly GROUPEVENT: string;

  private readonly KEYCODES = {
    SPACE: 'Space',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
  };

  private group = {
    members: [],
    first: null,
    last: null,
    checked: null,
    focusable: null,
  };

  private control: HTMLInputElement;

  @Element() host: HTMLPostCardControlElement;

  /**
   * Defines the text in the control-label.
   */
  @Prop() readonly label!: string;

  /**
   * Defines the description in the control-label.
   */
  @Prop() readonly description?: string;

  /**
   * Defines the `id` attribute of the control.
   */
  @Prop() readonly controlId!: string;

  /**
   * Defines the `type` attribute of the control.
   */
  @Prop() readonly type: string = 'checkbox';

  /**
   * Defines the `form` attribute of the control.
   */
  @Prop() readonly form?: string;

  /**
   * Defines the `name` attribute of the control.
   */
  @Prop() readonly name?: string;

  /**
   * Defines the `value` attribute of the control.
   */
  @Prop() readonly value?: string;

  /**
   * Defines the `checked` attribute of the control.
   */
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;

  /**
   * Defines the `required` attribute of the control.
   */
  @Prop() readonly required?: boolean = false;

  /**
   * Defines the `disabled` attribute of the control.
   */
  @Prop() readonly disabled?: boolean = false;

  /**
   * Defines the validation `state` of the control.
   */
  @Prop() readonly state: boolean = null;

  /**
   * Defines the icon `name` inside of the card.
   * If not set the icon will not show up.
   */
  @Prop() readonly icon?: string;

  @State() focused = false;

  @AttachInternals() private internals: ElementInternals;

  constructor() {
    this.GROUPEVENT = `PostCardControlGroup:${this.name}:change`;

    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.controlClickHandler = this.controlClickHandler.bind(this);
    this.controlChangeHandler = this.controlChangeHandler.bind(this);
    this.controlFocusHandler = this.controlFocusHandler.bind(this);
    this.controlKeyDownHandler = this.controlKeyDownHandler.bind(this);

    this.contentClickHandler = this.contentClickHandler.bind(this);

    this.groupEventHandler = this.groupEventHandler.bind(this);

    window.addEventListener(this.GROUPEVENT, this.groupEventHandler);
  }

  @Watch('type')
  validateControlType(type = this.type) {
    checkOneOf(
      type,
      ['checkbox', 'radio'],
      'The "post-card-control" element requires an "controlType"" of either "checkbox" (default) or "radio".',
    );
  }

  private cardClickHandler(e: Event) {
    if (e.target !== this.control) this.control.click();
  }

  private controlClickHandler(e: Event) {
    if (this.disabled) e.preventDefault();
  }

  private controlChangeHandler() {
    if (!this.disabled) {
      this.checked = this.control.checked;
      this.internals.setFormValue(this.control.value);

      if (this.group.members.length > 1 && this.control.checked) {
        this.groupSetCheckedMember(this.control);
      }
    }
  }

  private controlFocusHandler() {
    this.focused = this.host === document.activeElement;
  }

  private contentClickHandler(e: Event) {
    e.stopPropagation();
  }

  // https://googlechromelabs.github.io/howto-components/howto-radio-group/
  private controlKeyDownHandler(e: KeyboardEvent) {
    if (this.group.members.length > 0) {
      switch (e.code) {
        case this.KEYCODES.UP:
        case this.KEYCODES.LEFT:
          e.preventDefault();
          this.groupSetCheckedMember(this.groupGetPrevMember(), true);
          break;

        case this.KEYCODES.DOWN:
        case this.KEYCODES.RIGHT:
          e.preventDefault();
          this.groupSetCheckedMember(this.groupGetNextMember(), true);
          break;

        case this.KEYCODES.SPACE:
          e.preventDefault();
          this.groupSetCheckedMember(this.control, true);
          break;

        default:
          break;
      }
    }
  }

  private groupCollectMembers() {
    if (this.type === 'radio' && this.name) {
      const groupHosts = document.querySelectorAll(
        `post-card-control[type="radio"][name="${this.name}"]`,
      );

      this.group.members = Array.from(groupHosts)
        .map(m => m.shadowRoot.querySelector('input[type="radio"]:not([aria-disabled])'))
        .filter(m => m !== null);

      if (this.group.members.length > 0) {
        this.group.first = this.group.members[0];
        this.group.last = this.group.members[this.group.members.length - 1];
        this.group.checked = this.group.members.find(m => m.checked) ?? null;
        this.group.focusable = this.group.checked ?? this.group.first;

        if (!this.disabled) this.control.tabIndex = this.control === this.group.focusable ? 0 : -1;
      }
    }
  }

  private groupGetPrevMember() {
    const focusableIndex = this.group.members.findIndex(m => m.id === this.group.focusable.id);
    return this.group.members.find((_m, i) => i === focusableIndex - 1) ?? this.group.last;
  }

  private groupGetNextMember() {
    const focusableIndex = this.group.members.findIndex(m => m.id === this.group.focusable.id);
    return this.group.members.find((_m, i) => i === focusableIndex + 1) ?? this.group.first;
  }

  private groupSetCheckedMember(newCheckedMember: HTMLInputElement, triggeredByKeyboard?: boolean) {
    window.dispatchEvent(
      new CustomEvent(this.GROUPEVENT, {
        detail: { control: newCheckedMember, triggeredByKeyboard },
      }),
    );
  }

  private groupEventHandler(e: CustomEvent) {
    if (!this.disabled) {
      this.control.checked = this.checked = this.control == e.detail.control;

      if (this.checked && e.detail.triggeredByKeyboard) this.control.focus();
      this.groupCollectMembers();
    }
  }

  componentWillLoad() {
    this.validateControlType();
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          class={{
            'card-control': true,
            'is-checked': this.checked,
            'is-required': this.required,
            'is-disabled': this.disabled,
            'is-focused': this.focused,
            'is-valid': this.state === true,
            'is-invalid': this.state === false,
          }}
          onClick={this.cardClickHandler}
        >
          <div class="card-control--header">
            <input
              ref={el => (this.control = el as HTMLInputElement)}
              id={this.controlId}
              class="header--input form-check-input"
              type={this.type}
              form={this.form}
              name={this.name}
              value={this.value}
              checked={this.checked}
              required={this.required}
              aria-disabled={this.disabled}
              onClick={this.controlClickHandler}
              onChange={this.controlChangeHandler}
              onFocus={this.controlFocusHandler}
              onBlur={this.controlFocusHandler}
              onKeyDown={this.controlKeyDownHandler}
            />

            <label htmlFor={this.controlId} class="header--label form-check-label">
              {this.label}
              {this.description ? <div class="header--description">{this.description}</div> : null}
            </label>

            <div class="header--icon">
              <slot name="icon">{this.icon ? <post-icon name={this.icon}></post-icon> : null}</slot>
            </div>
          </div>

          <div class="card-control--content" onClick={this.contentClickHandler}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender() {
    this.groupCollectMembers();
  }

  disconnectedCallback() {
    window.removeEventListener(this.GROUPEVENT, this.groupEventHandler);
  }
}
