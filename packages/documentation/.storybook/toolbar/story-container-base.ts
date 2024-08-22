import { Args, StoryContext, StoryFn } from '@storybook/web-components';
import { LitElement, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Basis for story container web components that render a story inside a shadow DOM.
 */
export class StoryContainerBase extends LitElement {
  @property({ attribute: true })
  story!: StoryFn;

  @property({ attribute: true })
  context!: { args: StoryContext<Args> };

  render() {
    return this.story(this.context, this.context.args);
  }
}

/**
 * Transforms a style input into a CSSResult output adapted to web components
 */
export function useStyles(styles: any) {
  if (typeof styles !== 'string') return unsafeCSS('');
  return unsafeCSS(styles.replace(/:root/g, ':host'));
}
