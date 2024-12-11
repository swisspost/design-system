import { html } from 'lit-html';

export default html`<post-header>
  <!-- Logo -->
  <post-logo>Homepage</post-logo>

  <!-- Meta navigation -->
  <ul class="list-inline" slot="meta-navigation">
    <li><a href="">Über uns</a></li>
    <li><a href="">Jobs</a></li>
  </ul>

  <!-- Menu button for mobile -->
  <post-toggle-button slot="post-togglebutton"> = Menu </post-toggle-button>

  <!-- Language switch -->
  <post-language-switch slot="post-language-switch">
    <post-language-option>
      <a href="#">DE</a>
    </post-language-option>
    <post-language-option>
      <a href="#">FR</a>
    </post-language-option>
    <post-language-option>
      <a href="#">IT</a>
    </post-language-option>
    <post-language-option>
      <a href="#">EN</a>
    </post-language-option>
  </post-language-switch>

  <!-- Application title (optional) -->
  <h1 slot="title">Application title</h1>

  <!-- Custom content (optional) -->
  <ul class="list-inline">
    <li><a href="#">Search</a></li>
    <li><a href="#">Login</a></li>
  </ul>

  <!-- Main navigation -->
  <post-mainnavigation caption="Hauptnavigation">
    <button slot="back-button" class="btn btn-sm btn-tertiary p-0">
      <post-icon aria-hidden="true" name="3024"></post-icon> Back
    </button>
    <post-list title-hidden="">
      <h2>Main Navigation</h2>
      <!-- Link only level 1 -->
      <post-list-item><a href="/briefe">Briefe</a></post-list-item>
      <post-list-item><a href="/pakete">Pakete</a></post-list-item>

      <!-- Level 1 with megadropdown -->
      <post-list-item>
        <post-megadropdown-trigger> Briefe </post-megadropdown-trigger>
        <post-megadropdown>
          <button slot="back-button"><- Zurück</button>
          <h2><a href="">Briefe title</a></h2>
          <post-list>
            <h3>Briefe senden</h3>
            <post-list-item><a href="/sch">Briefe Schweiz</a></post-list-item>
            <post-list-item><a href="/kl">Kleinwaren Ausland</a></post-list-item>
            <post-list-item><a href="">Waren Ausland</a></post-list-item>
            <post-list-item><a href="">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
            <post-list-item><a href="/sch">Pakete Schweiz</a></post-list-item>
            <post-list-item><a href="/kl">Kleinwaren Ausland</a></post-list-item>
            <post-list-item><a href="">Waren Ausland</a></post-list-item>
            <post-list-item><a href="">Express und Kurier</a></post-list-item>
          </post-list>
          <post-closebutton>Schliessen</post-closebutton>
        </post-megadropdown>
      </post-list-item>
      <post-list-item>
        <post-megadropdown-trigger> Pakete </post-megadropdown-trigger>
        <post-megadropdown>
          <button slot="back-button"><- Zurück</button>
          <h2><a href="">Pakete title</a></h2>
          <post-list>
            <h3>Pakete senden</h3>
            <post-list-item><a href="/sch">Pakete Schweiz</a></post-list-item>
            <post-list-item><a href="/kl">Kleinwaren Ausland</a></post-list-item>
            <post-list-item><a href="">Waren Ausland</a></post-list-item>
            <post-list-item><a href="">Express und Kurier</a></post-list-item>
          </post-list>
          <post-list>
            <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
            <post-list-item><a href="/sch">Pakete Schweiz</a></post-list-item>
            <post-list-item><a href="/kl">Kleinwaren Ausland</a></post-list-item>
            <post-list-item><a href="">Waren Ausland</a></post-list-item>
            <post-list-item><a href="">Express und Kurier</a></post-list-item>
          </post-list>
          <post-closebutton>Schliessen</post-closebutton>
        </post-megadropdown>
      </post-list-item>
    </post-list>
  </post-mainnavigation>
</post-header>`;
