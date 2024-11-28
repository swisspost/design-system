import { MetaComponent } from '@root/types';
import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: MetaComponent = {
  id: '43525c38-d00c-4632-8cc5-0fb8a0f2a741',
  title: 'Components/Forms/Hint',
  tags: ['package:HTML'],
  render: renderHint,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=577-14546&t=sNKFtH6EhW6hwHAq-4',
    },
  },
  args: {
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
  },
  argTypes: {
    hint: {
      name: 'Helper Text',
      description: 'Text to place in the help text area of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export function renderHint(args: Args, context: StoryContext, id: string = 'example-input') {
  return html`
    <div class="form-floating">
      <input
        id="${id}"
        class="form-control"
        type="text"
        placeholder="Placeholder"
        aria-describedby="form-hint-${id}"
      />
      <label class="form-label" for="${id}">Label</label>
      <p id="form-hint-${id}" class="form-hint">${args.hint}</p>
    </div>
  `;
}

export const Default: Story = {};
