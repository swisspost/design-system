import { html, nothing } from 'lit';

export function renderLanguageMenu(config?: { omitSlot: true }) {
  return html`
    ${config?.omitSlot ? nothing : html`<!-- Language menu -->`}
    <post-language-menu
      slot=${config?.omitSlot ? nothing : 'language-menu'}
      text-change-language="Change the language"
      text-current-language="The currently selected language is {name}."
      name="language-menu-example"
    >
      <post-language-menu-item code="de" name="German">de</post-language-menu-item>
      <post-language-menu-item code="fr" name="French">fr</post-language-menu-item>
      <post-language-menu-item code="it" name="Italian">it</post-language-menu-item>
      <post-language-menu-item active="true" code="en" name="English">en</post-language-menu-item>
    </post-language-menu>
  `;
}
