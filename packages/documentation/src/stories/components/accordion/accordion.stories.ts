import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostAccordionElement> = {
  title: 'Components/Accordion',
  component: 'post-accordion',
  parameters: {
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
};

export default meta;

// STORIES
type Story = StoryObj<HTMLPostAccordionElement>;

export const Default: Story = {
  render: () => html`
    <post-accordion>
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
  `
};

export const CloseOthers: Story = {
  render: () => html`
    <post-accordion close-others>
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
  `
};
