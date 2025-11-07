import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'b7db7391-f893-4b1e-a125-b30c6f0b028b',
  title: 'Components/Breadcrumbs',
  component: 'post-breadcrumbs',
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-16158&m=dev',
    },
  },
  args: {
    homeUrl: '/',
    homeText: 'Home',
    label: 'Breadcrumbs',
    menuLabel: 'More breadcrumb items',
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
    <post-breadcrumbs
      home-url=${args.homeUrl}
      home-text=${args.homeText}
      label=${args.label}
      menu-label=${args.menuLabel}
    >
      <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
      <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
      <post-breadcrumb-item url="/section3">Section 3</post-breadcrumb-item>
    </post-breadcrumbs>
  `,
};

export const Concatenated: Story = {
  render: (args: Args) => html`
    <post-breadcrumbs
      home-url=${args.homeUrl}
      home-text=${args.homeText}
      label=${args.label}
      menu-label=${args.menuLabel}
    >
      <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
      <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
      <post-breadcrumb-item url="/section3">Section 3</post-breadcrumb-item>
      <post-breadcrumb-item url="/section4">Section 4</post-breadcrumb-item>
      <post-breadcrumb-item url="/section5">Section 5</post-breadcrumb-item>
      <post-breadcrumb-item url="/section6">Section 6</post-breadcrumb-item>
      <post-breadcrumb-item url="/section7">Section 7</post-breadcrumb-item>
      <post-breadcrumb-item url="/section8">Section 8</post-breadcrumb-item>
      <post-breadcrumb-item url="/section9">Section 9</post-breadcrumb-item>
      <post-breadcrumb-item url="/section10">Section 10</post-breadcrumb-item>
    </post-breadcrumbs>
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
      name: 'url',
      description: 'The URL of the breadcrumb item.',
      control: { type: 'text' },
    },
    content: {
      name: 'content',
      description: 'The visible label of the breadcrumb item.',
      control: { type: 'text' },
    },
    homeUrl: { table: { disable: true } },
    homeText: { table: { disable: true } },
    label: { table: { disable: true } },
    menuLabel: { table: { disable: true } },
  },
};
