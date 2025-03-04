import type { Args, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

export interface PostLinkarea {
  dataLink?: boolean;
  anchorDefaultLink?: string;
  anchorSepcifiedLink?: string;
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
    dataLink: false,
    anchorDefaultLink: '#',
    anchorSepcifiedLink: '#',
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
    anchorSepcifiedLink: {
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
          <h5 class="card-title">Titulum</h5>

          <p class="card-text">Contentus momentus vero siteos et accusam iretea et justo.</p>

          <a class="card-link" href="${args.anchorDefaultLink}">Ligilo teksto</a>
          <a
            class="card-link"
            href="${args.anchorSepcifiedLink}"
            data-link=${args.dataLink ? '' : nothing}
            >Pli da ligo</a
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
