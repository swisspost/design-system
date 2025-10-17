import { html } from 'lit';

export function renderUserMenu() {
  return html`
    <div slot="global-login">
      <post-menu-trigger for="user-menu">
        <button class="btn btn-link" type="button">
          <post-avatar
            firstname="John"
            lastname="Doe"
            description="Current user is John Doe."
          ></post-avatar>
          <span class="visually-hidden">Access user links.</span>
        </button>
      </post-menu-trigger>
      <post-menu id="user-menu" label="User links">
        <div slot="header">
          <post-avatar firstname="John" lastname="Doe" aria-hidden="true"></post-avatar>
          John Doe
        </div>
        <post-menu-item>
          <a href="">
            <post-icon aria-hidden="true" name="profile"></post-icon>
            My Profile
          </a>
        </post-menu-item>
        <post-menu-item>
          <a href="">
            <post-icon aria-hidden="true" name="letter"></post-icon>
            Messages
          </a>
        </post-menu-item>
        <post-menu-item>
          <a href="">
            <post-icon aria-hidden="true" name="gear"></post-icon>
            Setting
          </a>
        </post-menu-item>
        <post-menu-item>
          <button type="button">
            <post-icon aria-hidden="true" name="logout"></post-icon>
            Logout
          </button>
        </post-menu-item>
      </post-menu>
    </div>
  `;
}
