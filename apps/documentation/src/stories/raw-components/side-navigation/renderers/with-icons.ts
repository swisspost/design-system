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