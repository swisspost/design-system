import { html } from 'lit';

export function renderMainnavigation() {
  return html`
    <!-- Main navigation -->
    <!-- Caption best practice: Don't include "navigation", screen readers add it automatically.
         e.g. caption="Main" → "Main navigation" -->
    <post-mainnavigation slot="main-nav" caption="Main">
      <ul>
        <!-- Link only level 1 -->
        <li>
          <a href="/letters">Letters</a>
        </li>
        <li>
          <a href="/packages">Packages</a>
        </li>

        <!-- Level 1 with megadropdown -->
        <li>
          <post-megadropdown-trigger for="letters">
            <button>Letters</button>
          </post-megadropdown-trigger>
          <post-megadropdown id="letters" label-close="Close" label-back="Back">
            <a class="post-megadropdown-overview" href="/letters">Overview Letters</a>

            <div class="row row-cols-1 row-cols-sm-2">
              <div class="col">
                <p class="post-megadropdown-list-title" id="send-letters">Send letters</p>
                <ul class="post-megadropdown-list" aria-labelledby="send-letters">
                  <li>
                    <a href="/sch">Letters Switzerland</a>
                  </li>
                  <li>
                    <a href="/kl">Small items abroad</a>
                  </li>
                  <li>
                    <a href="">Goods abroad</a>
                  </li>
                  <li>
                    <a href="">Express and courier</a>
                  </li>
                </ul>
              </div>
              <div class="col">
                <a
                  class="post-megadropdown-list-title"
                  id="step-by-step-letters"
                  href="/step-by-step"
                >Step by step</a
                >
                <ul class="post-megadropdown-list" aria-labelledby="step-by-step-letters">
                  <li>
                    <a href="/sch">Packages Switzerland</a>
                  </li>
                  <li>
                    <a href="/kl">Small items abroad</a>
                  </li>
                  <li>
                    <a href="">Goods abroad</a>
                  </li>
                  <li>
                    <a href="">Express and courier</a>
                  </li>
                </ul>
              </div>
            </div>
          </post-megadropdown>
        </li>
        <li>
          <post-megadropdown-trigger for="packages">
            <button>Packages</button>
          </post-megadropdown-trigger>
          <post-megadropdown id="packages" label-close="Close" label-back="Back">
            <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>

            <div class="row row-cols-1 row-cols-sm-2">
              <div class="col">
                <p class="post-megadropdown-list-title" id="send-packages">Send packages</p>
                <ul class="post-megadropdown-list" aria-labelledby="send-packages">
                  <li>
                    <a href="/sch">Packages Switzerland</a>
                  </li>
                  <li>
                    <a href="/kl">Small items abroad</a>
                  </li>
                  <li>
                    <a href="">Goods abroad</a>
                  </li>
                  <li>
                    <a href="">Express and courier</a>
                  </li>
                </ul>
              </div>
              <div class="col">
                <a
                  class="post-megadropdown-list-title"
                  id="step-by-step-packages"
                  href="/step-by-step"
                >Step by step</a
                >
                <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
                  <li>
                    <a href="/sch">Packages Switzerland</a>
                  </li>
                  <li>
                    <a href="/kl">Small items abroad</a>
                  </li>
                  <li>
                    <a href="">Goods abroad</a>
                  </li>
                  <li>
                    <a href="">Express and courier</a>
                  </li>
                </ul>
              </div>
            </div>
          </post-megadropdown>
        </li>
      </ul>
    </post-mainnavigation>
  `;
}
