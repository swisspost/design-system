import { html } from 'lit';

export function renderMainnavigation() {
  return html`
    <!-- Main navigation -->
    <post-mainnavigation slot="post-mainnavigation" caption="Main navigation">
      <post-list title-hidden="">
        <p>Main Navigation</p>
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
          <post-megadropdown id="letters" closeLabel="Close" backLabel="Back">
            <p class="megadropdown-overview-link">
              <a href="/letters">Overview Letters</a>
            </p>
            <post-list>
              <p>Send letters</p>
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
              <p><a href="/step-by-step">Step by step</a></p>
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
            <p class="megadropdown-overview-link" closeLabel="Close" backLabel="Back">
              <a href="/packages">Overview Packages</a>
            </p>
            <post-list>
              <p>Send packages</p>
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
              <p><a href="/step-by-step">Step by step</a></p>
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
