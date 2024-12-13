import { StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import './listbox.styles.scss';

const meta: MetaComponent = {
  id: 'a6a1c3fd-518e-415e-b2ad-ea4e6c563338',
  title: 'Raw Components/Listbox',
  tags: ['package:WebComponents'],
  component: 'post-listbox',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    labelHidden: false,
    multiselect: false,
    searchTerm: '',
    listboxItemGap: '',
    listboxLabelGap: '',
    listboxDescription: 'This is an example listbox.',
  },
  argTypes: {
    listboxItemGap: {
      name: '--post-listbox-item-gap',
      description: 'Defines the gap between listbox items.',
      control: 'text',
      table: {
        category: 'Styling',
      },
    },
    listboxLabelGap: {
      name: '--post-listbox-label-gap',
      description: 'Defines the gap between the label and the listbox items.',
      control: 'text',
      table: {
        category: 'Styling',
      },
    },
  },
  render: args => {
    let styles = '';
    if (args.listboxLabelGap) styles += `--post-listbox-label-gap: ${args.listboxLabelGap};`;
    if (args.listboxItemGap) styles += `--post-listbox-item-gap: ${args.listboxItemGap};`;

    return html`<post-listbox
      label-hidden="${args.labelHidden ? args.labelHidden : nothing}"
      multiselect="${args.multiselect ? args.multiselect : nothing}"
      listbox-description="${args.listboxDescription}"
      style="${styles ? styles : nothing}"
    >
      <h4>Label</h4>
      <post-listbox-item><button>Option 1</button></post-listbox-item>
      <post-listbox-item><a href="#">Option ABC 2</a></post-listbox-item>
      <post-listbox-item><post-icon name="3000"></post-icon>Option 3</post-listbox-item>
      <post-listbox-item>Option 4</post-listbox-item>
      <post-listbox-item>Option 5</post-listbox-item>
      <post-listbox-item>Option 6</post-listbox-item>
      <post-listbox-item>Option 7</post-listbox-item>
      <post-listbox-item>Option 8</post-listbox-item>
      <post-listbox-item>Option 9</post-listbox-item>
      <post-listbox-item>Option 10</post-listbox-item>
    </post-listbox> `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html` <div class="post-listbox-styling-example">${story(context.args, context)}</div> `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const PostListboxNoLabel: Story = {
  render: () =>
    html`<post-listbox label-hidden="true">
      <h4>Label</h4>
      <post-listbox-item>Listbox Item 1</post-listbox-item>
      <post-listbox-item>Listbox Item 2</post-listbox-item>
      <post-listbox-item>Listbox Item 3</post-listbox-item>
      <post-listbox-item>Listbox Item 4</post-listbox-item>
      <post-listbox-item>Listbox Item 5</post-listbox-item>
      <post-listbox-item>Listbox Item 6</post-listbox-item>
      <post-listbox-item>Listbox Item 7</post-listbox-item>
      <post-listbox-item>Listbox Item 8</post-listbox-item>
      <post-listbox-item>Listbox Item 9</post-listbox-item>
      <post-listbox-item>Listbox Item 10</post-listbox-item>
    </post-listbox> `,
};
export const PostListboxHighlightedSearch: Story = {
  render: () =>
    html`<post-listbox search-term="item">
      <h4>Label</h4>
      <post-listbox-item>Listbox Item 1</post-listbox-item>
      <post-listbox-item>Listbox Item 2</post-listbox-item>
      <post-listbox-item>Listbox Item 3</post-listbox-item>
      <post-listbox-item>Listbox Item 4</post-listbox-item>
      <post-listbox-item>Listbox Item 5</post-listbox-item>
      <post-listbox-item>Listbox Item 6</post-listbox-item>
      <post-listbox-item>Listbox Item 7</post-listbox-item>
      <post-listbox-item>Listbox Item 8</post-listbox-item>
      <post-listbox-item>Listbox Item 9</post-listbox-item>
      <post-listbox-item>Listbox Item 10</post-listbox-item>
    </post-listbox> `,
};

export const PostListboxStyling: Story = {
  render: () =>
    html`<post-listbox
      style="--post-listbox-label-gap: 2rem; --post-listbox-item-gap: 1rem 0.5rem;"
    >
      <h3>Label</h3>
      <post-listbox-item>Listbox Item 1</post-listbox-item>
      <post-listbox-item>Listbox Item 2</post-listbox-item>
      <post-listbox-item>Listbox Item 3</post-listbox-item>
      <post-listbox-item>Listbox Item 4</post-listbox-item>
      <post-listbox-item>Listbox Item 5</post-listbox-item>
    </post-listbox> `,
};
