import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MetaExtended } from '../../../../types/storybook';

const meta: MetaExtended<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap> = {
  id: '4d1b4185-e04d-494a-ab38-2b56c1778b0b',
  title: 'Components/Accordion',
  component: 'post-accordion',
  parameters: {
    badges: [],
  },
  args: {
    multiple: false,
  },
  argTypes: {
    collapseChange: {
      name: 'collapseChange',
      description: `<p>An event emitted when the collapse element is shown or hidden, before the transition.</p>
<p>The event payload is a boolean: true if the collapsible was opened, false if it was closed.</p>`,
      control: null,
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

// STORIES
type Story = StoryObj<HTMLPostAccordionElement>;

export const Default: Story = {
  render: (args: Partial<HTMLPostAccordionElement>) => html`
    <post-accordion multiple=${ifDefined(args.multiple || undefined)}>
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

      <post-accordion-item collapsed>
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item collapsed>
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

          <post-accordion-item collapsed>
            <span slot="header">Titulum 2</span>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </post-accordion-item>

          <post-accordion-item collapsed>
            <span slot="header">Titulum 3</span>
            <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
          </post-accordion-item>
        </post-accordion>
      </post-accordion-item>

      <post-accordion-item collapsed>
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>

      <post-accordion-item collapsed>
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-accordion-item>
    </post-accordion>
  `,
};

export const DefaultCollapsedPanels: Story = {
  render: () => html`
    <post-accordion>
      <post-accordion-item collapsed>
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

export const DefaultCollapsedMultiplePanels: Story = {
  render: () => html`
    <post-accordion multiple="true">
      <post-accordion-item collapsed>
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
