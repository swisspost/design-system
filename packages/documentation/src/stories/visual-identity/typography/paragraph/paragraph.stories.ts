import type { StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '7ecd87f1-de96-4e39-a057-ba1798eb69593',
  title: 'Visual Identity/Typography/Paragraph',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=178-6713&node-type=frame&t=Zs4iDGVBTA88pChW-0',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => html` <div>${story(context.args, context)}</div> `,
  ],
  render: () => html`
    <p>
      This is a paragraph. It is a block of text that is separated from other blocks of text by a
      blank line. It is usually indented at the beginning of the first line. The first word of a
      paragraph is often indented more than the rest of the paragraph.
    </p>
    <p>
      This is a paragraph. It is a block of text that is separated from other blocks of text by a
      blank line. It is usually indented at the beginning of the first line. The first word of a
      paragraph is often indented more than the rest of the paragraph.
    </p>
  `,
};
