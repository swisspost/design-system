import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

export interface Link extends AccessibleText {
  url: string; // Target URL of the link.
  active?: boolean;
}
interface AccessibleText {
  text: string; // Base text content, can be visible or visually hidden.
  label?: string; // ARIA label, screen readers will use this instead of text.
  description?: string; // ARIA description for additional context, read after text or label.
}
@Component({
  tag: 'post-breadcrumbs-parent',
  shadow: false,
})
export class PostBreadcrumbsParent {
  @Element() host: HTMLPostBreadcrumbsParentElement;

  /** * Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has it's own navigation structure. */
  @Prop() customItems?: string | Array<Link>;
  @State() customBreadcrumbItems?: Array<Link>;
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
  handleCustomConfigChange(newValue: string | Array<Link>) {
    try {
      this.customBreadcrumbItems = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // There is something wrong entirely
    // eslint-disable-next-line @stencil-community/strict-boolean-conditions
    const breadcrumbConfig = {
      rootUrl: 'https://post.ch/de/',
      items: [
        { text: 'Meine Post', url: 'https://post.ch/de/kundencenter' },
        {
          text: 'Standorte und Öffnungszeiten',
          url: 'https://places.post.ch/?lang=de',
          label: 'Die label',
          description: 'Die description',
        },
      ],
    };
    const items =
      this.customBreadcrumbItems !== undefined
        ? [...breadcrumbConfig.items, ...this.customBreadcrumbItems]
        : breadcrumbConfig.items;

    return (
      <Host>
        <post-breadcrumbs
          homeUrl={breadcrumbConfig.rootUrl}
          textHome="homepage"
          textBreadcrumbs="breadcrumbs"
          textMoreItems="More"
        >
          {items.map(item => (
            <post-breadcrumb-item
              inert
              label={item.label}
              description={item.description}
              url={item.url}
            >
              {item.text}
            </post-breadcrumb-item>
          ))}
        </post-breadcrumbs>
      </Host>
    );
  }
}
