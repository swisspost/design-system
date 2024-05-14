import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap> = {
  id: '4d1b4185-e04d-494a-ab38-2b56c1778b0b',
  title: 'Components/Accordion',
  tags: ['package:WebComponents'],
  component: 'post-accordion',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=17964-20698&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    multiple: false,
  },
  argTypes: {
    postToggle: {
      description: `
<p>An event emitted when a <code>post-accordion-item</code> is opened or closed, before the transition.</p>
<p>The event payload is a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent">CustomEvent</a> whose target is the toggled <code>post-accordion-item</code> and whose detail is a boolean: <code>true</code> if the item was opened, <code>false</code> if it was closed.</p>`,
      control: null,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<boolean>' },
      },
    },
  },
};

export default meta;

// STORIES
type Story = StoryObj<HTMLPostAccordionElement>;

export const Default: Story = {
  render: (args: Partial<HTMLPostAccordionElement>) => html`
    <post-accordion multiple=${args.multiple}>
      <post-accordion-item>
        <span slot="header">Titulum 1</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item>
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item>
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>
    </post-accordion>
  `,
};

export const MultipleOpenPanels: Story = {
  render: () => html`
    <post-accordion multiple="true">
      <post-accordion-item>
        <span slot="header">Titulum 1</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item collapsed="true">
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item collapsed="true">
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>
    </post-accordion>
  `,
};

export const DefaultCollapsedPanels: Story = {
  render: () => html`
    <post-accordion>
      <post-accordion-item collapsed="true">
        <span slot="header">Titulum 1</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item>
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item>
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>
    </post-accordion>
  `,
};

// Used only in testing for now.
export const Nested: Story = {
  render: () => html`
    <post-accordion>
      <post-accordion-item>
        <span slot="header">Titulum 1</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>

        <post-accordion>
          <post-accordion-item>
            <span slot="header">Titulum 1</span>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </post-accordion-item>

          <post-accordion-item collapsed="true">
            <span slot="header">Titulum 2</span>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </post-accordion-item>

          <post-accordion-item collapsed="true">
            <span slot="header">Titulum 3</span>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </post-accordion-item>
        </post-accordion>
      </post-accordion-item>

      <post-accordion-item collapsed="true">
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item collapsed="true">
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>
    </post-accordion>
  `,
};
