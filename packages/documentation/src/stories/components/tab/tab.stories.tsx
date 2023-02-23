/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { PostTabs, PostTabHeader, PostTabPanel } from '@swisspost/design-system-components-react';
import React from 'react';
import { Meta, Story } from '@storybook/react';
import docsPage from './tab.docs.mdx';

export default {
  title: 'Components/Tab',
  component: PostTabs.displayName,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
  args: {},
  argTypes: {},
} as Meta;

const Template = () => (
  <PostTabs>
    <PostTabHeader slot="tab">First</PostTabHeader>
    <PostTabPanel slot="panel">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
    </PostTabPanel>

    <PostTabHeader slot="tab">Second</PostTabHeader>
    <PostTabPanel slot="panel">
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.
    </PostTabPanel>

    <PostTabHeader slot="tab">Third</PostTabHeader>
    <PostTabPanel slot="panel">
      Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
    </PostTabPanel>
  </PostTabs>
);

export const Default: Story = Template.bind({});
