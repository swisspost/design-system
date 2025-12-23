import { useState } from 'react';
import { Source } from '@storybook/addon-docs/blocks';

const code = `
<post-header text-menu="Menu">

  <!-- Logo -->
  {{logoLink}}

  <!-- Meta navigation -->
  <ul slot="global-nav-secondary">
    <li><a href="#">Jobs</a></li>
    <li><a href="#">Über uns</a></li>
  </ul>

  <!-- Language switch -->
  <post-language-menu
    caption="Change the language"
    description="The currently selected language is English."
    variant="list"
    name="language-menu-example"
    slot="language-menu">
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
  <post-mainnavigation slot="main-nav" caption="Haupt">
    <ul>
      <!-- Link only level 1 -->
      <li><a href="#">Briefe</a></li>
      <li><a href="#">Pakete</a></li>

      <!-- Level 1 with megadropdown -->
      <li>
        <post-megadropdown-trigger for="briefe">Briefe</post-megadropdown-trigger>
        <post-megadropdown id="briefe" label-close="Schliessen" label-back="Back">
          <a class="post-megadropdown-overview" href="/briefe">Übersicht Briefe</a>
          <div class="row row-cols-1 row-cols-sm-2">
            <div class="col">
              <p class="post-megadropdown-list-title" id="send-letters">Briefe senden</p>
              <ul class="post-megadropdown-list" aria-labelledby="send-letters">
                <li><a href="/sch">Briefe Schweiz</a></li>
                <li><a href="/kl">Kleinwaren Ausland</a></li>
                <li><a href="">Waren Ausland</a></li>
                <li><a href="">Express und Kurier</a></li>
              </ul>
            </div>
            <div class="col">
              <a
                class="post-megadropdown-list-title"
                id="step-by-step-letters"
                href="/schritt-für-schritt"
                >Schritt für Schritt</a
              >
              <ul class="post-megadropdown-list" aria-labelledby="step-by-step-letters">
                <li><a href="/sch">Pakete Schweiz</a></li>
                <li><a href="/kl">Kleinwaren Ausland</a></li>
                <li><a href="">Waren Ausland</a></li>
                <li><a href="">Express und Kurier</a></li>
              </ul>
            </div>
          </div>
        </post-megadropdown>
      </li>
      <li>
        <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
        <post-megadropdown id="pakete" label-close="Schliessen" label-back="Back">
          <a class="post-megadropdown-overview" href="/pakete">Übersicht Pakete</a>
          <div class="row row-cols-1 row-cols-sm-2">
            <div class="col">
              <p class="post-megadropdown-list-title" id="send-packages">Pakete senden</p>
              <ul class="post-megadropdown-list" aria-labelledby="send-packages">
                <li><a href="/sch">Pakete Schweiz</a></li>
                <li><a href="/kl">Kleinwaren Ausland</a></li>
                <li><a href="">Waren Ausland</a></li>
                <li><a href="">Express und Kurier</a></li>
              </ul>
            </div>
            <div class="col">
              <a
                class="post-megadropdown-list-packages"
                id="step-by-step-packages"
                href="/schritt-für-schritt"
                >Schritt für Schritt</a
              >
              <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
                <li><a href="/sch">Pakete Schweiz</a></li>
                <li><a href="/kl">Kleinwaren Ausland</a></li>
                <li><a href="">Waren Ausland</a></li>
                <li><a href="">Express und Kurier</a></li>
              </ul>
            </div>
          </div>
        </post-megadropdown>
      </li>
    </ul>
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
