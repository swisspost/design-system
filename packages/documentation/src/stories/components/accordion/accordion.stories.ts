import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostAccordionElement> = {
  id: 'Components/Accordion',
  title: 'Components/Accordion',
  component: 'post-accordion',
  parameters: {
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION, BADGE.SINCE_V1],
  },
  args: {
    multiple: false,
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
