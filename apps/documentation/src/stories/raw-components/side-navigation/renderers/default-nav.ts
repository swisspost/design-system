export const defaultNav = `
  <!-- Link only: Simple links without nesting or disclosure controls -->
  <h2 class="post-side-navigation-heading">Section title</h2>

  <ul>
    <li><a href="#" class="post-side-navigation-item">Link only</a></li>
    <li><a href="#" class="post-side-navigation-item">Link only</a></li>
  </ul>

  <!-- Nested but not collapsible: Hierarchical items with children always visible.
       Parent can be a link or a non-clickable span. -->
  <h2 class="post-side-navigation-heading">Section title</h2>

  <ul>
    <li>
      <a href="#" class="post-side-navigation-item">Nested but not collapsible</a>
      <ul>
        <li><a href="#" class="post-side-navigation-item">Child link</a></li>
        <li><a href="#" class="post-side-navigation-item">Child link</a></li>
      </ul>
    </li>
  </ul>

  <!-- Collapsible but not linked: Expandable sections with a button.
       Level-1 items disclose children but don't navigate anywhere. -->
  <h2 class="post-side-navigation-heading">Section title</h2>

  <ul>
    <li>
      <post-collapsible-trigger>
        <button class="post-side-navigation-item">
          Collapsible but not linked
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
        <post-collapsible collapsed>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Child link</a></li>
            <li><a href="#" class="post-side-navigation-item">Child link</a></li>
          </ul>
        </post-collapsible>
      </post-collapsible-trigger>
    </li>
  </ul>

  <!-- Collapsible and linked: Level-1 items both navigate and expand.
       A link and a separate disclosure button work together. -->
  <h2 class="post-side-navigation-heading">Section title</h2>

  <ul>
    <li>
      <post-collapsible-trigger>
        <div class="post-side-navigation-item">
          <a href="#">Collapsible and linked</a>
          <button>
            <span class="visually-hidden">Expand</span>
            <post-icon name="chevrondown" aria-hidden="true"></post-icon>
          </button>
        </div>
        <post-collapsible collapsed>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Child link</a></li>
            <li><a href="#" class="post-side-navigation-item">Child link</a></li>
          </ul>
        </post-collapsible>
      </post-collapsible-trigger>
    </li>
  </ul>
`;