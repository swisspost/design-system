import { html } from 'lit';

export const linkOnly = html`
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="letter" aria-hidden="true"></post-icon>
      Letters
    </a>
  </li>
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="onlineservice" aria-hidden="true"></post-icon>
      Online service
    </a>
  </li>
  <li>
    <a href="#" class="post-sidenavigation-item">
      <post-icon name="search" aria-hidden="true"></post-icon>
      Search
    </a>
  </li>
`;

// Nested but not collapsible — children always visible.
// Parent can be a link or a non-clickable span.
export const nested = html`
  <li>
    <a href="#" class="post-sidenavigation-item">Sidenav link</a>
    <ul>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
    </ul>
  </li>
  <li>
    <span class="post-sidenavigation-item">Not clickable level 1</span>
    <ul>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
      <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
    </ul>
  </li>
`;

// Collapsible but not linked — button only, no link on level 1.
// Collapsible is a child of the trigger (nested structure, no for/id).
export const collapsibleNotLinked = html`
  <li>
    <post-collapsible-trigger>
      <button class="post-sidenavigation-item">
        Level 1
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
          <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
  <li>
    <post-collapsible-trigger>
      <button class="post-sidenavigation-item">
        Level 1
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
          <li><a href="#" class="post-sidenavigation-item">Level 2</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
`;

// Collapsible and linked — link + separate button inside trigger on level 1.
// The link is part of a wrapper div with the button. Collapsible is a child of trigger.
export const collapsibleLinked = html`
  <li>
    <post-collapsible-trigger>
      <div class="post-sidenavigation-item">
        <post-icon name="letterreceived" aria-hidden="true"></post-icon>
        <a href="#">Sidenav link</a>
        <button>
          <span class="visually-hidden">Expand Sidenav link</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </div>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
          <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
  <li>
    <post-collapsible-trigger>
      <div class="post-sidenavigation-item">
        <post-icon name="postoneweb" aria-hidden="true"></post-icon>
        <a href="#">Sidenav link</a>
        <button>
          <span class="visually-hidden">Expand Sidenav link</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </div>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
          <li><a href="#" class="post-sidenavigation-item">Child link</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
`;
