import {
  AttachInternals,
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
import { checkNonEmpty, checkOneOf } from '../../utils';
import { version } from '../../../package.json';

let cardControlIds = 0;

// TODO: add integration for error message as soon as #2625 is implemented

/**
 * @class PostCardControl - representing a stencil component
 *
 * @slot icon - Content to place in the named `icon` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content" target="_blank">inline content</a>.<br>It is only meant for <code>img</code> or <code>svg</code> elements and overrides the `icon` property.</p>
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

  private control: HTMLInputElement;
  private controlId = `PostCardControl_${cardControlIds++}`;

  @Element() host: HTMLPostCardControlElement;

  @State() initialChecked: boolean;
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
   * Defines the `name` attribute of the control.
   * <span className="alert alert-sm alert-info">This is a required property, when the control should participate in a native `form`. If not specified, a native `form` will never contain this controls value.</span>
   * <span className="alert alert-sm alert-info">This is a required property, when the control is used with type `radio`.</span>
   */
  @Prop() readonly name: string = null;

  /**
   * Defines the `value` attribute of the control. <span className="alert alert-sm alert-info">This is a required property, when the control is used with type `radio`.</span>
   */
  @Prop() readonly value: string = null;

  /**
   * Defines the `checked` attribute of the control. If `true`, the control is selected at its value will be included in the forms data.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Defines the `disabled` attribute of the control. If `true`, the user can not interact with the control and the controls value will not be included in the forms data.
   */
  @Prop({ mutable: true }) disabled = false;

  /**
   * Defines the validation `validity` of the control.
   * To reset validity to an undefiend state, simply remove the attribute from the control.
   */
  @Prop({ mutable: true }) validity: null | 'true' | 'false' = null;

  /**
   * Defines the icon `name` inside of the card.
   * <span className="alert alert-sm alert-info">If not set the icon will not show up.</span>
   */
  @Prop() readonly icon: string = null;

  /**
   * An event emitted whenever the components checked state is toggled.
   * The event payload (emitted under `event.detail.state`) is a boolean: `true` if the component is checked, `false` if it is unchecked.
   */
  @Event() input: EventEmitter<boolean>;

  /**
   * An event emitted whenever the components checked state is toggled.
   * The event payload (emitted under `event.detail.state`) is a boolean: `true` if the component is checked, `false` if it is unchecked.
   * <span className="alert alert-sm alert-info">If the component is used with type `radio`, it will only emit this event, when the checked state is changing to `true`.</span>
   */
  @Event() change: EventEmitter<boolean>;

  /**
   * A public method to reset the controls `checked` and `validity` state.
   * The state is set to `null`, so it's neither valid nor invalid.
   */
  @Method()
  async reset() {
    this.validity = null;
    this.controlSetChecked(this.initialChecked);
  }

  constructor() {
    this.GROUPEVENT = `PostCardControlGroup:${this.name}:change`;

    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.controlClickHandler = this.controlClickHandler.bind(this);
    this.controlChangeHandler = this.controlChangeHandler.bind(this);
    this.controlFocusHandler = this.controlFocusHandler.bind(this);
    this.controlKeyDownHandler = this.controlKeyDownHandler.bind(this);

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

  @Watch('checked')
  updateControlChecked(checked = this.checked) {
    this.controlSetChecked(checked);
  }

  @Watch('disabled')
  updateControlDisbled() {
    this.controlSetChecked(this.checked);
  }

  private cardClickHandler(e: Event) {
    if (e.target !== this.control) this.control.click();
  }

  private controlClickHandler(e: Event) {
    if (this.disabled) e.preventDefault();
    e.stopPropagation();
  }

  private controlChangeHandler(e: Event) {
    this.controlSetChecked(this.control.checked, e);
    if (this.group.members.length > 1) this.groupSetSelectedMember(this.control);
  }

  private controlFocusHandler() {
    this.focused = this.host === document.activeElement;
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

  private controlSetChecked(checked: boolean, e?: Event) {
    if (e && e.type === 'input') e.stopImmediatePropagation();

    if (this.disabled) {
      this.internals.setFormValue(null);
    } else {
      this.checked = this.control.checked = checked;
      this.internals.setFormValue(this.checked ? this.control.value : null);
      this.controlEmitEvent(e);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
  private controlEmitEvent(e?: Event) {
    if (!e) return;

    const isCheckbox = this.type === 'checkbox';
    const isRadioAndChecked = this.type === 'radio' && this.checked;

    if (isCheckbox || isRadioAndChecked) this[e.type].emit({ state: this.checked });
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

    this.controlSetChecked(this.control === e.detail.control);
    this.groupCollectMembers();
  }

  connectedCallback() {
    this.initialChecked = this.checked;
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
            'is-valid': this.validity !== null && this.validity !== 'false',
            'is-invalid': this.validity === 'false',
          }}
        >
          <input
            ref={el => (this.control = el as HTMLInputElement)}
            id={this.controlId}
            class="card-control--input form-check-input"
            type={this.type}
            name={this.name}
            value={this.value}
            checked={this.checked}
            aria-disabled={this.disabled}
            aria-invalid={this.validity === 'false'}
            onClick={this.controlClickHandler}
            onInput={this.controlChangeHandler}
            onChange={this.controlChangeHandler}
            onFocus={this.controlFocusHandler}
            onBlur={this.controlFocusHandler}
            onKeyDown={this.controlKeyDownHandler}
          />

          <label htmlFor={this.controlId} class="card-control--label form-check-label">
            {this.label}
            {this.description ? (
              <div class="card-control--description">{this.description}</div>
            ) : null}
          </label>

          <div class="card-control--icon">
            <slot name="icon">{this.icon ? <post-icon name={this.icon}></post-icon> : null}</slot>
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender() {
    this.groupCollectMembers();
  }

  // https://stenciljs.com/docs/form-associated
  formAssociatedCallback() {
    this.controlSetChecked(this.checked);
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formStateRestoreCallback(checked, _reason: 'restore' | 'autocomplete') {
    this.controlSetChecked(checked);
  }

  formResetCallback() {
    this.reset();
  }

  disconnectedCallback() {
    window.removeEventListener(this.GROUPEVENT, this.groupEventHandler);
  }
}
