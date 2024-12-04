import type { StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import HeaderMarkup from './components/header.markup';

const meta: MetaComponent = {
  id: 'header',
  title: 'Components/Header',
  tags: ['package:HTML'],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=558-7012&t=ywmfJhyvd2euoiGI-1',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return HeaderMarkup;
  },
};
