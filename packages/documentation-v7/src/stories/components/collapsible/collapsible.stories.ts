import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { spread } from '@open-wc/lit-helpers';
// @ts-ignore
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { PostCollapsible } from '@swisspost/design-system-components-react';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ComponentProps, MouseEventHandler } from 'react';
import { definedProperties } from '../../../utils';

type PostCollapsibleArgs = ComponentProps<typeof PostCollapsible> & { content: string };

const meta: Meta<PostCollapsibleArgs> = {
  component: 'post-collapsible',
  parameters: {
    controls: {
      exclude: ['Content'],
    },
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
  args: {
    content: `<span slot="header">Titulum</span><p>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
  },
  argTypes: {
    content: {
      name: 'Content',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
  },
  render: (args, context) => defaultRender(args, context),
};

export default meta;

type Story = StoryObj<PostCollapsibleArgs>;

function defaultRender(args: PostCollapsibleArgs, context: StoryContext<PostCollapsibleArgs>) {
  const hasHeader = args.content.indexOf('slot="header"') > -1;
  const collapsibleId = `collapsible-example--${context.name.replace(/ /g, '-').toLowerCase()}`;

  const collapsibleProperties = definedProperties({
    'collapsed': args.collapsed,
    'heading-level': args['headingLevel'],
    'id': hasHeader ? undefined : collapsibleId,
  });

  const collapsibleComponent = html`
    <post-collapsible ${spread(collapsibleProperties)}>
      ${unsafeHTML(args.content)}
    </post-collapsible>
  `;

  const [currentArgs, updateArgs] = useArgs();

  const toggleCollapse = (open?: boolean) => {
    const collapsible = document.querySelector(`#${collapsibleId}`) as HTMLPostCollapsibleElement;
    collapsible.toggle(open).then((isOpen: boolean) => {
      if (typeof currentArgs.collapsed !== 'undefined') updateArgs({ collapsed: !isOpen });
    });
  };

  const togglers: [string, MouseEventHandler][] = [
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
              key="${label}"
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
  parameters: {
    controls: {
      exclude: ['Content', 'heading-level', 'toggle'],
    },
  },
  args: { collapsed: true },
};

export const HeadingLevel: Story = {
  parameters: {
    controls: {
      exclude: ['Content', 'collapsed', 'toggle'],
    },
  },
  args: { headingLevel: 6 },
};

export const IntricateContent: Story = {
  parameters: {
    controls: {
      exclude: ['Content', 'heading-level', 'toggle'],
    },
  },
  args: {
    content: `<p>I am part of the body</p>
      <span slot="header">Customus<em>&nbsp;Titulum</em></span>
      <small slot="header" class="text-muted">&nbsp;- I am part of the header</small>
      <p>I am part of the body too!</p>`,
  },
};

export const CustomTrigger: Story = {
  parameters: {
    controls: {
      exclude: ['Content', 'heading-level', 'toggle'],
    },
  },
  args: {
    content: `<p class="border rounded p-large">Contentus momentus vero siteos et accusam iretea et justo.</p>`,
  },
};
