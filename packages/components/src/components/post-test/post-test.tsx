import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'post-test',
  styleUrl: 'post-test.scss',
  shadow: true,
})
export class PostTest {
  @Prop() firstname: string;
  @Prop() lastname: string;
  @Prop() test: boolean;

  componentDidRender() {
    if (this.firstname != undefined)
      console.log('firstname', this.firstname, typeof this.firstname);
    if (this.lastname != undefined) console.log('lastname', this.lastname, typeof this.lastname);
    if (this.test != undefined) console.log('test', this.test, typeof this.test);
  }

  render() {
    return (
      <Host>
        <div>
          <h5>firstname: {typeof this.firstname}</h5>
          <h5>lastname: {typeof this.lastname}</h5>
          <h5>test: {typeof this.test}</h5>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
