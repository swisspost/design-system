import { useState } from 'react';
import { Source } from '@storybook/addon-docs';

const code = `
  <!-- Meta navigation -->
  <ul class="list-inline" slot="meta-navigation">
    <li><a href="">Jobs</a></li>
    <li><a href="">Über uns</a></li>
  </ul>

  <!-- Menu button for mobile -->
  <post-togglebutton slot="post-togglebutton">
    <span class="visually-hidden-sm">Menu</span>
    <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
    <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
  </post-togglebutton>

  <!-- Language switch -->
  <post-language-switch
    caption="Change the language"
    description="The currently selected language is English."
    variant="list"
    name="language-switch-example"
    slot="post-language-switch"
  >
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
        <span class="visually-hidden-sm">Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
      </a>
    </li>
    <li>
      <a href="#">
        <span class="visually-hidden-sm">Login</span>
        <post-icon aria-hidden="true" name="login"></post-icon>
      </a>
    </li>
  </ul>

  <!-- Main navigation -->
  <post-mainnavigation caption="Hauptnavigation">
    <button type="button" slot="back-button" class="btn btn-sm btn-tertiary">
      <post-icon aria-hidden="true" name="arrowright"></post-icon> Back
    </button>
    <post-list title-hidden="">
      <h2>Main Navigation</h2>
      <!-- Link only level 1 -->
      <post-list-item slot="post-list-item"><a href="/briefe">Briefe</a></post-list-item>
      <post-list-item slot="post-list-item"><a href="/pakete">Pakete</a></post-list-item>

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
          <post-list>
            <h3>Briefe senden</h3>
            <post-list-item slot="post-list-item"><a href="/sch">Briefe Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="/kl">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
            <post-list-item slot="post-list-item"><a href="/sch">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="/kl">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="">Express und Kurier</a></post-list-item>
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
          <post-list>
            <h3>Pakete senden</h3>
            <post-list-item slot="post-list-item"><a href="/sch">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="/kl">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
            <post-list-item slot="post-list-item"><a href="/sch">Pakete Schweiz</a></post-list-item>
            <post-list-item slot="post-list-item"
              ><a href="/kl">Kleinwaren Ausland</a></post-list-item
            >
            <post-list-item slot="post-list-item"><a href="">Waren Ausland</a></post-list-item>
            <post-list-item slot="post-list-item"><a href="">Express und Kurier</a></post-list-item>
          </post-list>
        </post-megadropdown>
      </post-list-item>
    </post-list>
  </post-mainnavigation>
`;

const angularExample = `
<post-header>
  <!-- Logo -->
  <a routerLink="path" slot="post-logo"><post-logo></post-logo></a>
  ${code}
</post-header>
`;

const codeReact = code
  .replace(/<post-logo/g, '<PostLogo')
  .replace(/<\/post-logo/g, '</PostLogo')
  .replace(/<post-togglebutton/g, '<PostTogglebutton')
  .replace(/<\/post-togglebutton/g, '</PostTogglebutton')
  .replace(/<post-icon/g, '<PostIcon')
  .replace(/<\/post-icon/g, '</PostIcon')
  .replace(/<post-language-switch/g, '<PostLanguageSwitch')
  .replace(/<\/post-language-switch/g, '</PostLanguageSwitch')
  .replace(/<post-language-option/g, '<PostLanguageOption')
  .replace(/<\/post-language-option/g, '</PostLanguageOption')
  .replace(/<post-mainnavigation/g, '<PostMainnavigation')
  .replace(/<\/post-mainnavigation/g, '</PostMainnavigation')
  .replace(/<post-list/g, '<PostList')
  .replace(/<\/post-list/g, '</PostList')
  .replace(/<post-list-item/g, '<PostListItem')
  .replace(/<\/post-list-item/g, '</PostListItem')
  .replace(/<post-megadropdown-trigger/g, '<PostMegadropdownTrigger')
  .replace(/<\/post-megadropdown-trigger/g, '</PostMegadropdownTrigger')
  .replace(/<post-megadropdown/g, '<PostMegadropdown')
  .replace(/<\/post-megadropdown/g, '</PostMegadropdown')
  .replace(/<post-closebutton/g, '<PostClosebutton')
  .replace(/<\/post-closebutton/g, '</PostClosebutton');

const reactExample = `
<PostHeader>
  <!-- Logo -->
  <Link to="/path" slot="post-logo"><post-logo>Homepage</post-logo></Link>
  ${codeReact.replace(/<a href="/g, '<Link to="').replace(/<\/a>/g, '</Link>')}
</PostHeader>
`;

const nextJsExample = `
<PostHeader>
  <!-- Logo -->
  <Link href="/path" slot="post-logo"><post-logo>Homepage</post-logo></Link>
  ${codeReact.replace(/<a href="/g, '<Link href="').replace(/<\/a>/g, '</Link>')}
</PostHeader>
`;

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
      <label>
        Select Framework:
        <select
          className="ms-12 mb-16"
          value={framework}
          onChange={e => setFramework(e.target.value)}
        >
          <option value="angular">Angular</option>
          <option value="react">React</option>
          <option value="nextjs">Next.js</option>
        </select>
      </label>
      <Source code={getExampleCode()} language="html" />
    </div>
  );
};

export default ExampleComponent;
