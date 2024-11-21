import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostLanguageOptionSwitchElement> = {
  id: 'decbb10c-2b39-4f47-b67d-337d8111a3ae',
  title: 'Components/Header/Language Switch',
  tags: ['package:WebComponents'],
  component: 'post-language-option-switch',
  render: renderLanguageSwitch,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?t=g8IqUrnroVx7EeLT-0',
    },
  },
  args: {
    variant: 'list',
    caption: 'Caption',
    description: 'Description',
    name: 'language-switch-example',
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

function renderLanguageSwitch(args: Partial<HTMLPostLanguageOptionSwitchElement>) {
  return html`<post-language-option-switch
    caption=${args.caption}
    description=${args.description}
    variant=${args.variant}
    name=${args.name}
  >
    <post-language-option active="true" code="de" name="Deutsch">DE</post-language-option>
    <post-language-option active="false" code="en" name="English">EN</post-language-option>
    <post-language-option active="false" code="fr" name="French">FR</post-language-option>
  </post-language-option-switch> `;
}

function renderLanguageSwitchAsLinks(args: Partial<HTMLPostLanguageOptionSwitchElement>) {
  return html`<post-language-option-switch
    caption=${args.caption}
    description=${args.description}
    variant="dropdown"
    name=${args.name}
  >
    <post-language-option url="/de" active="true" code="de" name="Deutsch">DE</post-language-option>
    <post-language-option url="/en" active="false" code="en" name="English"
      >EN</post-language-option
    >
    <post-language-option url="/fr" active="false" code="fr" name="French">FR</post-language-option>
  </post-language-option-switch> `;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageOptionSwitchElement>;

export const Default: Story = {};

export const Links: Story = {
  render: renderLanguageSwitchAsLinks,
};
