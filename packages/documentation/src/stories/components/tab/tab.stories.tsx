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
  <PostTabs activePanel="third">
    <PostTabHeader slot="tabs" panel="first">First</PostTabHeader>
    <PostTabHeader slot="tabs" panel="second">Second</PostTabHeader>
    <PostTabHeader slot="tabs" panel="third">Third</PostTabHeader>

    <PostTabPanel name="first">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
    </PostTabPanel>
    <PostTabPanel name="second">
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.
    </PostTabPanel>
    <PostTabPanel name="third">
      Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
    </PostTabPanel>
  </PostTabs>
);

export const Default: Story = Template.bind({});
