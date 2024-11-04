import type { Args, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '7ecd87f1-de96-4e39-a057-ba1798eb6959',
  title: 'Components/Heading',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=6424-29869&mode=design&t=ErO7GVSw8DfHlx0L-4',
    },
  },
  args: {
    title: 'Heading',
    level: 'h1',
    showSubtitle: false,
    subtitle: 'Subheading',
    override: 'none',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Defines the text within the Heading.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    level: {
      name: 'Heading Level',
      description: 'Defines the level of the Heading (e.g. `<h1>`, `<h2>`, ...).',
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        category: 'General',
      },
    },
    showSubtitle: {
      name: 'Show Subheading',
      description: 'When set to `true`, component renders a subheading.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    subtitle: {
      name: 'Subtitle',
      description: 'Defines the text within the Subheading.',
      if: {
        arg: 'showSubtitle',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    override: {
      name: 'Override',
      description:
        'Sometimes the document heading structure requires you to use a heading tag that should look like another in order to maintain a consistency. In those cases you can use the heading helper classes `.h1`  through `.h6`.',
      control: {
        type: 'select',
      },
      options: ['none', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        category: 'Override',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const tagName = unsafeStatic(args.level);
    const content = args.showSubtitle
      ? html`
          <span class="d-block">${args.title}</span>
          <span class="fw-light">${args.subtitle}</span>
        `
      : args.title;

    return html`
      <${tagName} ${
      args.override !== 'none' && args.override ? unsafeStatic(`class=${args.override}`) : ''
    }>${content}</${tagName}>
    `;
  },
};

export const Spacing: Story = {
  render: () => html`
    <div class="poc-spacing">
      <h1>Heading desktop</h1>
      <p class="lead">
        Lead 24px --- Lorem ipsum dolor sit amet consectetur. Amet eget sapien velit tincidunt
        egestas lectus elit. Morbi molestie elit sagittis quam bibendum. Egestas volutpat augue
        dictum molestie ipsum. Dui molestie facilisi morbi tellus.
      </p>
      <h2>Heading 2</h2>
      <p>
        Paragraph 20px || Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <p class="lead">
        Lead 24px --- Lorem ipsum dolor sit amet consectetur. Amet eget sapien velit tincidunt
        egestas lectus elit. Morbi molestie elit sagittis quam bibendum. Egestas volutpat augue
        dictum molestie ipsum. Dui molestie facilisi morbi tellus.
      </p>
      <h3>Heading 3</h3>
      <p>
        Paragraph 20px || Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <h4>Heading 4</h4>
      <p>
        Paragraph 20px || Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <h5>Heading 5</h5>
      <p>
        Paragraph 20px || Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <h6>Heading 6</h6>
      <p>
        Paragraph 20px || Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <ul>
        <li>List item</li>
        <li>List item</li>
        <li>List item</li>
      </ul>
      <p>
        Paragraph 20px || Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
    </div>
  `,
};
