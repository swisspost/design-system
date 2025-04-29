import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-form',
  styleUrl: 'post-test-form.scss',
  shadow: true,
})
export class PostTestForm {
  /**
   * Defines the id
   */
  @Prop() theId?: string;

  /**
   * Defines the id2
   */
  @Prop() theId2?: string;

  render() {
    return (
      <Host data-version={version}>
        <post-test-input inputId={this.theId}></post-test-input>
        <post-test-label for={this.theId}></post-test-label>
        <div class="form-floating">
          <input class="form-control" id={this.theId2} value="Parent ShadowDOM" />
          <label class="form-label" htmlFor={this.theId2}>
            Parent ShadowDOM
          </label>
        </div>
      </Host>
    );
  }
}
