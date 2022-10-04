import { Component, Prop, h, Method, Event, EventEmitter } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string = '';

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * This event is fired randomly
   */
  @Event({ eventName: 'someevent', composed: true }) someevent: EventEmitter<string>;

  @Method() async write(text: string) {
    console.log(this.getText());
    this.someevent.emit(text);
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
