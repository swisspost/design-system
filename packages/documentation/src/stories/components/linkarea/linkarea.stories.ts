import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

export interface PostLinkarea {
  dataLink?: boolean;
  anchorDefaultLink?: string;
  anchorSpecifiedLink?: string;
}

const meta: MetaComponent<PostLinkarea> = {
  id: '1d52b794-768b-464e-90eb-4fd15774aa90',
  title: 'Components/Link Area',
  tags: ['package:WebComponents'],
  render: renderLinkarea,
  component: 'post-linkarea',
  parameters: {
    design: {},
  },
  args: {
    linkUrl: 'www.post.ch',
  },
  argTypes: {
    linkUrl: {
      name: 'Link URL',
      description: 'This is the URL used in the link within the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Links',
      },
    },
  },
};

export default meta;

function renderLinkarea(args: Args) {
  return html`
    <post-linkarea>
      <div class="palette palette-alternate p-32 rounded-8">
        <h5>My clickable element</h5>
        <p>
          Clicking anywhere within this <code>post-linkarea</code> will click on the link that is
          placed within the component.
        </p>
        <a href="${args.linkUrl}">Link text</a>
      </div>
    </post-linkarea>
  `;
}

export const Default: StoryObj<PostLinkarea> = {};
