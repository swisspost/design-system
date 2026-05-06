import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { state } from '@/data/store';
import { LinkConfig } from '@/models/shared.model';
import '@swisspost/design-system-components';

@Component({
  tag: 'swisspost-internet-breadcrumbs',
  styleUrl: 'post-internet-breadcrumbs.scss',
  shadow: false,
})
export class PostInternetBreadcrumbs {
  /**
   * Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has it's own navigation structure.
   */
  @Prop() customItems?: string | Array<LinkConfig>;

  /**
   * Label for the home link.
   */
  @Prop() textHome!: string;

  /**
   * Accessible label for the breadcrumbs navigation.
   */
  @Prop() textBreadcrumbs!: string;

  /**
   * Label for the overflow menu button.
   */
  @Prop() textMoreItems!: string;

  @State() customBreadcrumbItems?: Array<LinkConfig>;
  @Element() host: HTMLSwisspostInternetBreadcrumbsElement;

  async componentWillLoad() {
    // Wait for the config to arrive, then render the header
    try {
      this.customBreadcrumbItems =
        typeof this.customItems === 'string' ? JSON.parse(this.customItems) : this.customItems;
    } catch (error) {
      console.error(error);
    }
  }

  @Watch('customItems')
  handleCustomConfigChange(newValue: string | Array<LinkConfig>) {
    try {
      this.customBreadcrumbItems = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // Config is not loaded yet
    if (!state.localizedConfig) {
      return null;
    }

    // There is no breadcrumb config
    // eslint-disable-next-line @stencil-community/strict-boolean-conditions
    if (!state.localizedConfig.breadcrumbs) {
      console.warn(
        `Internet Header: Current project "${state.projectId}" does not include a breadcrumb config. The breadcrumbs will not be rendered. Remove `,
        document.querySelector('swisspost-internet-breadcrumbs'),
        `from your markup or configure the breadcrumbs in your portal config to stop seeing this warning.`,
      );
      return null;
    }

    const breadcrumbConfig = state.localizedConfig.breadcrumbs;
    const items =
      this.customBreadcrumbItems !== undefined
        ? [...breadcrumbConfig.items, ...this.customBreadcrumbItems]
        : breadcrumbConfig.items;

    return (
      <Host>
        <post-breadcrumbs
          homeUrl={breadcrumbConfig.rootUrl}
          textHome={this.textHome}
          textBreadcrumbs={this.textBreadcrumbs}
          textMoreItems={this.textMoreItems}
        >
          {items.map(item => (
            <post-breadcrumb-item label={item.label} description={item.description} url={item.url}>
              {item.text}
            </post-breadcrumb-item>
          ))}
        </post-breadcrumbs>
        <slot></slot>
      </Host>
    );
  }
}
