import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8ca2bd70-56e6-4da9-b1fd-4e55388dca88',
  title: 'Components/Menu',
  tags: ['package:WebComponents', 'status:Experimental'],
  component: 'post-menu',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=13997-36408&m=dev',
    },
  },
  render: getMenuRenderer(),
  args: {
    placement: 'bottom',
    label: 'Menu description',
  },
};

function getMenuRenderer(content?: {
  triggerButtonText?: string;
  triggerButton?: TemplateResult;
  menuItems?: TemplateResult;
}) {
  const triggerButtonText = content?.triggerButtonText ?? 'Open Menu';
  const triggerButton =
    content?.triggerButton ??
    html` <button class="btn btn-secondary">${triggerButtonText}</button> `;

  const menuItems =
    content?.menuItems ??
    html`
      <post-menu-item><a href="/first">First menu item</a></post-menu-item>
      <post-menu-item><a href="/second">Second menu item</a></post-menu-item>
      <post-menu-item><a href="/third">Third menu item</a></post-menu-item>
    `;

  return (args: Args, context: StoryContext) => {
    const menuId = context.id.replace(context.componentId, 'menu');
    return html`
      <post-menu-trigger for="${menuId}"> ${triggerButton} </post-menu-trigger>
      <post-menu
        id="${menuId}"
        placement="${args.placement !== 'bottom' ? args.placement : nothing}"
        label="${args.label}"
      >
        ${menuItems}
      </post-menu>
    `;
  };
}

export default meta;
export const Default: StoryObj = {};

export const Right: StoryObj = {
  args: {
    placement: 'right',
  },
  render: getMenuRenderer({
    triggerButtonText: 'Menu on the right',
  }),
};

export const IconTrigger: StoryObj = {
  render: getMenuRenderer({
    triggerButton: html`
      <button class="btn btn-tertiary btn-lg btn-icon">
        <post-icon aria-hidden="true" name="home"></post-icon>
        <span class="visually-hidden">Open home menu</span>
      </button>
    `,
  }),
};

export const MixedContent: StoryObj = {
  render: getMenuRenderer({
    triggerButtonText: 'Mixed content',
    menuItems: html`
      <post-menu-item>
        <a href="/details">View details <em class="fs-7">link</em></a>
      </post-menu-item>
      <post-menu-item>
        <button type="button">Duplicate <em class="fs-7">button</em></button>
      </post-menu-item>
      <post-menu-item>
        <button type="button">Delete <em class="fs-7">button</em></button>
      </post-menu-item>
    `,
  }),
};

export const WithIcons: StoryObj = {
  render: getMenuRenderer({
    triggerButtonText: 'Icons in front',
    menuItems: html`
      <post-menu-item>
        <button type="button"><post-icon aria-hidden="true" name="edit"></post-icon> Edit</button>
      </post-menu-item>
      <post-menu-item>
        <button type="button"><post-icon aria-hidden="true" name="copy"></post-icon> Copy</button>
      </post-menu-item>
      <post-menu-item>
        <button type="button">
          <post-icon aria-hidden="true" name="trash"></post-icon> Delete
        </button>
      </post-menu-item>
    `,
  }),
};
