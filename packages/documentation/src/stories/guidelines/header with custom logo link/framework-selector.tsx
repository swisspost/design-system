import React, { useState, useEffect } from 'react';
import { Source } from '@storybook/addon-docs';

const angularExample = `
<post-header>

  <!-- Logo -->
  <a routerLink="card-control" slot="post-logo"><post-logo></post-logo></a>

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
</post-header>`;

const reactExample = `
<PostHeader>

  <!-- Logo -->
  <Link to="/path" class="h-full p-0 d-inline-block" slot="post-logo"><post-logo>Homepage</post-logo></Link>

  <ul className="list-inline" slot="meta-navigation">
    <li>
      <Link to="">Jobs</Link>
    </li>
    <li>
      <Link to="">Über uns</Link>
    </li>
  </ul>

  <!-- Menu button for mobile -->
  <PostTogglebutton slot="post-togglebutton">
    <span className="visually-hidden-sm">Menu</span>
    <PostIcon aria-hidden="true" name="burger" data-showwhen="untoggled"></PostIcon>
    <PostIcon aria-hidden="true" name="closex" data-showwhen="toggled"></PostIcon>
  </PostTogglebutton>

  <!-- Language switch -->
  <PostLanguageSwitch
  caption="Change the language"
  description="The currently selected language is English."
  variant="list"
  slot="post-language-switch"
  >
    <PostLanguageOption active={false} code="de" name="Deutsch">
      de
    </PostLanguageOption>
    <PostLanguageOption active={false} code="fr" name="French">
      fr
    </PostLanguageOption>
    <PostLanguageOption active={false} code="it" name="Italiano">
      it
    </PostLanguageOption>
    <PostLanguageOption active={true} code="en" name="English">
      en
    </PostLanguageOption>
  </PostLanguageSwitch>

  <!-- Application title (optional) -->
  <h1 slot="title">Application title</h1>

 <!-- Custom content (optional) -->
  <ul class="list-inline">
    <li>
      <Link to="#">
        <span class="visually-hidden-sm">Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
       </Link>
    </li>
    <li>
       <Link to="#">
        <span class="visually-hidden-sm">Login</span>
        <post-icon aria-hidden="true" name="login"></post-icon>
      </Link>
    </li>
  </ul>

  <!-- Main navigation -->
  <PostMainnavigation>
  <button type="button" slot="back-button" className="btn btn-sm btn-tertiary">
    <PostIcon aria-hidden="true" name="arrowright"></PostIcon> Back
  </button>
  <PostList title-hidden="">
    <h2>Main Navigation</h2>

    <!-- Level 1 with megadropdown -->
    <PostListItem slot="post-list-item">
      <Link to="/home">Briefe</Link>
    </PostListItem>
    <PostListItem slot="post-list-item">
      <Link to="/other">Pakete</Link>
    </PostListItem>
    <PostListItem slot="post-list-item">
      <PostMegadropdownTrigger for="briefe">Briefe</PostMegadropdownTrigger>
      <PostMegadropdown id="briefe">
        <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
          <PostIcon name="arrowright"></PostIcon>
          Back
        </button>
        <PostClosebutton slot="close-button">Schliessen</PostClosebutton>
        <h2 slot="megadropdown-title">Briefe title</h2>
        <PostList>
          <h3>Briefe senden</h3>
          <PostListItem slot="post-list-item">
            <Link to="/sch">Briefe Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
        <PostList>
          <h3>
            <Link to="/schritt-für-schritt">Schritt für Schritt</Link>
          </h3>
          <PostListItem slot="post-list-item">
            <Link to="/sch">Pakete Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
      </PostMegadropdown>
    </PostListItem>
    <PostListItem slot="post-list-item">
      <PostMegadropdownTrigger for="pakete">Pakete</PostMegadropdownTrigger>
      <PostMegadropdown id="pakete">
        <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
          <PostIcon name="arrowright"></PostIcon>
          Back
        </button>
        <PostClosebutton slot="close-button">Schliessen</PostClosebutton>
        <h2 slot="megadropdown-title">Pakete title</h2>
        <PostList>
          <h3>Pakete senden</h3>
          <PostListItem slot="post-list-item">
            <Link to="/sch">Pakete Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
        <PostList>
          <h3>
            <Link to="/schritt-für-schritt">Schritt für Schritt</Link>
          </h3>
          <PostListItem slot="post-list-item">
            <Link to="/sch">Pakete Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link to="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
      </PostMegadropdown>
    </PostListItem>
  </PostList>
</PostMainnavigation>
</PostHeader>`;

const nextjsExample = `
<PostHeader>

  <!-- Logo -->
  <Link href="/path" class="h-full p-0 d-inline-block" slot="post-logo"><post-logo>Homepage</post-logo></Link>

  <ul className="list-inline" slot="meta-navigation">
     <li>
      <Link href="">Jobs</Link>
    </li>
    <li>
      <Link href="">Über uns</Link>
    </li>
  </ul>

  <!-- Menu button for mobile -->
  <PostTogglebutton slot="post-togglebutton">
    <span className="visually-hidden-sm">Menu</span>
    <PostIcon aria-hidden="true" name="burger" data-showwhen="untoggled"></PostIcon>
    <PostIcon aria-hidden="true" name="closex" data-showwhen="toggled"></PostIcon>
  </PostTogglebutton>

  <!-- Language switch -->
  <PostLanguageSwitch
  caption="Change the language"
  description="The currently selected language is English."
  variant="list"
  slot="post-language-switch"
  >
    <PostLanguageOption active={false} code="de" name="Deutsch">
      de
    </PostLanguageOption>
    <PostLanguageOption active={false} code="fr" name="French">
      fr
    </PostLanguageOption>
    <PostLanguageOption active={false} code="it" name="Italiano">
      it
    </PostLanguageOption>
    <PostLanguageOption active={true} code="en" name="English">
      en
    </PostLanguageOption>
  </PostLanguageSwitch>

  <!-- Application title (optional) -->
  <h1 slot="title">Application title</h1>

  <!-- Custom content (optional) -->
  <ul class="list-inline">
    <li>
      <Link href="#">
        <span class="visually-hidden-sm">Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
       </Link>
    </li>
    <li>
       <Link href="#">
        <span class="visually-hidden-sm">Login</span>
        <post-icon aria-hidden="true" name="login"></post-icon>
      </Link>
    </li>
  </ul>

  <!-- Main navigation -->
  <PostMainnavigation>
  <button type="button" slot="back-button" className="btn btn-sm btn-tertiary">
    <PostIcon aria-hidden="true" name="arrowright"></PostIcon> Back
  </button>
  <PostList title-hidden="">
    <h2>Main Navigation</h2>

    <!-- Level 1 with megadropdown -->
    <PostListItem slot="post-list-item">
      <Link href="/home">Briefe</Link>
    </PostListItem>
    <PostListItem slot="post-list-item">
      <Link href="/other">Pakete</Link>
    </PostListItem>
    <PostListItem slot="post-list-item">
      <PostMegadropdownTrigger for="briefe">Briefe</PostMegadropdownTrigger>
      <PostMegadropdown id="briefe">
        <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
          <PostIcon name="arrowright"></PostIcon>
          Back
        </button>
        <PostClosebutton slot="close-button">Schliessen</PostClosebutton>
        <h2 slot="megadropdown-title">Briefe title</h2>
        <PostList>
          <h3>Briefe senden</h3>
          <PostListItem slot="post-list-item">
            <Link href="/sch">Briefe Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
        <PostList>
          <h3>
            <Link href="/schritt-für-schritt">Schritt für Schritt</Link>
          </h3>
          <PostListItem slot="post-list-item">
            <Link href="/sch">Pakete Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
      </PostMegadropdown>
    </PostListItem>
    <PostListItem slot="post-list-item">
      <PostMegadropdownTrigger for="pakete">Pakete</PostMegadropdownTrigger>
      <PostMegadropdown id="pakete">
        <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
          <PostIcon name="arrowright"></PostIcon>
          Back
        </button>
        <PostClosebutton slot="close-button">Schliessen</PostClosebutton>
        <h2 slot="megadropdown-title">Pakete title</h2>
        <PostList>
          <h3>Pakete senden</h3>
          <PostListItem slot="post-list-item">
            <Link href="/sch">Pakete Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
        <PostList>
          <h3>
            <Link href="/schritt-für-schritt">Schritt für Schritt</Link>
          </h3>
          <PostListItem slot="post-list-item">
            <Link href="/sch">Pakete Schweiz</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/kl">Kleinwaren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Waren Ausland</Link>
          </PostListItem>
          <PostListItem slot="post-list-item">
            <Link href="/">Express und Kurier</Link>
          </PostListItem>
        </PostList>
      </PostMegadropdown>
    </PostListItem>
  </PostList>
  </PostMainnavigation>
</PostHeader>`;

const defaultExample = `
<post-header>

  <!-- Logo -->
  <post-logo slot="post-logo" url="/">Homepage</post-logo>

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
</post-header>`;

const FrameworkSelector = () => {
  const [framework, setFramework] = useState('none');
  const [headerCode, setHeaderCode] = useState('');

  const handleFrameworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFramework(event.target.value);
  };

  useEffect(() => {
    switch (framework) {
      case 'angular':
        setHeaderCode(angularExample);
        console.log();
        break;
      case 'react':
        setHeaderCode(reactExample);
        break;
      case 'nextjs':
        setHeaderCode(nextjsExample);
        break;
      default:
        setHeaderCode(defaultExample);
    }
  }, [framework]);

  return (
    <div>
      <h5 className="mb-24">Select js framework:</h5>
      <div className="mb-24">
        <select onChange={handleFrameworkChange} value={framework}>
          <option value="none">None</option>
          <option value="angular">Angular</option>
          <option value="react">React</option>
          <option value="nextjs">Next.js</option>
        </select>
      </div>
      <Source code={headerCode} dark={true} language="html" />
    </div>
  );
};

export default FrameworkSelector;
