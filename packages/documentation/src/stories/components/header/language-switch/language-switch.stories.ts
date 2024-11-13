import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaComponent<HTMLPostLanguageOptionSwitchElement> = {
  id: 'decbb10c-2b39-4f47-b67d-337d8111a3ae',
  title: 'Components/Header/Language Switch',
  tags: ['package:WebComponents'],
  component: 'post-language-option-switch',
  render: renderLanguageSwitch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2908-30413&m=dev',
    },
  },
  args: {
    variant: 'dropdown',
    caption: 'Caption',
    description: 'Description',
    innerHTML:
      '<post-language-option active="true" code="de" name="Deutsch">DE</post-language-option><post-language-option active="false" code="en" name="English">EN</post-language-option>',
  },
  argTypes: {
    variant: {
      description: 'View variant of the language switch.',
      table: {
        category: 'content',
      },
    },
    caption: {
      description: 'Caption of the language switch.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
    description: {
      description: 'Description of the language switch.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
    innerHTML: {
      description: 'Defines the HTML markup contained in the alert.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

// RENDERERS
function renderLanguageSwitch(args: Partial<HTMLPostLanguageOptionSwitchElement>) {
  return html`<post-language-option-switch
    caption=${args.caption}
    description=${args.description}
    variant=${args.variant}
    >${unsafeHTML(args.innerHTML)}
  </post-language-option-switch>`;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageOptionSwitchElement>;

export const Default: Story = {};
