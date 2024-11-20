import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { spread } from '@open-wc/lit-helpers';

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
      description: 'Allows you to use a different link instead of the default first one.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    anchorDefaultLink: {
      name: 'Default link',
      description: 'This is the link that will be used if no specific link is set.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Links',
      },
    },
    anchorSepcifiedLink: {
      name: 'Specified link',
      description:
        'This is the link that will be used if you manually assign one using the `data-link` option.',
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
  const props = createSecondAnchorProps(args);

  return html`
    <post-linkarea>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Titulum</h5>

          <p class="card-text">Contentus momentus vero siteos et accusam iretea et justo.</p>

          <a class="card-link" href="${args.anchorDefaultLink}">Ligilo teksto</a>
          <a class="card-link" href="${args.anchorSepcifiedLink}" ${spread(props)}>Pli da ligo</a>
        </div>
      </div>
    </post-linkarea>
  `;
}

function createSecondAnchorProps(args: Args) {
  if (args.dataLink) {
    return { 'data-link': '' };
  }
  return {};
}

export const Default: StoryObj<HTMLPostLinkareaElement> = {};

export const InitiallySpecified: StoryObj<HTMLPostLinkareaElement> = {
  render: args => html` ${renderLinkarea({ ...args, dataLink: true })} `,
};
