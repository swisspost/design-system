import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

export interface PostLinkarea {
  dataLink?: boolean;
  anchorDefaultLink?: string;
  anchorSpecifiedLink?: string;
}

const meta: MetaComponent<PostLinkarea> = {
  id: '1d52b794-768b-464e-90eb-4fd15774aa90',
  title: 'Components/Link Area',
  tags: ['package:WebComponents', 'status:Experimental'],
  render: renderLinkarea,
  component: 'post-linkarea',
  parameters: {
    design: {},
  },
  args: {
    dataLink: false,
    anchorDefaultLink: '#',
    anchorSpecifiedLink: '#',
  },
  argTypes: {
    dataLink: {
      name: 'Custom selector',
      description:
        'If `false`, clicking the card redirects to the first link. If `true`, a `data-link` attribute is added to the second link, which is used instead, overriding the default behavior.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    anchorDefaultLink: {
      name: 'First link URL',
      description: 'This is the URL used for the first link in the card.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Links',
      },
    },
    anchorSpecifiedLink: {
      name: 'Second link URL',
      description: 'This is the URL used for the second link in the card.',
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
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Title</h5>

          <p class="card-text">
            This card demonstrates the link area functionality. Click anywhere to navigate to the
            first link, unless a specific link is marked with data-link.
          </p>

          <a class="card-link" href="${args.anchorDefaultLink}">Link text</a>
          <a
            class="card-link"
            href="${args.anchorSpecifiedLink}"
            data-link=${args.dataLink ? '' : nothing}
            >More links</a
          >
        </div>
      </div>
    </post-linkarea>
  `;
}

export const Default: StoryObj<PostLinkarea> = {};

export const InitiallySpecified: StoryObj<PostLinkarea> = {
  args: {
    dataLink: true,
  },
};
