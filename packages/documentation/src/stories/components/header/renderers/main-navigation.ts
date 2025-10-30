import { html } from 'lit';

export function renderMainnavigation() {
  return html`
    <!-- Main navigation -->
    <post-mainnavigation slot="post-mainnavigation" caption="Main navigation">
      <post-list title-hidden="">
        <h2>Main Navigation</h2>
        <!-- Link only level 1 -->
        <post-list-item slot="post-list-item">
          <a href="/letters">Letters</a>
        </post-list-item>
        <post-list-item slot="post-list-item">
          <a href="/packages">Packages</a>
        </post-list-item>

        <!-- Level 1 with megadropdown -->
        <post-list-item slot="post-list-item">
          <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
          <post-megadropdown id="letters">
            <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
              <post-icon name="arrowleft"></post-icon>
              Back
            </button>
            <post-closebutton slot="close-button">Close</post-closebutton>
            <h2 slot="megadropdown-title">Letters title</h2>
            <a slot="megadropdown-overview-link" href="/letters">Overview Letters</a>
            <post-list>
              <h3>Send letters</h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Letters Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
            <post-list>
              <h3><a href="/step-by-step">Step by step</a></h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Packages Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
          </post-megadropdown>
        </post-list-item>
        <post-list-item slot="post-list-item">
          <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
          <post-megadropdown id="packages">
            <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
              <post-icon name="arrowleft"></post-icon>
              Back
            </button>
            <post-closebutton slot="close-button">Close</post-closebutton>
            <h2 slot="megadropdown-title">Packages title</h2>
            <a slot="megadropdown-overview-link" href="/packages">Overview Packages</a>
            <post-list>
              <h3>Send packages</h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Packages Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
            <post-list>
              <h3><a href="/step-by-step">Step by step</a></h3>
              <post-list-item slot="post-list-item">
                <a href="/sch">Packages Switzerland</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="/kl">Small items abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Goods abroad</a>
              </post-list-item>
              <post-list-item slot="post-list-item">
                <a href="">Express and courier</a>
              </post-list-item>
            </post-list>
          </post-megadropdown>
        </post-list-item>
      </post-list>
    </post-mainnavigation>
  `;
}
