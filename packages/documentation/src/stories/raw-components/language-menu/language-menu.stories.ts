import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostLanguageMenuElement> = {
  id: 'decbb10c-2b39-4f47-b67d-337d8111a3ae',
  title: 'Raw Components/Language Menu',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-language-menu',
  render: renderLanguageMenu,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=7286-40138&t=NlJxMtn6FqcqrXok-4',
    },
  },
  args: {
    variant: 'list',
    type: 'language',
    textChangeLanguage: 'Change the language',
    textCurrentLanguage: 'The currently selected language is #name.',
  },
};

export default meta;

function renderLanguageMenu(args: Partial<HTMLPostLanguageMenuElement>) {
  return html`<post-language-menu
    text-change-language=${args.textChangeLanguage}
    text-current-language=${args.textCurrentLanguage}
    variant=${args.variant}
    type=${args.type}
  >
    <post-language-menu-item active="false" code="de" name="Deutsch">de</post-language-menu-item>
    <post-language-menu-item active="true" code="en" name="English">en</post-language-menu-item>
    <post-language-menu-item active="false" code="fr" name="French">fr</post-language-menu-item>
  </post-language-menu> `;
}

function renderLanguageMenuAsLinks(args: Partial<HTMLPostLanguageMenuElement>) {
  return html`<post-language-menu
    text-change-language=${args.textChangeLanguage}
    text-current-language=${args.textCurrentLanguage}
    variant="menu"
  >
    <post-language-menu-item url="/de" active="false" code="de" name="Deutsch"
      >DE</post-language-menu-item
    >
    <post-language-menu-item url="/en" active="true" code="en" name="English"
      >EN</post-language-menu-item
    >
    <post-language-menu-item url="/fr" active="false" code="fr" name="French"
      >FR</post-language-menu-item
    >
  </post-language-menu> `;
}

// STORIES
type Story = StoryObj<HTMLPostLanguageMenuElement>;

export const Default: Story = {};

export const Links: Story = {
  render: renderLanguageMenuAsLinks,
};
