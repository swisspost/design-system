import { MetaBase } from '@preview/types/storybook';
import { StoryObj } from '@storybook/web-components-vite';

const meta: MetaBase = {
  title: 'Health/Package Stats',
  tags: ['visibility:dev'],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
