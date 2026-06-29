import { html } from 'lit';

const sideNavId = 'header-sidenav';

export function renderSideNavTrigger() {
  return html`
    <!-- Side navigation trigger -->
    <post-side-navigation-trigger slot="side-nav" for="${sideNavId}">
      <button>
        <span>Menu</span>
        <post-icon aria-hidden="true" name="burger"></post-icon>
      </button>
    </post-side-navigation-trigger>
  `;
}

export function renderSideNavigation() {
  return html`
    <!-- Side navigation -->
    <post-side-navigation id="${sideNavId}" text-close="Close">
      <nav aria-label="Main navigation">
        <h2 class="post-side-navigation-heading">Section title (optional)</h2>
        <ul>
          <li>
            <a href="#" class="post-side-navigation-item">Level 1</a>
            <ul>
              <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
              <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
            </ul>
          </li>
          <li>
            <a href="#" class="post-side-navigation-item">Level 1</a>
          </li>
        </ul>
        <h2 class="post-side-navigation-heading">Section title (optional)</h2>
        <ul>
          <li>
            <post-collapsible-trigger>
              <button class="post-side-navigation-item">
                Level 1
                <post-icon name="chevrondown" aria-hidden="true"></post-icon>
              </button>
              <post-collapsible collapsed>
                <ul>
                  <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
                  <li><a href="#" class="post-side-navigation-item">Level 2</a></li>
                </ul>
              </post-collapsible>
            </post-collapsible-trigger>
          </li>
        </ul>
      </nav>
    </post-side-navigation>
  `;
}