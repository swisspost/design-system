import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd08b0dfa-86f4-4f5b-8071-953cbd964e05',
  title: 'Components/List Group',
  tags: ['package:HTML'],
  render: render,
  parameters: {
    badges: [],
  },
};

export default meta;

function render() {
  return html`
    <ul class="list-group">
      <li class="list-group-item">Label</li>
      <li class="list-group-item">Label</li>
      <li class="list-group-item">Label</li>
      <li class="list-group-item">Label</li>
    </ul>
  `;
}

type Story = StoryObj;

export const Default: Story = {};
