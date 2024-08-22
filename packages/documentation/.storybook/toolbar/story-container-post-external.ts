import { customElement } from 'lit/decorators.js';

import postExternalStyles from '@swisspost/design-system-styles/post-external.css?inline';
import { useStyles, StoryContainerBase } from './story-container-base';

/**
 * Web component that renders a story inside a shadow DOM importing the post-external styles.
 */
@customElement('post-external')
export class StoryContainerPostExternal extends StoryContainerBase {
  static styles = useStyles(postExternalStyles);
}
