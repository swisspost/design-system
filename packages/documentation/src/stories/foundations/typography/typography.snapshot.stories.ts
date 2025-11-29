import { html } from 'lit';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { schemes } from '@/shared/snapshots/schemes';
import { Heading, Link, Paragraph, Legend, Inline } from '../typography/typography.stories';

const meta = {
  title: 'Snapshots',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const Typography: Story = {
  render: (args: Args, context: StoryContext) => html`
    ${schemes(
      () => html`
        <section>
          <h2>Headings</h2>
          ${Heading.render?.({ ...args }, context)}
        </section>

        <section>
          <h2>Links</h2>
          ${Link.render?.({ ...args }, context)}
        </section>

        <section>
          <h2>Paragraphs</h2>
          ${Paragraph.render?.({ ...args }, context)}
        </section>

        <section>
          <h2>Legend</h2>
          ${Legend.render?.({ ...args }, context)}
        </section>

        <section>
          <h2>Inline Elements</h2>
          ${Inline.render?.({ ...args }, context)}
        </section>
      `,
    )}
  `,
};
