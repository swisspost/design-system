import { Component, h } from '@stencil/core';
import { IS_BROWSER, IS_SERVER } from '../../environment';

@Component({
  tag: 'post-env-test',
  shadow: true,
})
export class PostEnvTest {
  render() {
    return <div data-browser={String(IS_BROWSER)} data-server={String(IS_SERVER)}></div>;
  }
}
