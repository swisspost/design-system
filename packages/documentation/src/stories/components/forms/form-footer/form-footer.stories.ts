import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

export const FooterArgs = {
  showPrimaryButton: true,
  primaryButtonText: 'Send',
  primaryButtonIcon: '3020',
  showSecondaryButton: true,
  secondaryButtonText: 'Cancel',
  showTertiaryButton: true,
  tertiaryButtonText: 'Back',
  tertiaryButtonIcon: '3024',
};

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
  args: FooterArgs,
  argTypes: {
    showPrimaryButton: {
      name: 'Show primary button',
      description: 'Show or hide the primary button (last one on the right)',
      control: { type: 'boolean' },
      table: {
        category: 'Primary button',
      },
    },
    primaryButtonText: {
      name: 'Primary button text',
      description: 'Text to display on the primary button',
      control: { type: 'text' },
      table: {
        category: 'Primary button',
      },
      if: {
        arg: 'showPrimaryButton',
      },
    },
    primaryButtonIcon: {
      name: 'Primary button icon',
      description: 'Icon to display on the primary button',
      control: { type: 'text' },
      table: {
        category: 'Primary button',
      },
      if: {
        arg: 'showPrimaryButton',
      },
    },
    showSecondaryButton: {
      name: 'Show secondary button',
      description: 'Show or hide the secondary button (first one on the right)',
      control: { type: 'boolean' },
      table: {
        category: 'Secondary button',
      },
    },
    secondaryButtonText: {
      name: 'Secondary button text',
      description: 'Text to display on the secondary button',
      control: { type: 'text' },
      table: {
        category: 'Secondary button',
      },
      if: {
        arg: 'showSecondaryButton',
      },
    },
    showTertiaryButton: {
      name: 'Show tertiary button',
      description: 'Show or hide the tertiary button (button on the left)',
      control: { type: 'boolean' },
      table: {
        category: 'Tertiary button',
      },
    },
    tertiaryButtonText: {
      name: 'Tertiary button text',
      description: 'Text to display on the tertiary button',
      control: { type: 'text' },
      table: {
        category: 'Tertiary button',
      },
      if: {
        arg: 'showTertiaryButton',
      },
    },
    tertiaryButtonIcon: {
      name: 'Tertiary button icon',
      description: 'Icon to display on the tertiary button',
      control: { type: 'text' },
      table: {
        category: 'Tertiary button',
      },
      if: {
        arg: 'showTertiaryButton',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export function render(args: Args) {
  const primaryButton = args.showPrimaryButton
    ? html`<button class="btn btn-primary">
        ${args.primaryButtonText}<post-icon
          aria-hidden="true"
          name="${args.primaryButtonIcon}"
        ></post-icon>
      </button>`
    : null;
  const secondaryButton = args.showSecondaryButton
    ? html`<button class="btn btn-secondary">${args.secondaryButtonText}</button>`
    : null;

  return html`
    <div class="form-footer">
      ${args.showPrimaryButton || args.showSecondaryButton
        ? html` <div class="form-footer-primary-actions">${primaryButton} ${secondaryButton}</div> `
        : null}
      ${args.showTertiaryButton
        ? html`<button class="btn btn-tertiary">
            <post-icon aria-hidden="true" name="${args.tertiaryButtonIcon}"></post-icon
            >${args.tertiaryButtonText}
          </button>`
        : null}
    </div>
  `;
}

export const Default: Story = {};
