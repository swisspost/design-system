import type { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '49b036fc-5c54-46da-b6d1-081f0c731b05',
  title: 'Foundations/Layout/Sections',
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/sybxin85kCZNXQjQFOTc2a/PPNL-Cargo-layout-examples?node-id=609-51503&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <section class="section palette-brand">
      <div class="container py-64">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facere maiores unde
          magni sequi a? Id ipsam neque hic consequuntur, iusto nemo, nisi in cupiditate numquam
          necessitatibus, dicta voluptate ipsum?
        </p>
      </div>
    </section>
  `,
};
