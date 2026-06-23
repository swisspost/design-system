import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import './button-close.styles.scss';

const meta: MetaComponent = {
  id: 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a',
  title: 'Components/Button Close',
  component: 'post-closebutton',
  render: getCloseButtonRenderer(),
  tags: ['package:WebComponents', 'status:Experimental'],
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

type CloseAction = (el: Element) => void;

interface ClosableTarget {
  matches: (el: Element) => boolean;
  close: CloseAction;
}

const CLOSABLE_TARGETS: ClosableTarget[] = [
  {
    matches: el => el.localName === 'post-banner',
    close: el => (el as HTMLPostBannerElement).dismiss(),
  },
  {
    matches: el => el.localName === 'post-popover',
    close: el => (el as HTMLPostPopoverElement).hide(),
  },
  {
    matches: el => el.localName === 'post-popovercontainer',
    close: el => (el as HTMLPostPopovercontainerElement).hide(),
  },
  {
    matches: el => el.localName === 'post-collapsible',
    close: el => (el as HTMLPostCollapsibleElement).toggle(false),
  },
  {
    matches: el => el.localName === 'post-accordion-item',
    close: el => (el as HTMLPostAccordionItemElement).toggle(false),
  },
  { matches: el => el.localName === 'dialog', close: el => (el as HTMLDialogElement).close() },
  {
    matches: el => el.hasAttribute('popover'),
    close: el => (el as HTMLElement).togglePopover(false),
  },
];
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

export const ClosePostPopoverContainer: Story = {
  render: () => html`
    <button
      class="btn btn-secondary"
      onclick="document.getElementById('bc-popovercontainer').show(this)"
    >
      Open popovercontainer
    </button>
    <post-popovercontainer id="bc-popovercontainer">
      <div class="position-relative p-24">
        <p>This is a <code>post-popovercontainer</code>. Click x to close no wiring needed.</p>
        <post-closebutton>Close</post-closebutton>
      </div>
    </post-popovercontainer>
  `,
};

export const ClosePostPopover: Story = {
  render: () => html`
    <post-popover-trigger for="bc-popover">
      <button class="btn btn-secondary">Open popover</button>
    </post-popover-trigger>
    <post-popover
      id="bc-popover"
      class="palette palette-accent"
      text-close="Close"
      placement="bottom"
      ?arrow=${true}
    >
      <p class="mb-0">
        A <code>post-popover</code> with its built-in close button rendered in shadow DOM. Click x
        to close no wiring needed.
      </p>
    </post-popover>
  `,
};

export const CloseDialog: Story = {
  render: () => html`
    <button class="btn btn-secondary" onclick="this.nextElementSibling.showModal()">
      Open dialog
    </button>
    <dialog class="post-dialog" aria-labelledby="bc-dialog-title" aria-describedby="bc-dialog-desc">
      <form method="dialog" class="dialog-grid">
        <h3 class="dialog-header" id="bc-dialog-title">Dialog</h3>
        <div class="dialog-body">
          <p id="bc-dialog-desc">Click x to close no event listener needed.</p>
        </div>
        <post-closebutton>Close</post-closebutton>
      </form>
    </dialog>
  `,
};

export const CloseBanner: Story = {
  render: () => html`
    <post-banner>
      <post-closebutton slot="close-button">Close</post-closebutton>
      <p>This banner can be dismissed. The close button in the slot needs no wiring.</p>
    </post-banner>
  `,
};

export const CloseCollapsible: Story = {
  render: () => html`
    <post-collapsible-trigger for="bc-collapsible">
      <button class="btn btn-secondary mb-16">Toggle collapsible</button>
    </post-collapsible-trigger>
    <post-collapsible id="bc-collapsible">
      <p>Collapsible content. Click x to collapse no event listener needed.</p>
      <post-closebutton>Close</post-closebutton>
    </post-collapsible>
  `,
};

export const CloseAccordionItem: Story = {
  render: () => html`
    <post-accordion heading-level="3">
      <post-accordion-item>
        <span slot="header">Accordion item</span>
        <p>Accordion content. Click x to collapse this item no event listener needed.</p>
        <post-closebutton>Close</post-closebutton>
      </post-accordion-item>
    </post-accordion>
  `,
};
