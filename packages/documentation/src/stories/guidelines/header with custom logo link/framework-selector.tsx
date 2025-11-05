import { useState } from 'react';
import { Source } from '@storybook/addon-docs/blocks';

const code = `
<post-header>

  <!-- Logo -->
  {{logoLink}}

  <!-- Meta navigation -->
  <ul class="list-inline" slot="meta-navigation">
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
  <post-language-switch
    caption="Change the language"
    description="The currently selected language is English."
    variant="list"
    name="language-switch-example"
    slot="post-language-switch">
    <post-language-option active="false" code="de" name="Deutsch">de</post-language-option>
    <post-language-option active="false" code="fr" name="French">fr</post-language-option>
    <post-language-option active="false" code="it" name="Italiano">it</post-language-option>
    <post-language-option active="true" code="en" name="English">en</post-language-option>
  </post-language-switch>

  <!-- Application title (optional) -->
  <h1 slot="title">Application title</h1>

  <!-- Custom content (optional) -->
  <ul class="list-inline">
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
  <post-mainnavigation caption="Hauptnavigation">
    <post-list title-hidden="">
      <h2>Main Navigation</h2>
      <!-- Link only level 1 -->
      <post-list-item slot="post-list-item"><a href="#">Briefe</a></post-list-item>
      <post-list-item slot="post-list-item"><a href="#">Pakete</a></post-list-item>

      <!-- Level 1 with megadropdown -->
      <post-list-item slot="post-list-item">
        <post-megadropdown-trigger for="briefe">Briefe</post-megadropdown-trigger>
        <post-megadropdown id="briefe">
          <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
            <post-icon name="arrowright"></post-icon>
            Back
          </button>
          <post-closebutton slot="close-button">Schliessen</post-closebutton>
          <h2 slot="megadropdown-title">Briefe title</h2>
          <a slot="megadropdown-overview-link" href="/briefe">Übersicht Briefe</a>
          <post-list>
            <h3>Briefe senden</h3>
            <post-list-item slot="post-list-item"><a href="#">Briefe Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="#">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="#">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="#">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <h3><a href="#">Schritt für Schritt</a></h3>
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
        <post-megadropdown id="pakete">
          <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
            <post-icon name="arrowright"></post-icon>
            Back
          </button>
          <post-closebutton slot="close-button">Schliessen</post-closebutton>
          <h2 slot="megadropdown-title">Pakete title</h2>
          <a slot="megadropdown-overview-link" href="/pakete">Übersicht Pakete</a>
          <post-list>
            <h3>Pakete senden</h3>
            <post-list-item slot="post-list-item"><a href="#">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="#">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="#">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="#">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <h3><a href="#">Schritt für Schritt</a></h3>
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
