import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { getTitleFromPath } from '@/utils';
import { ModuleExport } from '@storybook/types';

export interface DesignParameter {
  type: 'figma';
  url: string;
}

@customElement('link-design')
export class LinkDesignComponent extends LitElement {
  @property({ type: Object }) of: ModuleExport = {};

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  render() {
    const designParameter = this.of?.default?.parameters?.design as DesignParameter;
    const titlePath = this.of?.default?.title;

    return designParameter?.type === 'figma' && designParameter?.url
      ? html` <a class="figma-link btn btn-primary" href="${designParameter.url}">
          <img
            src="/assets/images/technologies/logo-figma.svg"
            alt=""
            style="width: 0.8rem;height: 0.8rem;"
          />
          <span>
            Figma Design
            <span class="visually-hidden"> for ${getTitleFromPath(titlePath)} component</span>
          </span>
        </a>`
      : nothing;
  }
}
