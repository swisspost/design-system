import { StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '18566ca9-4502-4053-89f0-db5fdf6f906e',
  title: 'Components/List',
  tags: ['package:WebComponents'],
  component: 'post-list',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7013&t=tiW8c2NHXI0mcJa5-1',
    },
  },
  args: {
    horizontal: false,
    titleHidden: false,
    listItemGap: null,
    listTitleGap: null,
  },
  argTypes: {
    listItemGap: {
      name: '--post-list-item-gap',
      description: 'Defines the gap between list items.',
      control: { type: 'number', min: 0, max: 10, step: 1 },
      table: {
        category: 'Styling',
      },
    },
    listTitleGap: {
      name: '--post-list-title-gap',
      description: 'Defines the gap between the title and the list items.',
      control: { type: 'number', min: 0, max: 10, step: 1 },
      table: {
        category: 'Styling',
      },
    },
  },
  render: args =>
    html`<post-list
      title-hidden="${args.titleHidden ? args.titleHidden : nothing}"
      horizontal="${args.horizontal ? args.horizontal : nothing}"
      style="${args.listTitleGap !== null
        ? `--post-list-title-gap: ${args.listTitleGap}rem;`
        : ''}${args.listItemGap !== null ? ` --post-list-item-gap: ${args.listItemGap}rem` : ''}"
    >
      <h3>Title</h3>
      <post-list-item>List Item 1</post-list-item>
      <post-list-item>List Item 2</post-list-item>
      <post-list-item>List Item 3</post-list-item>
    </post-list> `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const PostListHorizontal: Story = {
  render: () =>
    html`<post-list horizontal="true">
      <h3>Title</h3>
      <post-list-item>List Item 1</post-list-item>
      <post-list-item>List Item 2</post-list-item>
      <post-list-item>List Item 3</post-list-item>
    </post-list> `,
};

export const PostListNoTitle: Story = {
  render: () =>
    html`<post-list title-hidden="true">
      <h3>Title</h3>
      <post-list-item>List Item 1</post-list-item>
      <post-list-item>List Item 2</post-list-item>
      <post-list-item>List Item 3</post-list-item>
    </post-list> `,
};

export const PostListStyling: Story = {
  render: () =>
    html`<post-list style="--post-list-title-gap: 2rem; --post-list-item-gap: 1rem 0.5rem;">
      <h3>Title</h3>
      <post-list-item>List Item 1</post-list-item>
      <post-list-item>List Item 2</post-list-item>
      <post-list-item>List Item 3</post-list-item>
    </post-list> `,
};
