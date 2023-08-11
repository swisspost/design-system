import { spread } from '@open-wc/lit-helpers';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BADGE } from '../../../../.storybook/constants';
import { definedProperties } from '../../../utils';

const meta: Meta<HTMLPostCollapsibleElement> = {
  title: 'Components/Collapsible',
  component: 'post-collapsible',
  parameters: {
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=42%3A358&mode=design&t=OK8meBHjpJvBhwZI-1',
    },
  },
  args: {
    innerHTML: `<span slot='header'>Titulum</span><p>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
  },
  argTypes: {
    innerHTML: {
      description:
        'Defines the HTML markup contained in the collapsible.<br/>' +
        'Elements with a `slot="header"` attribute are displayed in the header while others are shown in the body.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
  },
  render: (args, context) => defaultRender(args, context),
};

export default meta;

type Story = StoryObj<HTMLPostCollapsibleElement>;

function defaultRender(
  args: HTMLPostCollapsibleElement,
  context: StoryContext<HTMLPostCollapsibleElement>,
) {
  const hasHeader = args.innerHTML.indexOf('slot="header"') > -1;
  const collapsibleId = `collapsible-example--${context.name.replace(/ /g, '-').toLowerCase()}`;

  const collapsibleProperties = definedProperties({
    'collapsed': args.collapsed,
    'heading-level': args.headingLevel,
    'id': hasHeader ? undefined : collapsibleId,
  });

  const collapsibleComponent = html`
    <post-collapsible ${spread(collapsibleProperties)}>
      ${unsafeHTML(args.innerHTML)}
    </post-collapsible>
  `;

  const [currentArgs, updateArgs] = useArgs();

  const toggleCollapse = (open?: boolean) => {
    const collapsible = document.querySelector(`#${collapsibleId}`) as HTMLPostCollapsibleElement;
    collapsible.toggle(open).then((isOpen: boolean) => {
      if (typeof currentArgs.collapsed !== 'undefined') updateArgs({ collapsed: !isOpen });
    });
  };

  const togglers = [
    ['Toggle', () => toggleCollapse()],
    ['Show', () => toggleCollapse(true)],
    ['Hide', () => toggleCollapse(false)],
  ];

  const togglersHtml = html`
    <div class="d-flex gap-mini mb-regular">
      ${togglers.map(
        ([label, listener]) =>
          html`
            <button
              aria-controls="${collapsibleId}"
              aria-expanded="${!args.collapsed}"
              class="btn btn-secondary"
              @click="${listener}"
            >
              ${label}
            </button>
          `,
      )}
    </div>
  `;

  return html`
    ${hasHeader ? null : togglersHtml} ${collapsibleComponent}
  `;
}

export const Default: Story = {};

export const InitiallyCollapsed: Story = {
  args: { collapsed: true },
};

export const HeadingLevel: Story = {
  args: { headingLevel: 6 },
};

export const IntricateContent: Story = {
  args: {
    innerHTML: `<p>I am part of the body</p>
      <span slot='header'>Customus<em>&nbsp;Titulum</em></span>
      <small slot='header' class='text-muted'>&nbsp;- I am part of the header</small>
      <p>I am part of the body too!</p>`,
  },
};

export const CustomTrigger: Story = {
  args: {
    innerHTML: `<p class='border rounded p-large'>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
  },
};
