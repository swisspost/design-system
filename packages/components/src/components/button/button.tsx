import { Component, Host, Prop, h, Watch } from '@stencil/core';

@Component({
  tag: 'post-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class PostButton {
  @Prop() tag: string = 'button';
  @Prop() type: string = 'button';
  @Prop() variant: string = 'primary';
  @Prop() size: string = 'md';
  @Prop() block: boolean = false;

  private validTagProp: string[] = ['button', 'a', 'input'];
  private validTypeProp: string[] = ['button', 'submit', 'reset'];
  private validVariantProp = ['primary', 'secondary', 'tertiary', 'nightblue', 'nightblue-bright', 'petrol', 'petrol-bright', 'coral', 'coral-bright', 'olive', 'olive-bright', 'purple', 'purple-bright', 'aubergine', 'aubergine-bright', 'success', 'info', 'warning', 'danger'];
  private validSizeProp = ['sm', 'rg', 'md', 'lg'];

  render () {
    return (
      <Host>
        <this.tag
          class={
            [
              'btn',
              `btn-${this.variant}`,
              `btn-${this.size}`,
              this.conditionalPropertyMapper({ 'd-block': this.block })
            ].join(' ')
          }

          type={['button', 'input'].includes(this.type) ? this.type : null}
        >
          <slot></slot>
        </this.tag>
      </Host>
    );
  }

  componentWillLoad () {
    this.propertyValidator('tag', this.validTagProp, this.tag);
    this.propertyValidator('tag', this.validTypeProp, this.type);
    this.propertyValidator('variant', this.validVariantProp, this.variant);
    this.propertyValidator('size', this.validSizeProp, this.size);
  }

  private conditionalPropertyMapper (conditionalProperties: object) {
    return Object.entries(conditionalProperties).reduce((properties, entry) => entry[1] ? properties.concat(entry[0]) : properties, []);
  }

  private propertyValidator (propertyName: string, validValues: string[], value: string) {
    if (!validValues.includes(value)) throw new Error(`"${value}" is not a valid value for the property "${propertyName}"! Use eather ${validValues.join(', ')}`);
  }

  @Watch('tag')
  validateTag(value: string) {
    this.propertyValidator('tag', this.validTagProp, value);
  }

  @Watch('type')
  validateType(value: string) {
    this.propertyValidator('type', this.validTagProp, value);
  }
  
  @Watch('variant')
  validateVariant(value: string) {
    this.propertyValidator('variant', this.validVariantProp, value);
  }

  @Watch('size')
  validateSize(value: string) {
    this.propertyValidator('size', this.validSizeProp, value);
  }
}
