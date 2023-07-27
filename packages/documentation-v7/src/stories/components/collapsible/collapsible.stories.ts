import { spread } from '@open-wc/lit-helpers';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BADGE } from '../../../../.storybook/constants';
import { definedProperties } from '../../../utils';

const meta: Meta<HTMLPostCollapsibleElement> = {
  component: 'post-collapsible',
  parameters: {
    controls: {
      exclude: ['Content'],
    },
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
  args: {
    innerHTML: `<span slot="header">Titulum</span><p>Contentus momentus vero siteos et accusam iretea et justo.</p>`,
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
    'heading-level': args['headingLevel'],
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
      exclude: ['heading-level', 'toggle'],
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
      exclude: ['collapsed', 'heading-level', 'toggle'],
    },
  },
  args: {
    innerHTML: `<p>I am part of the body</p>
      <span slot="header">Customus<em>&nbsp;Titulum</em></span>
      <small slot="header" class="text-muted">&nbsp;- I am part of the header</small>
      <p>I am part of the body too!</p>`,
  },
};

export const CustomTrigger: Story = {
  parameters: {
    controls: {
      exclude: ['heading-level', 'toggle'],
    },
  },
  args: {
    innerHTML: `<p class="border rounded p-large">Contentus momentus vero siteos et accusam iretea et justo.</p>`,
  },
};
