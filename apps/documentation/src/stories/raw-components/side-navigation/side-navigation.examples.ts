/** Active item marked with aria-current="page" for accessibility and styling. */
export const activeItem = `
  <li><a href="#" class="post-side-navigation-item">SideNav item</a></li>
  <li>
    <a href="#" class="post-side-navigation-item" aria-current="page">Current page</a>
  </li>
  <li><a href="#" class="post-side-navigation-item">Another item</a></li>
`;

/** Deep nesting with all 4 levels: Level 1 → 2 → 3 → 4. */
export const deepNesting = `
  <ul>
    <li>
      <post-collapsible-trigger>
        <button class="post-side-navigation-item">
          Level 1
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
        <post-collapsible>
          <ul>
            <li>
              <post-collapsible-trigger>
                <button class="post-side-navigation-item">
                  Level 2
                  <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                </button>
                <post-collapsible>
                  <ul>
                    <li>
                      <post-collapsible-trigger>
                        <button class="post-side-navigation-item">
                          Level 3
                          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
                        </button>
                        <post-collapsible>
                          <ul>
                            <li><a href="#" class="post-side-navigation-item">Level 4 Item</a></li>
                            <li><a href="#" class="post-side-navigation-item">Level 4 Item</a></li>
                          </ul>
                        </post-collapsible>
                      </post-collapsible-trigger>
                    </li>
                  </ul>
                </post-collapsible>
              </post-collapsible-trigger>
            </li>
          </ul>
        </post-collapsible>
      </post-collapsible-trigger>
    </li>
  </ul>
`;

/** Icons on level 1 only. All or none—do not mix. */
export const withIcons = `
  <ul>
    <li>
      <a href="#" class="post-side-navigation-item">
        <post-icon name="letter" aria-hidden="true"></post-icon>
        Letters
      </a>
    </li>
    <li>
      <post-collapsible-trigger>
        <button class="post-side-navigation-item">
          <post-icon name="bulkparcels" aria-hidden="true"></post-icon>
          Packages
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
        <post-collapsible>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Tracking</a></li>
            <li><a href="#" class="post-side-navigation-item">Delivery</a></li>
          </ul>
        </post-collapsible>
      </post-collapsible-trigger>
    </li>
    <li>
      <post-collapsible-trigger>
        <div class="post-side-navigation-item">
          <post-icon name="profile" aria-hidden="true"></post-icon>
          <a href="#">Account</a>
          <button>
            <span class="visually-hidden">Expand</span>
            <post-icon name="chevrondown" aria-hidden="true"></post-icon>
          </button>
        </div>
        <post-collapsible collapsed>
          <ul>
            <li><a href="#" class="post-side-navigation-item">Profile</a></li>
            <li><a href="#" class="post-side-navigation-item">Settings</a></li>
          </ul>
        </post-collapsible>
      </post-collapsible-trigger>
    </li>
  </ul>
`;

/** Default: all navigation patterns combined. */
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