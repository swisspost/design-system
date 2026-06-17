import { html } from 'lit';

export const linkOnly = html`
  <li>
    <a href="#" class="post-side-navigation-item">
      <post-icon name="letter" aria-hidden="true"></post-icon>
      Letters
    </a>
  </li>
  <li>
    <a href="#" class="post-side-navigation-item">
      <post-icon name="onlineservice" aria-hidden="true"></post-icon>
      Online service
    </a>
  </li>
  <li>
    <a href="#" class="post-side-navigation-item">
      <post-icon name="search" aria-hidden="true"></post-icon>
      Search
    </a>
  </li>
`;

// Nested but not collapsible — children always visible.
// Parent can be a link or a non-clickable span.
export const nested = html`
  <li>
    <a href="#" class="post-side-navigation-item">Parent link</a>
    <ul>
      <li><a href="#" class="post-side-navigation-item">Child link</a></li>
      <li><a href="#" class="post-side-navigation-item">Child link</a></li>
    </ul>
  </li>
  <li>
    <span class="post-side-navigation-item">Section title</span>
    <ul>
      <li><a href="#" class="post-side-navigation-item">Child link</a></li>
      <li><a href="#" class="post-side-navigation-item">Child link</a></li>
    </ul>
  </li>
`;

// Collapsible but not linked — button only, no link on level 1.
// Collapsible is a child of the trigger (nested structure, no for/id).
export const collapsibleNotLinked = html`
  <li>
    <post-collapsible-trigger>
      <button class="post-side-navigation-item">
        Expandable section
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
  <li>
    <post-collapsible-trigger>
      <button class="post-side-navigation-item">
        Another expandable section
        <post-icon name="chevrondown" aria-hidden="true"></post-icon>
      </button>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
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
      <div class="post-side-navigation-item">
        <a href="#">Link with expand</a>
        <button>
          <span class="visually-hidden">Expand</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </div>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
  <li>
    <post-collapsible-trigger>
      <div class="post-side-navigation-item">
        <a href="#">Another link with expand</a>
        <button>
          <span class="visually-hidden">Expand</span>
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </div>
      <post-collapsible>
        <ul>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
          <li><a href="#" class="post-side-navigation-item">Child link</a></li>
        </ul>
      </post-collapsible>
    </post-collapsible-trigger>
  </li>
`;

// Active item — aria-current="page" marks the current page link.
export const activeItem = html`
  <li><a href="#" class="post-side-navigation-item">SideNav item</a></li>
  <li>
    <!-- The active link must have aria-current="page" for correct accessibility and styling. -->
    <a href="#" class="post-side-navigation-item" aria-current="page">Current page</a>
  </li>
  <li><a href="#" class="post-side-navigation-item">Another item</a></li>
`;