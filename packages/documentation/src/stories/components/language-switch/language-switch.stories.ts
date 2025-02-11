import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostLanguageSwitchElement> = {
  id: 'decbb10c-2b39-4f47-b67d-337d8111a3ae',
  title: 'Components/Language Switch',
  tags: ['package:WebComponents'],
  component: 'post-language-switch',
  render: renderLanguageSwitch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=7286-40138&t=NlJxMtn6FqcqrXok-4',
    },
  },
  args: {
    variant: 'list',
    caption: 'Change the language',
    description: 'The currently selected language is English.',
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
  },
};

export default meta;

function renderLanguageSwitch(args: Partial<HTMLPostLanguageSwitchElement>) {
  return html`<post-language-switch
    caption=${args.caption}
    description=${args.description}
    variant=${args.variant}
  >
    <post-language-option active="false" code="de" name="Deutsch">DE</post-language-option>
    <post-language-option active="true" code="en" name="English">EN</post-language-option>
    <post-language-option active="false" code="fr" name="French">FR</post-language-option>
  </post-language-switch> `;
}

function renderLanguageSwitchAsLinks(args: Partial<HTMLPostLanguageSwitchElement>) {
  return html`<post-language-switch
    caption=${args.caption}
    description=${args.description}
    variant="menu"
  >
    <post-language-option url="/de" active="false" code="de" name="Deutsch"
      >DE</post-language-option
    >
    <post-language-option url="/en" active="true" code="en" name="English">EN</post-language-option>
    <post-language-option url="/fr" active="false" code="fr" name="French">FR</post-language-option>
  </post-language-switch> `;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageSwitchElement>;

export const Default: Story = {};

export const Links: Story = {
  render: renderLanguageSwitchAsLinks,
};
