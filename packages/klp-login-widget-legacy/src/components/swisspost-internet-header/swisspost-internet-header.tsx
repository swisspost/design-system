import { Component, h, Host, Prop } from '@stencil/core';
import { Environment } from '../../models/general.model';
import { ILoginWidgetOptions } from '../../models/login-widget-options.model';

/**
 * Shell that only exists to reproduce the DOM shape the legacy widget walks in
 * `selectFromShadowDom()`: swisspost-internet-header -> shadowRoot -> post-klp-login-widget.
 * Renaming it breaks the legacy code, so the tag name is load-bearing.
 */
@Component({
  tag: 'swisspost-internet-header',
  shadow: true,
})
export class SwisspostInternetHeader {
  @Prop() config?: ILoginWidgetOptions | string;
  @Prop() environment?: Environment;
  @Prop() showJobsLoginWidget = false;
  @Prop() jobsLoginText = 'Login';
  @Prop() logoutUrl?: string;
  @Prop() selfAdminOrigin?: string;

  render() {
    return (
      <Host>
        <post-klp-login-widget
          config={this.config}
          environment={this.environment}
          showJobsLoginWidget={this.showJobsLoginWidget}
          jobsLoginText={this.jobsLoginText}
          logoutUrl={this.logoutUrl}
          selfAdminOrigin={this.selfAdminOrigin}
        ></post-klp-login-widget>
      </Host>
    );
  }
}
