import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '68699b2c-ec1f-467d-81ae-8b3f48d7c595',
  title: 'Components/Card Teaser',
  tags: ['package:Styles', 'status:Experimental'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=3850-8203',
    },
  },
  args: {
    size: 'sm',
    title: 'Title',
    buttonLabel: 'Button label',
    content: 'This is a sample description for the teaser card component.',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Title of the teaser card',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    content: {
      name: 'Content',
      description: 'Content of the teaser card',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    buttonLabel: {
      name: 'Button label',
      description: 'Button label of the teaser card',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
    size: {
      name: 'Size',
      description: 'Size of the teaser card',
      control: {
        type: 'radio',
        labels: {
          sm: 'Small (default)',
          lg: 'Large',
        },
      },
      options: ['sm', 'lg'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export function renderTeaserCard(args: Args) {
  return html`<post-linkarea class="card teaser-card${args.size === 'lg' ? ' teaser-card-lg' : ''}">
      <img src="https://picsum.photos/id/38/500/400" alt="My placeholder image">
      <div>
        <div>
          <h3>${args.title}</h3>
          <p>${args.content}</p>
        </div>
        <a href="#" class="btn btn-tertiary px-0">${
          args.buttonLabel
        } <post-icon name="arrowright"></post-icon></post-icon></a>
      </div>
  </post-linkarea>
  `;
}

export function renderTeaserSectionHeader(size?: string) {
  return html` <div class="d-flex align-items-end justify-content-between gap-24">
    <div class="d-flex flex-column gap-8">
      <h2 class="m-0">Teaser section ${size}</h2>
      <p class="m-0">This is a sample description for the teaser section component.</p>
    </div>
    <a href="#" class="flex-shrink-0 btn btn-primary"
      >Let's go <post-icon name="arrowright"></post-icon
    ></a>
  </div>`;
}

export const Default: Story = {
  render: renderTeaserCard,
  decorators: [story => html`<div style="max-width: 400px;">${story()}</div>`],
};

export const Section: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: args => html`
    <div class="container py-56 d-flex flex-column gap-32">
      ${renderTeaserSectionHeader()}
      <div class="row gy-16 gy-lg-24">
        ${Array.from(
          { length: 4 },
          () => html` <div class="col-md-6 col-lg-3">${renderTeaserCard(args)}</div> `,
        )}
      </div>
    </div>
  `,
};
