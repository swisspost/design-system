import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaComponent = {
  id: 'f2eddf67-2c3c-40c4-bfec-df49bd028001',
  title: 'Components/Forms/Form Footer',
  tags: ['package:HTML'],
  render: render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1498-28215',
    },
  },
  args: {
    primaryButton:
      '<button class="btn btn-primary">Send<post-icon aria-hidden="true" name="3020"></post-icon></button>',
    secondaryButton: '<button class="btn btn-secondary">Cancel</button>',
    tertiaryButton:
      '<button class="btn btn-tertiary"><post-icon aria-hidden="true" name="3024"></post-icon>Back</button>',
  },
  argTypes: {
    primaryButton: {
      name: 'Primary button',
      control: { type: 'text' },
    },
    secondaryButton: {
      name: 'Secondary button',
      control: { type: 'text' },
    },
    tertiaryButton: {
      name: 'Tertiary button',
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj;

function render(args: Args) {
  return html`
    <div class="form-footer">
      ${unsafeHTML(args.tertiaryButton)}
      <div class="form-footer-right-actions">
        ${unsafeHTML(args.primaryButton)} ${unsafeHTML(args.secondaryButton)}
      </div>
    </div>
  `;
}

export const Default: Story = {};
