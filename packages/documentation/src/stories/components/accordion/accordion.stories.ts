import type { StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent, HeadingLevel } from '@root/types';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: MetaComponent<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap> = {
  id: '4d1b4185-e04d-494a-ab38-2b56c1778b0b',
  title: 'Components/Accordion',
  tags: ['package:WebComponents'],
  component: 'post-accordion',
  render: renderAccordion(),
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=17964-20698&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
  args: {
    multiple: false,
    headingLevel: 4,
  },
  argTypes: {
    postToggle: {
      description: `
<p>An event emitted when a <code>post-accordion-item</code> is opened or closed, before the transition.</p>
<p>The event payload is a <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent">CustomEvent</a> whose target is the toggled <code>post-accordion-item</code> and whose detail is a boolean: <code>true</code> if the item was opened, <code>false</code> if it was closed.</p>`,
      control: null,
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<boolean>' },
      },
    },
  },
};

export default meta;

// RENDERERS
function getAccordionItemContent(position: number | string, headingLevel?: number) {
  const level = headingLevel ? html` <code>h${headingLevel}</code>` : nothing;
  return html`
    <span slot="header">Titulum ${position}${level}</span>
    <p>Contentus momentus vero siteos et accusam iretea et justo.</p>
  `;
}

function getDefaultAccordionItem(args: Partial<HTMLPostAccordionElement>, index: number) {
  const isCollapsed = !!args.multiple && index > 0;
  return html`
    <post-accordion-item collapsed=${ifDefined(isCollapsed || undefined)}>
      ${getAccordionItemContent(index + 1)}
    </post-accordion-item>
  `;
}

function renderAccordion(
  accordionItemRenderer = getDefaultAccordionItem,
): (args: Partial<HTMLPostAccordionElement>) => TemplateResult {
  return (args: Partial<HTMLPostAccordionElement>) => html`
    <post-accordion
      heading-level=${args.headingLevel}
      multiple=${ifDefined(args.multiple || undefined)}
    >
      ${Array.from({ length: 3 }, (_, i) => accordionItemRenderer(args, i))}
    </post-accordion>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostAccordionElement>;

export const Default: Story = {
  args: {
    headingLevel: '3' as HeadingLevel, // needs to be a string for the control to properly initialize
  },
};

export const Logos: Story = {};

export const MultipleOpenPanels: Story = {
  args: {
    multiple: true,
  },
};

export const DefaultCollapsedPanels: Story = {
  render: renderAccordion(
    (_, i) => html`
      <post-accordion-item collapsed=${ifDefined(i !== 1 || undefined)}>
        ${getAccordionItemContent(i + 1)}
      </post-accordion-item>
    `,
  ),
};

export const Nested: Story = {
  render: renderAccordion((args, mainAccordionIndex) => {
    const getNestedAccordion = () => {
      const nestedHeadingLevel = args.headingLevel ? args.headingLevel + 1 : undefined;

      return renderAccordion(
        (_, nestedAccordionIndex) => html`
          <post-accordion-item>
            ${getAccordionItemContent(
              `${mainAccordionIndex + 1}.${nestedAccordionIndex + 1}`,
              nestedHeadingLevel,
            )}
          </post-accordion-item>
        `,
      )({ headingLevel: nestedHeadingLevel as HTMLPostAccordionElement['headingLevel'] });
    };

    return html`
      <post-accordion-item>
        ${getAccordionItemContent(mainAccordionIndex + 1, args.headingLevel)}
        ${mainAccordionIndex === 0 ? getNestedAccordion() : nothing}
        <div>${mainAccordionIndex === 1 ? getNestedAccordion() : nothing}</div>
      </post-accordion-item>
    `;
  }),
};
