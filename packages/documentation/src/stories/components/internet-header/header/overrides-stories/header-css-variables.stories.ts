import meta from '@/stories/components/internet-header/header/header.stories';
import * as HeaderStories from '@/stories/components/internet-header/header/header.stories';
import { Args, StoryContext, WebComponentsRenderer } from '@storybook/web-components';
import { html } from 'lit';

export default {
  ...HeaderStories.default,
  id: 'bfdf4e7c-37d3-40f8-a5d0-734f3e6612b5',
  title: 'Components/Internet Header/Header/CSS Variables',
};

export const Default = {
  render: (args: Args, context: StoryContext<WebComponentsRenderer>) => {
    return html`
      <style>
        #my-div {
          z-index: 1000;
          top: 0;
          transition: var(--post-header-slide-in-transition);
        }

        swisspost-internet-header.scrolling-up + #my-div {
          top: var(--post-header-height);
        }
      </style>
      ${meta.render && meta.render(args, context)}
      <p id="my-div" class="position-sticky bg-nightblue p-16">
        I am sticky! I am always positioned right below the header when you scroll up and down.
      </p>
    `;
  },
};
