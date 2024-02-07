import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { checkNonEmpty, checkOneOf } from '../../utils';
import { version } from '../../../package.json';

let cardControlIds = 0;

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
    hosts: [],
    members: [],
    first: null,
    last: null,
    checked: null,
    focused: null,
  };

  private INTERACTIVE_ELEMENT_SELECTORS = [
    'a',
    'audio[controls]',
    'button',
    'details',
    'embed',
    'iframe',
    'img[usemap]',
    'input:not([type="hidden"])',
    'keygen',
    'label',
    'menu[type="toolbar"]',
    'object[usemap]',
    'select',
    'textarea',
    'video[controls]',
  ];

  private control: HTMLInputElement;
  private controlId = `PostCardControl_${cardControlIds++}`;

  @Element() host: HTMLPostCardControlElement;

  @State() initialState: boolean;
  @State() focused = false;

  @AttachInternals() private internals: ElementInternals;

  /**
   * Defines the text in the control-label.
   */
  @Prop() readonly label!: string;

  /**
   * Defines the description in the control-label.
   */
  @Prop() readonly description: string = null;

  /**
   * Defines the `type` attribute of the control.
   */
  @Prop() readonly type!: 'checkbox' | 'radio';

  /**
   * Defines the `name` attribute of the control, which is submitted with the form data.
   */
  @Prop() readonly name: string = null;

  /**
   * Defines the `value` attribute of the control. This is only used, when the control participates in the native `form`.
   */
  @Prop() readonly value: string = null;

  /**
   * Defines the `checked` attribute of the control. If `true`, the control is selected.
   */
  @Prop({ reflect: true, mutable: true }) checked?: boolean = false;

  /**
   * Defines the `disabled` attribute of the control. If `true`, the user can not interact with the control.
   */
  @Prop() readonly disabled: boolean = false;

  /**
   * Defines the validation `state` of the control.<div className="alert alert-sm alert-info">Only styles for the invalid state have been defined so far.</div>
   */
  @Prop() readonly state: null | 'true' | 'false' = null;

  /**
   * Defines the icon `name` inside of the card.
   * <span className="alert alert-sm alert-info">If not set the icon will not show up.</span>
   */
  @Prop() readonly icon: string = null;

  /**
   * An event emitted whenever the control value changes.
   * The payload contains the current checked state under `event.details`.
   */
  @Event() controlChange: EventEmitter<boolean>;

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

  @Watch('label')
  validateControlLabel(label = this.label) {
    checkNonEmpty(
      label,
      'The "post-card-control" element requires its "label" property to be set.',
    );
  }

  @Watch('type')
  validateControlType(type = this.type) {
    checkOneOf(
      type,
      ['checkbox', 'radio'],
      'The "post-card-control" element requires its "type" prop to be one of either "checkbox" or "radio".',
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
        this.groupSetSelectedMember(this.control);
      }

      this.controlChange.emit(this.checked);
    }
  }

  private controlFocusHandler() {
    this.focused = this.host === document.activeElement;
  }

  private contentClickHandler(e: Event) {
    const testWrapper = document.createElement('div');
    testWrapper.append((e.target as HTMLElement).cloneNode());

    const isInteractive = this.INTERACTIVE_ELEMENT_SELECTORS.some(selector =>
      testWrapper.querySelector(selector),
    );

    if (isInteractive) e.stopPropagation();
  }

  // https://googlechromelabs.github.io/howto-components/howto-radio-group/
  private controlKeyDownHandler(e: KeyboardEvent) {
    if (this.group.members.length > 1) {
      switch (e.code) {
        case this.KEYCODES.UP:
        case this.KEYCODES.LEFT:
          e.preventDefault();
          this.groupSetSelectedMember(this.groupGetPrevMember(), true);
          break;

        case this.KEYCODES.DOWN:
        case this.KEYCODES.RIGHT:
          e.preventDefault();
          this.groupSetSelectedMember(this.groupGetNextMember(), true);
          break;

        case this.KEYCODES.SPACE:
          e.preventDefault();
          this.groupSetSelectedMember(this.control, true);
          break;

        default:
          break;
      }
    }
  }

  private groupCollectMembers() {
    if (this.type === 'radio' && this.name) {
      this.group.hosts = Array.from(
        document.querySelectorAll(`post-card-control[type="radio"][name="${this.name}"]`),
      );

      this.group.members = this.group.hosts
        .map(m => m.shadowRoot.querySelector('input[type="radio"]'))
        .filter(m => m !== null);

      if (this.group.members.length > 1) {
        this.group.first = this.group.members[0];
        this.group.last = this.group.members[this.group.members.length - 1];
        this.group.checked = this.group.members.find(m => m.checked) ?? null;
        this.group.focused =
          this.group.members.find(m => m.getRootNode().host === document.activeElement) ??
          this.group.first;

        this.groupUpdateTabIndexes();
      }
    }
  }

  private groupUpdateTabIndexes() {
    const focusableMember = this.group.checked || this.group.focused || this.group.first;

    this.group.members.forEach(m => {
      m.tabIndex = m === focusableMember ? 0 : -1;
    });
  }

  private groupGetPrevMember() {
    const focusedIndex = this.group.members.findIndex(m => m.id === this.group.focused.id);
    return this.group.members.find((_m, i) => i === focusedIndex - 1) ?? this.group.last;
  }

  private groupGetNextMember() {
    const focusedIndex = this.group.members.findIndex(m => m.id === this.group.focused.id);
    return this.group.members.find((_m, i) => i === focusedIndex + 1) ?? this.group.first;
  }

  private groupSetSelectedMember(
    newCheckedMember: HTMLInputElement,
    triggeredByKeyboard?: boolean,
  ) {
    window.dispatchEvent(
      new CustomEvent(this.GROUPEVENT, {
        detail: { control: newCheckedMember, triggeredByKeyboard },
      }),
    );
  }

  private groupEventHandler(e: CustomEvent) {
    if (e.detail.triggeredByKeyboard) e.detail.control.focus();

    if (!this.disabled) {
      this.control.checked = this.checked = this.control === e.detail.control;
      this.internals.setFormValue(this.control.value);
      this.controlChange.emit(this.checked);
    }

    this.groupCollectMembers();
  }

  connectedCallback() {
    this.initialState = this.checked;
  }

  componentWillLoad() {
    this.validateControlLabel();
    this.validateControlType();
  }

  render() {
    return (
      <Host data-version={version} onClick={this.cardClickHandler}>
        <div
          class={{
            'card-control': true,
            'is-checked': this.checked,
            'is-disabled': this.disabled,
            'is-focused': this.focused,
            'is-valid': this.state !== null && this.state !== 'false',
            'is-invalid': this.state === 'false',
          }}
        >
          <div class="card-control--header">
            <input
              ref={el => (this.control = el as HTMLInputElement)}
              id={this.controlId}
              class="header--input form-check-input"
              type={this.type}
              name={this.name}
              value={this.value}
              checked={this.checked}
              aria-disabled={this.disabled}
              aria-controls={`${this.controlId}_Content`}
              aria-expanded={(this.checked && !this.disabled).toString()}
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

          <div
            id={`${this.controlId}_Content`}
            class="card-control--content"
            onClick={this.contentClickHandler}
          >
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
