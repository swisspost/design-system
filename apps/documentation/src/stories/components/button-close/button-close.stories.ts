import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import bannerMeta, { Dismissible as BannerDismissible } from '../banner/banner.stories';
import dialogMeta, { Default as DialogDefault } from '../dialog/dialog.stories';
import './button-close.styles.scss';

const meta: MetaComponent = {
  id: 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a',
  title: 'Components/Button Close',
  component: 'post-closebutton',
  render: getCloseButtonRenderer(),
  tags: ['package:WebComponents', 'status:New'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2514-18516&t=gCGlckfBEobCTna3-4',
    },
  },
  args: {
    'slots-default': 'Close',
    'buttonType': 'button',
    'size': 'default',
    'placement': 'auto',
  },
  argTypes: {
    'slots-default': {
      name: 'Label',
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

function getCloseButtonRenderer(extraClasses?: string) {
  return (args: Args) => html`
    <post-closebutton
      button-type=${args.buttonType !== 'button' ? args.buttonType : nothing}
      class=${extraClasses ?? nothing}
      size="${args.size !== 'default' ? args.size : nothing}"
      placement="${args.placement !== 'auto' ? args.placement : nothing}"
    >
      ${unsafeHTML(args['slots-default'])}
    </post-closebutton>
  `;
}

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return html`<div class="mock-element">${story(context.args, context)}</div>`;
    },
  ],
};

export const AutomaticPositioning: Story = {
  render: (args: Args) => {
    const renderCloseButton = getCloseButtonRenderer();
    return html` <div class="position-relative">Closable element ${renderCloseButton(args)}</div> `;
  },
};

export const CloseDialog: Story = {
  ...DialogDefault,
  args: {
    ...dialogMeta.args,
  },
  decorators: dialogMeta.decorators,
};

export const CloseBanner: Story = {
  ...BannerDismissible,
  args: {
    ...bannerMeta.args,
    ...BannerDismissible.args,
  },
  render: bannerMeta.render,
};

export const ClosePostPopover: Story = {
  render: () => html`
    <post-popover-trigger for="close-button-popover">
      <button class="btn btn-secondary">Open popover</button>
    </post-popover-trigger>
    <post-popover id="close-button-popover" text-close="Close">
      <p>This popover uses its built-in close button.</p>
    </post-popover>
  `,
};

export const ClosePostPopoverContainer: Story = {
  render: () => html`
    <button class="btn btn-secondary" popovertarget="close-button-popovercontainer">
      Open popovercontainer
    </button>
    <post-popovercontainer id="close-button-popovercontainer">
      <div class="position-relative">
        <p>This popovercontainer is closed by the close button.</p>
        <post-closebutton>Close</post-closebutton>
      </div>
    </post-popovercontainer>
  `,
};

export const CloseCollapsible: Story = {
  render: () => html`
    <post-collapsible>
      <p>This collapsible is closed by the close button.</p>
      <post-closebutton>Close</post-closebutton>
    </post-collapsible>
  `,
};

export const CloseAccordionItem: Story = {
  render: () => html`
    <post-accordion-item>
      <span slot="header">Accordion item</span>
      <p>This accordion item is closed by the close button.</p>
      <post-closebutton>Close</post-closebutton>
    </post-accordion-item>
  `,
};
