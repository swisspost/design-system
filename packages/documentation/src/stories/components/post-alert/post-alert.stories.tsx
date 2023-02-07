import { StoryFn } from '@storybook/react';
import { PostAlert } from '@swisspost/design-system-components-react';
import { ComponentProps } from 'react';
import React from 'react';
import { definedProperties } from '../../../utils';

type PostAlertArgs = ComponentProps<typeof PostAlert> & { content: string };

export default {
  title: 'Components/post-alert',
  component: PostAlert.displayName,
};

const Template: StoryFn<PostAlertArgs> = args => (
  <PostAlert {...args}>
    <h4 className="alert-heading">Well done!</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so
      that you can see how spacing within an alert works with this kind of content.</p>
    <hr/>
    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </PostAlert>
);
export const Default = Template.bind({});
