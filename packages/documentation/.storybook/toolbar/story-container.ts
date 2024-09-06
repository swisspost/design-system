import { Args, StoryContext, StoryFn } from '@storybook/web-components';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import postExternalStyles from '@swisspost/design-system-styles/post-external.css?inline';
import postInternalStyles from '@swisspost/design-system-styles/post-internal.css?inline';

/**
 * Transforms a style input into a CSSResult output adapted to web components
 */
export function useStyles(styles: any) {
  if (typeof styles !== 'string') return unsafeCSS('');
  return unsafeCSS(styles.replace(/:root/g, ':host'));
}

/**
 * Web component that renders a story inside a shadow DOM importing the styles expected from the toolbar selection.
 */
@customElement('story-container')
export class StoryContainer extends LitElement {
  styles = {
    post: {
      internal: useStyles(postInternalStyles),
      external: useStyles(postExternalStyles),
    },
  };

  @property()
  theme?: string;

  @property()
  channel?: string;

  @property({ attribute: true })
  story!: StoryFn;

  @property({ attribute: true })
  context!: { args: StoryContext<Args> };

  render() {
    const style = this.styles[this.theme]?.[this.channel];
    const template = this.story(this.context, this.context.args);

    if (!style) return template;

    return html`
      <style>
        ${style}
      </style>
      ${template}
    `;
  }
}
