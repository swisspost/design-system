import { customElement } from 'lit/decorators.js';

import postInternalStyles from '@swisspost/design-system-styles/post-internal.css?inline';
import { StoryContainerBase, useStyles } from './story-container-base';

/**
 * Web component that renders a story inside a shadow DOM importing the post-internal styles.
 */
@customElement('post-internal')
export class StoryContainerPostInternal extends StoryContainerBase {
  static styles = useStyles(postInternalStyles);
}
