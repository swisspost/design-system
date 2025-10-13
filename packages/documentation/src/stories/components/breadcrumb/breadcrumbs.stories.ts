import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'b7db7391-f893-4b1e-a125-b30c6f0b028b',
  title: 'Components/Breadcrumbs',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1787-20607&node-type=instance&m=dev',
    },
  },
  args: {
    homeUrl: '/'
  },
  argTypes: {
    homeUrl: {
      name: 'home-url',
      description: 'URL for the home breadcrumb link.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    homeText: {
      name: 'home-text',
      description: 'Text for the home breadcrumb link.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    menuLabel: {
      name: 'menu-label',
      description: 'The accessible label for the breadcrumb menu when breadcrumb items are concatenated.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const attrs = [
      args.homeUrl ? `home-url="${args.homeUrl}"` : '',
      args.homeText ? `home-text="${args.homeText}"` : '',
      args.menuLabel ? `menu-label="${args.menuLabel}"` : ''
    ].filter(Boolean).join(' ');
    return html`
      <post-breadcrumbs ${attrs}>
        <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
        <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
        <post-breadcrumb-item url="/section3">Section 3</post-breadcrumb-item>
      </post-breadcrumbs>
    `;
  },
};

export const Concatenated: Story = {
  render: (args: Args) => {
    const attrs = [
      args.homeUrl ? `home-url="${args.homeUrl}"` : '',
      args.homeText ? `home-text="${args.homeText}"` : '',
      args.menuLabel ? `menu-label="${args.menuLabel}"` : ''
    ].filter(Boolean).join(' ');
    return html`
      <post-breadcrumbs ${attrs}>
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
    `;
  },
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
      table: { category: 'Props' },
    },
    content: {
      name: 'content',
      description: 'The visible label of the breadcrumb item.',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    homeUrl: { table: { disable: true } },
    homeText: { table: { disable: true } },
    menuLabel: { table: { disable: true } },
  },
};
