import { html } from 'lit';

/** Active item marked with aria-current="page" for accessibility and styling. */
export const activeItem = html`
  <li><a href="#" class="post-side-navigation-item">SideNav item</a></li>
  <li>
    <a href="#" class="post-side-navigation-item" aria-current="page">Current page</a>
  </li>
  <li><a href="#" class="post-side-navigation-item">Another item</a></li>
`;

/** Deep nesting with all 4 levels: Level 1 → 2 → 3 → 4. */
export const deepNesting = html`
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
export const withIcons = html`
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