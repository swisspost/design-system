import { checkEmptyOrType } from '@/utils';
import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';

@Component({
  tag: 'post-test',
  styleUrl: 'post-test.scss',
  shadow: true,
})
export class PostTest {
  @Element() host: HTMLPostTestElement;

  @Prop() String2String: string;
  @Prop() Boolean2String: string;
  @Prop() Object2String: string;
  @Prop() Array2String: string;
  @Prop() String2Boolean: boolean;
  @Prop() Number2Boolean: boolean;
  @Prop() Object2Boolean: boolean;
  @Prop() Array2Boolean: boolean;

  // String2String: string = 'whatever';
  // Boolean2String: boolean = true;
  // Object2String: object = { id: '1', name: 'test' };
  // Array2String: string[] = ['a', 'b'];
  // String2Boolean: string = 'whatever';
  // Number2Boolean: boolean = true;
  //Object2Boolean: object = { id: '1', name: 'test' };
  //Array2Boolean: string[] = ['item1', 'item2', 'item3'];

  @Watch('Boolean2String')
  validateBoolean2String() {
    checkEmptyOrType(this, 'Boolean2String', 'string');
  }

  @Watch('Object2String')
  validateObject2String() {
    checkEmptyOrType(this, 'Object2String', 'string');
  }

  @Watch('Array2String')
  validateArray2String() {
    checkEmptyOrType(this, 'Array2String', 'string');
  }

  @Watch('String2Boolean')
  validateString2Boolean() {
    checkEmptyOrType(this, 'String2Boolean', 'boolean');
  }

  @Watch('Number2Boolean')
  validateNumber2Boolean() {
    checkEmptyOrType(this, 'Number2Boolean', 'boolean');
  }

  @Watch('Object2Boolean')
  validateObject2Boolean() {
    checkEmptyOrType(this, 'Object2Boolean', 'boolean');
  }

  @Watch('Array2Boolean')
  validateArray2Boolean() {
    checkEmptyOrType(this, 'Array2Boolean', 'boolean');
  }

  componentDidRender() {
    if (this.String2String != undefined)
      console.log('String2String', this.String2String, typeof this.String2String);
    if (this.Boolean2String != undefined)
      console.log('Boolean2String', this.Boolean2String, typeof this.Boolean2String);
    if (this.Object2String != undefined)
      console.log('Object2String', this.Object2String, typeof this.Object2String);
    if (this.Array2String != undefined)
      console.log('Array2String', this.Array2String, typeof this.Array2String);
    if (this.String2Boolean != undefined)
      console.log('String2Boolean', this.String2Boolean, typeof this.String2Boolean);
    if (this.Number2Boolean != undefined)
      console.log('Number2Boolean', this.Number2Boolean, typeof this.Number2Boolean);
    if (this.Object2Boolean != undefined)
      console.log('Object2Boolean', this.Object2Boolean, typeof this.Object2Boolean);
    if (this.Array2Boolean != undefined)
      console.log('Array2Boolean', this.Array2Boolean, typeof this.Array2Boolean);

    this.validateBoolean2String();
    this.validateObject2String();
    this.validateArray2String();
    this.validateString2Boolean();
    this.validateNumber2Boolean();
    this.validateObject2Boolean();
    this.validateArray2Boolean();
  }

  render() {
    return (
      <Host>
        <div>
          <h5>String2String: {typeof this.String2String}</h5>
          <h5>Boolean2String: {typeof this.Boolean2String}</h5>
          <h5>Object2String: {typeof this.Object2String}</h5>
          <h5>Array2String: {typeof this.Array2String}</h5>
          <h5>String2Boolean: {typeof this.String2Boolean}</h5>
          <h5>Number2Boolean: {typeof this.Number2Boolean}</h5>
          <h5>Object2Boolean: {typeof this.Object2Boolean}</h5>
          <h5>Array2Boolean: {typeof this.Array2Boolean}</h5>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
