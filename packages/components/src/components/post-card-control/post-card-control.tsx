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
import { checkRequiredAndType, checkEmptyOrType, checkRequiredAndOneOf } from '@/utils';
import { version } from '@root/package.json';

let cardControlIds = 0;

/**
 * @class PostCardControl - representing a stencil component
 *
 * @slot default - Content to place into the `default` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Block-level_contentt">block content</a>.<p className="banner banner-sm banner-warning">Even if it is generally possible, we do not recommend using interactive elements in this slot because the background of the card control is clickable.<br/>This can lead to confusion when the hit box of nested interactive controls is not clearly separated from the background, is invalid HTML and click events bubbling up to the card control will unexpectedly toggle it if they're not captured.<br/>More info: <a href="https://accessibilityinsights.io/info-examples/web/nested-interactive/">https://accessibilityinsights.io/info-examples/web/nested-interactive/</a></p>
 * @slot icon - To insert a custom icon into the named `icon` slot.<p>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a>.<p className="banner banner-sm banner-info">It is only meant for <code>img</code> or <code>svg</code> elements and overrides the `icon` property.</p>
 */
@Component({
  tag: 'post-card-control',
  styleUrl: 'post-card-control.scss',
  shadow: true,
  formAssociated: true,
})
export class PostCardControl {
  private readonly EVENT_MAP = {
    input: 'postInput',
    change: 'postChange',
  };

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
  private initialChecked: boolean;
  private hasIcon: boolean;

  @Element() host: HTMLPostCardControlElement;

  @State() focused = false;

  @AttachInternals() private internals: ElementInternals;

  /**
   * Defines the text in the control-label.
   */
  @Prop({ reflect: true }) readonly label!: string;

  /**
   * Defines the description in the control-label.
   */
  @Prop() readonly description?: string;

  /**
   * Defines the `type` attribute of the control.
   */
  @Prop() readonly type!: 'checkbox' | 'radio';

  /**
   * Defines the `name` attribute of the control.
   * <span className="mb-4 banner banner-sm banner-info">This is a required property, when the control should participate in a native `form`. If not specified, a native `form` will never contain this controls value.</span>
   * <span className="banner banner-sm banner-info">This is a required property, when the control is used with type `radio`.</span>
   */
  @Prop() readonly name?: string;

  /**
   * Defines the `value` attribute of the control. <span className="banner banner-sm banner-info">This is a required property, when the control is used with type `radio`.</span>
   */
  @Prop() readonly value?: string;

  /**
   * Defines the `checked` attribute of the control. If `true`, the control is selected at its value will be included in the forms' data.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Defines the `disabled` attribute of the control. If `true`, the user can not interact with the control and the controls value will not be included in the forms' data.
   */
  @Prop({ mutable: true }) disabled = false;

  /**
   * Defines the validation `validity` of the control.
   * To reset validity to an undefined state, simply remove the attribute from the control.
   */
  @Prop({ mutable: true }) validity?: boolean;

  /**
   * Defines the icon `name` inside the card.
   * <span className="banner banner-sm banner-info">If not set the icon will not show up.</span>
   */
  @Prop() readonly icon?: string;

  /**
   * An event emitted whenever the components checked state is toggled.
   * The event payload (emitted under `event.detail.state`) is a boolean: `true` if the component is checked, `false` if it is unchecked.
   */
  @Event() postInput: EventEmitter<{ state: boolean; value: string }>;

  /**
   * An event emitted whenever the components checked state is toggled.
   * The event payload (emitted under `event.detail.state`) is a boolean: `true` if the component is checked, `false` if it is unchecked.
   * <span className="banner banner-sm banner-info">If the component is used with type `radio`, it will only emit this event, when the checked state is changing to `true`.</span>
   */
  @Event() postChange: EventEmitter<{ state: boolean; value: string }>;

  /**
   * A public method to reset the controls `checked` and `validity` state.
   * The validity state is set to `undefined`, so it's neither valid nor invalid.
   */
  @Method()
  async reset() {
    this.validity = undefined;
    this.controlSetChecked(this.initialChecked);
  }

  /**
   * A hidden public method to reset the group controls `checked` state to `false`.
   */
  @Method()
  async groupReset() {
    if (this.disabled) this.control.checked = this.checked = false;
    this.controlSetChecked(false);
  }

  @Watch('label')
  validateControlLabel() {
    checkRequiredAndType(this, 'label', 'string');
  }

  @Watch('description')
  validateControlDescription() {
    checkEmptyOrType(this, 'description', 'string');
  }

  @Watch('type')
  validateControlType() {
    checkRequiredAndOneOf(this, 'type', ['checkbox', 'radio']);
  }

  @Watch('name')
  validateControlName() {
    checkEmptyOrType(this, 'name', 'string');
  }

  @Watch('value')
  validateControlValue() {
    if (this.type == 'radio') {
      checkEmptyOrType(this, 'value', 'string');
    }
  }

  @Watch('icon')
  validateControlIcon() {
    checkEmptyOrType(this, 'icon', 'string');
  }

  @Watch('checked')
  updateControlChecked(checked = this.checked) {
    this.controlSetChecked(checked);
  }

  @Watch('disabled')
  updateControlDisabled() {
    this.controlSetChecked(this.checked);
  }

  constructor() {
    this.cardClickHandler = this.cardClickHandler.bind(this);
    this.controlClickHandler = this.controlClickHandler.bind(this);
    this.controlChangeHandler = this.controlChangeHandler.bind(this);
    this.controlFocusHandler = this.controlFocusHandler.bind(this);
    this.controlKeyDownHandler = this.controlKeyDownHandler.bind(this);
  }

  private cardClickHandler(e: Event) {
    e.stopPropagation();

    // if this was not the clicked element anyway, trigger click on control to change it
    if (e.target !== this.control) this.control.click();
  }

  private controlClickHandler(e: Event) {
    e.stopPropagation();

    // if control is disabled do nothing
    // else control value will fire a change event, which is handled in the controlChangeHandler method
    if (this.disabled) e.preventDefault();
  }

  private controlChangeHandler(e: Event) {
    e.stopPropagation();

    this.groupCollectMembers();
    this.controlSetChecked(this.control.checked, e);
    this.groupSetChecked(this.control, e);
  }

  private controlFocusHandler() {
    this.focused = this.host === document.activeElement;
  }

  // https://googlechromelabs.github.io/howto-components/howto-radio-group/
  private controlKeyDownHandler(e: KeyboardEvent) {
    if (this.type === 'radio') {
      e.stopPropagation();
      if (Object.values(this.KEYCODES).includes(e.code)) e.preventDefault();

      this.groupCollectMembers();

      switch (e.code) {
        case this.KEYCODES.UP:
        case this.KEYCODES.LEFT:
          this.groupSetChecked(this.groupGetPrev(), e);
          break;
        case this.KEYCODES.DOWN:
        case this.KEYCODES.RIGHT:
          this.groupSetChecked(this.groupGetNext(), e);
          break;
        case this.KEYCODES.SPACE:
          this.groupSetChecked(this.control, e);
          break;
        default:
          break;
      }
    }
  }

  private controlSetChecked(checked: boolean, e?: Event) {
    if (!this.control) return;

    if (this.disabled) {
      this.internals.setFormValue(null);
    } else {
      this.control.checked = this.checked = checked;
      this.internals.setFormValue(this.checked ? this.control.value : null);

      if (e) {
        const isCheckbox = this.type === 'checkbox';
        const isRadioAndChecked = this.type === 'radio' && this.checked;

        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
        // if an event parameter is given and a native control would fire an event, emit the corresponding event to the light dom
        if (isCheckbox || isRadioAndChecked)
          this[this.EVENT_MAP[e.type]].emit({ state: this.checked, value: this.value });
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

        const focusableMember = this.group.checked || this.group.focused || this.group.first;

        this.group.members.forEach(m => {
          m.tabIndex = m === focusableMember ? 0 : -1;
        });
      }
    }
  }

  private groupGetPrev() {
    const focusedIndex = this.group.members.findIndex(m => m.id === this.group.focused.id);
    return this.group.members.find((_m, i) => i === focusedIndex - 1) ?? this.group.last;
  }

  private groupGetNext() {
    const focusedIndex = this.group.members.findIndex(m => m.id === this.group.focused.id);
    return this.group.members.find((_m, i) => i === focusedIndex + 1) ?? this.group.first;
  }

  private groupSetChecked(newChecked: HTMLInputElement, e: Event) {
    if (this.group.members.length > 1) {
      const isKeyboardEvent = e.type === 'keydown';
      const newIsAriaDisabled = newChecked.hasAttribute('aria-disabled');
      const newIndex = this.group.members.findIndex(m => m === newChecked);

      if (isKeyboardEvent) newChecked.focus();

      // if new is disabled, do not reset/set anything
      if (!newIsAriaDisabled) {
        // reset all group members but the newChecked
        this.group.hosts
          .filter((_h, i) => i !== newIndex)
          .forEach(h => {
            h.groupReset();
          });

        // if method was called by keyboard event, select newChecked
        // else this has already been done by clicking on the newChecked element already
        if (isKeyboardEvent) newChecked.click();
      }
    }
  }

  // remove as soon as all browser support :host-context()
  // https://caniuse.com/?search=%3Ahost-context()
  private setHostContext() {
    let bgContext: string;
    const possibleBgContexts = window
      .getComputedStyle(this.host)
      .getPropertyValue('--post-card-control-bg-context')
      .split(', ');

    let formContext: string;
    const possibleFromContexts = ['fieldset'];

    let element = this.host as HTMLElement;
    while (element && (!bgContext || !formContext)) {
      bgContext = bgContext ?? possibleBgContexts.find(selector => element.matches(selector));
      formContext = formContext ?? possibleFromContexts.find(selector => element.matches(selector));

      element = element.parentElement;
    }

    const hostContext = [bgContext, formContext].filter(context => !!context).join(' ');
    this.host.setAttribute('data-context', hostContext);
  }

  connectedCallback() {
    this.initialChecked = this.checked;
  }

  componentWillRender() {
    this.hasIcon = Boolean(this.host.querySelector('[slot="icon"]') || this.icon);
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
            'is-valid': this.validity !== undefined && this.validity !== false,
            'is-invalid': this.validity === false,
          }}
        >
          <input
            ref={el => (this.control = el)}
            id={this.controlId}
            class="card-control--input"
            type={this.type}
            name={this.name}
            value={this.value}
            checked={this.checked}
            aria-describedby={`${this.controlId}_content`}
            aria-disabled={this.disabled}
            aria-invalid={this.validity === false}
            onClick={this.controlClickHandler}
            onInput={this.controlChangeHandler}
            onChange={this.controlChangeHandler}
            onFocus={this.controlFocusHandler}
            onBlur={this.controlFocusHandler}
            onKeyDown={this.controlKeyDownHandler}
          />

          <label
            id={`${this.controlId}_label`}
            htmlFor={this.controlId}
            class="card-control--label"
          >
            {this.label}
            {this.description ? (
              <div class="card-control--description">{this.description}</div>
            ) : null}
          </label>

          {this.hasIcon ? (
            <div class="card-control--icon">
              <slot name="icon">{this.icon ? <post-icon name={this.icon}></post-icon> : null}</slot>
            </div>
          ) : null}

          <div id={`${this.controlId}_content`} class="card-control--content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender() {
    this.setHostContext();
    this.groupCollectMembers();
  }

  componentDidLoad() {
    this.validateControlLabel();
    this.validateControlName();
    this.validateControlValue();
    this.validateControlDescription();
    this.validateControlType();
    this.validateControlIcon();
  }

  formAssociatedCallback() {
    this.controlSetChecked(this.checked);
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formStateRestoreCallback(checked) {
    this.controlSetChecked(checked);
  }

  formResetCallback() {
    this.reset();
  }
}
