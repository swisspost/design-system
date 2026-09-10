import { html, nothing } from 'lit';

export function renderMainnavigation(
  options: { showMegadropdown?: boolean; showActiveLink?: boolean } = {},
) {
  const { showMegadropdown = true, showActiveLink = false } = options;

  const textMainComment = showMegadropdown
    ? html` <!-- textMain best practice: Don't include "navigation", screen readers add it automatically.
         e.g. text-main="Main" → "Main navigation" -->`
    : nothing;
  const linkOnlyComment = showMegadropdown ? html`<!-- Link only level 1 -->` : nothing;
  const activeLinkComment = showActiveLink
    ? html`<!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->`
    : nothing;

  return html`
    <!-- Main navigation -->${textMainComment}
    <post-mainnavigation slot="main-nav" text-main="Main">
      <ul>
        ${linkOnlyComment}
        <li>
          <a href="/letters">Letters</a>
        </li>
        <li>
          ${activeLinkComment}
          <a href="/packages" aria-current=${showActiveLink ? 'page' : nothing}>Packages</a>
        </li>

        ${
          showMegadropdown
            ? html`
                <!-- Level 1 with megadropdown -->
                <li>
                  <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
                  <post-megadropdown id="letters" text-close="Close" text-back="Back">
                    <a class="post-megadropdown-overview" href="/letters">Overview Letters</a>

                    <div class="post-megadropdown-grid">
                      <div>
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
                      <div>
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
                  <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
                  <post-megadropdown id="packages" text-close="Close" text-back="Back">
                    <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>

                    <div class="post-megadropdown-grid">
                      <div>
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
                      <div>
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
              `
            : nothing
        }
      </ul>
    </post-mainnavigation>
  `;
}
