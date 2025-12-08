import { useState } from 'react';
import { Source } from '@storybook/addon-docs/blocks';

const code = `
<post-header>

  <!-- Logo -->
  {{logoLink}}

  <!-- Meta navigation -->
  <ul slot="meta-navigation">
    <li><a href="#">Jobs</a></li>
    <li><a href="#">Über uns</a></li>
  </ul>

  <!-- Menu button mobile -->
  <post-togglebutton slot="post-togglebutton">
    <span>Menu</span>
    <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
    <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
  </post-togglebutton>

  <!-- Language switch -->
  <post-language-menu
    caption="Change the language"
    description="The currently selected language is English."
    variant="list"
    name="language-menu-example"
    slot="post-language-switch">
    <post-language-menu-item active="false" code="de" name="Deutsch">de</post-language-menu-item>
    <post-language-menu-item active="false" code="fr" name="French">fr</post-language-menu-item>
    <post-language-menu-item active="false" code="it" name="Italiano">it</post-language-menu-item>
    <post-language-menu-item active="true" code="en" name="English">en</post-language-menu-item>
  </post-language-menu>

  <!-- Application title (optional) -->
  <p slot="title">Application title</p>

  <!-- Custom content (optional) -->
  <ul slot="local-nav">
    <li>
      <a href="#">
        <span>Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
      </a>
    </li>
    <li>
      <a href="#">
        <span>Login</span>
        <post-icon aria-hidden="true" name="login"></post-icon>
      </a>
    </li>
  </ul>

  <!-- Main navigation -->
  <post-mainnavigation slot="post-mainnavigation" caption="Hauptnavigation">
    <post-list title-hidden="">
      <p>Main Navigation</p>
      <!-- Link only level 1 -->
      <post-list-item slot="post-list-item"><a href="#">Briefe</a></post-list-item>
      <post-list-item slot="post-list-item"><a href="#">Pakete</a></post-list-item>

      <!-- Level 1 with megadropdown -->
      <post-list-item slot="post-list-item">
        <post-megadropdown-trigger for="briefe">Briefe</post-megadropdown-trigger>
        <post-megadropdown id="briefe" closeLabel="Schliessen" backLabel="Back">
          <p class="megadropdown-overview-link">
            <a href="/briefe">Übersicht Briefe</a>
          </p>
          <post-list>
            <p>Briefe senden</p>
            <post-list-item slot="post-list-item"><a href="#">Briefe Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="#">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="#">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="#">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <p><a href="#">Schritt für Schritt</a></p>
            <post-list-item slot="post-list-item"><a href="#">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="#">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="#">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="#">Express und Kurier</a></post-list-item>
          </post-list>
        </post-megadropdown>
      </post-list-item>
      <post-list-item slot="post-list-item">
        <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
        <post-megadropdown id="pakete" closeLabel="Schliessen" backLabel="Back">
          <p class="megadropdown-overview-link">
            <a href="/pakete">Übersicht Pakete</a>
          </p>
          <post-list>
            <p>Pakete senden</p>
            <post-list-item slot="post-list-item"><a href="#">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="#">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="#">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="#">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <p><a href="#">Schritt für Schritt</a></p>
            <post-list-item slot="post-list-item"><a href="#">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="#">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="#">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="#">Express und Kurier</a></post-list-item>
          </post-list>
        </post-megadropdown>
      </post-list-item>
    </post-list>
  </post-mainnavigation>
</post-header>
`;

const extractPostTags = (html: string): string[] => {
  // Match full tag names like <post-list-item> and </post-list-item>, excluding the '/'
  const postTagRegex = /<\/?post-[a-zA-Z0-9-]+/g;
  const matches = html.match(postTagRegex);
  const uniqueTags = new Set(
    matches
      ? matches.map(tag =>
          tag
            .replace(/(^\/|\/$)/g, '')
            .slice(1)
            .replace(/[^a-zA-Z0-9-]/g, ''),
        )
      : [],
  );
  return Array.from(uniqueTags);
};

const toPascalCase = (tag: string): string => {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const replaceTagsWithPascalCase = (html: string): string => {
  const tags = extractPostTags(html);
  const tagPairs = tags.map(tag => [tag, toPascalCase(tag)]);

  tagPairs.forEach(([originalTag, pascalTag]) => {
    const regex = new RegExp(`(<\\/?${originalTag})(\\s|>)`, 'g');
    html = html.replace(regex, match => {
      let result;
      if (match.startsWith('</')) {
        result = `</${pascalTag}${match.endsWith('>') ? '>' : ' '}`;
      } else {
        result = `<${pascalTag}${match.endsWith('>') ? '>' : ' '}`;
      }

      return result;
    });
  });
  return html;
};

const htmlToJsx = (code: string): string => {
  const updatedHtml = replaceTagsWithPascalCase(code)
    .replace(/\bclass\b/g, 'className')
    .replace(/\bfor\b/g, 'htmlFor')
    .replace(/<a href="/g, '<Link to="')
    .replace(/<\/a>/g, '</Link>');
  return updatedHtml;
};

const jsxCode = htmlToJsx(code);
const nextjsCode = htmlToJsx(code).replace(/to="/g, 'href="');

const angularLink = `<a routerLink="#" slot="post-logo"><post-logo>Homepage</post-logo></a>`;
const reactLink = `<Link to="#" slot="post-logo"><PostLogo>Homepage</PostLogo></Link>`;
const nextJsLink = `<Link href="#" slot="post-logo"><PostLogo>Homepage</PostLogo></Link>`;

const injectLogoLink = (html: string, logoLink: string) => {
  return html.replace('{{logoLink}}', logoLink);
};

const angularExample = injectLogoLink(code, angularLink);
const reactExample = injectLogoLink(jsxCode, reactLink);
const nextJsExample = injectLogoLink(nextjsCode, nextJsLink);

const ExampleComponent = () => {
  const [framework, setFramework] = useState('angular');

  const getExampleCode = () => {
    switch (framework) {
      case 'angular':
        return angularExample;
      case 'react':
        return reactExample;
      case 'nextjs':
        return nextJsExample;
      default:
        return angularExample;
    }
  };

  return (
    <div>
      <div className="form-floating">
        <select
          className="form-select"
          id="framework-label"
          onChange={e => setFramework(e.target.value)}
        >
          <option value="angular">Angular</option>
          <option value="react">React</option>
          <option value="nextjs">Next.js</option>
        </select>
        <label className="form-label" htmlFor="framework-label">
          Select a js framework:
        </label>
      </div>
      <div className="mt-24">
        <Source code={getExampleCode()} language="html" />
      </div>
    </div>
  );
};

export default ExampleComponent;
