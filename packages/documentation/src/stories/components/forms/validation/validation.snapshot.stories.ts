import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './validation.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};
