import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'b7db7391-f893-4b1e-a125-b30c6f0b028b',
  title: 'Components/Breadcrumb',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1787-20607&node-type=instance&m=dev',
    },
  },
  args: {
    homeUrl: '/',
    homeText: 'Home',
  },
  argTypes: {
    homeUrl: {
      name: 'Home URL',
      description: 'URL for the home breadcrumb link.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    homeText: {
      name: 'Home Text',
      description: 'Text for the home breadcrumb link.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
    <post-breadcrumb home-url=${args.homeUrl} home-text=${args.homeText}>
      <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
      <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
      <post-breadcrumb-item url="/section3">Section 3</post-breadcrumb-item>
    </post-breadcrumb>
  `,
};

export const Concatenated: Story = {
  render: (args: Args) => html`
    <div style="width: 300px;">
      <post-breadcrumb home-url=${args.homeUrl} home-text=${args.homeText}>
        <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
        <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
        <post-breadcrumb-item url="/section3">Section 3</post-breadcrumb-item>
        <post-breadcrumb-item url="/section4">Section 4</post-breadcrumb-item>
      </post-breadcrumb>
    </div>
  `,
};

export const BreadcrumbItem: Story = {
  render: (args: Args) => html`
    <post-breadcrumb-item url=${args.url}>${args.content}</post-breadcrumb-item>
  `,
  args: {
    url: '/section1',
    content: 'Section 1',
  },
  argTypes: {
    url: {
      name: 'URL',
      description: 'The URL of the breadcrumb item.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    content: {
      name: 'Content',
      description: 'The visible label of the breadcrumb item.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    homeUrl: { table: { disable: true } },
    homeText: { table: { disable: true } },
  },
};
