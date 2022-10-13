import { Component, Element, Host, Prop, h, Watch } from '@stencil/core';
import { PROP_TAG, PROP_TYPE, PROP_HREF, PROP_TARGET, PROP_VARIANT, PROP_SIZE, PROP_ACTIVE, PROP_DISABLED, PROP_ICON, PROP_ICONEND, PROP_ANIMATED, PROP_BLOCK } from './constants'

@Component({
  tag: 'post-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class PostButton {
  @Prop() tag: string = PROP_TAG.default;
  @Prop() type: string = PROP_TYPE.default;
  @Prop() href: string = PROP_HREF.default;
  @Prop() target: string = PROP_TARGET.default;
  @Prop() variant: string = PROP_VARIANT.default;
  @Prop() size: string = PROP_SIZE.default;
  @Prop() active: boolean = PROP_ACTIVE.default;
  @Prop() disabled: boolean = PROP_DISABLED.default;
  @Prop() icon: string = PROP_ICON.default;
  @Prop() iconend: boolean = PROP_ICONEND.default;
  @Prop() animated: boolean = PROP_ANIMATED.default;
  @Prop() block: boolean = PROP_BLOCK.default;

  @Element() element: HTMLElement;

  private conditionalPropertyMapper (conditionalProperties: object) {
    return Object.entries(conditionalProperties)
      .reduce((properties, entry) => entry[1] ? properties.concat(entry[0]) : properties, [])
      .join(' ');
  }

  private propertyValidator (propertyName: string, value: string, validValues: string[]) {
    if (!validValues.includes(value)) throw new Error(`"${value}" is not a valid value for the property "${propertyName}"! Use eather ${validValues.join(', ')}`);
  }

  connectedCallback () {
    this.propertyValidator('tag', this.tag, PROP_TAG.values);
    this.propertyValidator('type', this.type, PROP_TYPE.values);
    this.propertyValidator('target', this.target, PROP_TARGET.values);
    this.propertyValidator('variant', this.variant, PROP_VARIANT.values);
    this.propertyValidator('size', this.size, PROP_SIZE.values);
  }

  render () {
    let buttonInnerDom = [];

    if (this.icon && this.iconend) {
      buttonInnerDom.push(<span><slot/></span>);
      buttonInnerDom.push(<i aria-hidden="true" class={`pi pi-${this.icon}`}/>);
    } else if (this.icon && !this.iconend) {
      buttonInnerDom.push(<i aria-hidden="true" class={`pi pi-${this.icon}`}/>);
      buttonInnerDom.push(<span><slot/></span>);
    } else if (!this.icon && this.animated) {
      buttonInnerDom.push(<span><slot/></span>);
    } else {
      buttonInnerDom.push(<slot/>);
    }

    return (
      <Host>
        <this.tag
          class={
            [
              'btn',
              this.conditionalPropertyMapper({
                [`btn-${this.variant}`]: this.variant,
                [`btn-${this.size}`]: this.size,
                'btn-icon': this.icon && !this.element.innerHTML,
                'btn-animated': !this.icon && this.animated,
                'active': this.active,
                'd-block': this.block
              })
            ].join(' ')
          }
          type={PROP_TYPE.if.type.includes(this.tag) ? this.type : null}
          href={PROP_HREF.if.type.includes(this.tag) ? this.href : null}
          target={PROP_TARGET.if.type.includes(this.tag) ? this.target : null}
          value={this.tag === 'input' ? this.element.innerHTML : null}
          disabled={this.disabled ? 'disabled' : null}
        >
          {buttonInnerDom}
        </this.tag>
      </Host>
    );
  }

  @Watch('tag')
  validateTag(value: string) {
    this.propertyValidator('tag', value, PROP_TAG.values);
  }

  @Watch('type')
  validateType(value: string) {
    this.propertyValidator('type', value, PROP_TAG.values);
  }

  @Watch('target')
  validateTarget(value: string) {
    this.propertyValidator('target', value, PROP_TARGET.values);
  }
  
  @Watch('variant')
  validateVariant(value: string) {
    this.propertyValidator('variant', value, PROP_VARIANT.values);
  }

  @Watch('size')
  validateSize(value: string) {
    this.propertyValidator('size', value, PROP_SIZE.values);
  }
}
