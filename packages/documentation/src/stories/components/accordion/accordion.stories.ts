import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostAccordionElement> = {
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
      <post-collapsible>
        <span slot="header">Titulum 1</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-collapsible>

      <post-collapsible>
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-collapsible>

      <post-collapsible>
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-collapsible>
    </post-accordion>
  `,
};

export const MultipleOpenPanels: Story = {
  render: () => html`
    <post-accordion multiple="true">
      <post-collapsible>
        <span slot="header">Titulum 1</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-collapsible>

      <post-collapsible collapsed>
        <span slot="header">Titulum 2</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-collapsible>

      <post-collapsible collapsed>
        <span slot="header">Titulum 3</span>
        <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
      </post-collapsible>
    </post-accordion>
  `,
};
